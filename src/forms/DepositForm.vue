<template>
  <form
    class="deposit-form"
    :class="{ 'deposit-form--loading': isInitializing }"
    @submit.prevent
  >
    <div class="deposit-form__select-field-wrp">
      <label class="deposit-form__label" :for="`select-field--${uid}`">
        {{ $t('deposit-form.balance-label') }}
      </label>
      <select-field
        :model-value="balanceOfForm"
        :uid="`select-field--${uid}`"
        :value-options="balanceOptions"
        :error-message="getFieldErrorMessage('balanceOptionIdx')"
        :is-loading="isInitializing"
        :disabled="isSubmitting"
        scheme="text"
        @update:model-value="
          form.balanceOptionIdx = balanceOptions.indexOf($event)
        "
        @blur="touchField('balanceOptionIdx')"
      />
    </div>
    <div class="deposit-form__form-data">
      <input-field
        v-model="form.amount"
        class="deposit-form__input-field"
        :placeholder="
          $t('deposit-form.amount-placeholder', {
            currency: balanceOfForm?.value.currency || CURRENCIES.stEth,
          })
        "
        :error-message="getFieldErrorMessage('amount')"
        :is-loading="isInitializing"
        :disabled="isSubmitting"
        @blur="touchField('amount')"
      >
        <template #nodeRight>
          <app-button
            class="deposit-form__input-field-btn"
            scheme="link"
            text="max"
            :disabled="isSubmitting || !balanceOfForm"
            @click="form.amount = balanceOfForm?.value.amount || ''"
          />
        </template>
      </input-field>
      <datetime-field
        v-model="form.lockPeriod"
        :placeholder="$t(`deposit-form.lock-period-placeholder`)"
        :error-message="getFieldErrorMessage('lockPeriod')"
        :is-loading="isInitializing"
        :disabled="isSubmitting"
        class="deposit-form__datetime-field"
        @update:model-value="onLockPeriodUpdate"
      />
    </div>
    <div class="deposit-form__buttons-wrp">
      <app-button
        class="deposit-form__btn"
        color="secondary"
        :text="$t('deposit-form.cancel-btn')"
        :is-loading="isInitializing"
        @click="emit('cancel')"
      />
      <app-button
        class="deposit-form__btn"
        :text="submissionBtnText"
        :disabled="isSubmitting || !isFieldsValid"
        :is-loading="isInitializing"
        @click="onSubmit"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
import { useFormValidation, useI18n } from '@/composables'
import { MAX_UINT_256 } from '@/const'
import { DatetimeField, InputField, SelectField } from '@/fields'
import { getEthExplorerTxUrl, bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { useWeb3ProvidersStore } from '@/store'
import { type FieldOption } from '@/types'
import { BigNumber, formatEther, parseUnits, Time, toEther } from '@/utils'
import { ether, maxEther, minEther, minValue, required } from '@/validators'
import { config } from '@config'
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, reactive, ref } from 'vue'

enum ACTIONS {
  approve = 'approve',
  stake = 'stake',
}

enum CURRENCIES {
  stEth = 'stETH',
}

type BalanceOptionValue = {
  amount: string
  currency: CURRENCIES
}

const emit = defineEmits<{
  (e: 'cancel', v: void): void
  (e: 'stake-tx-sent', v: void): void
}>()

const props = defineProps<{
  poolId: number
  minStake: BigNumber
}>()

const uid = uuidv4()
const isInitializing = ref(true)
const isSubmitting = ref(false)

const allowances = reactive<Record<CURRENCIES, BigNumber | null>>({
  [CURRENCIES.stEth]: null,
})

const { t } = useI18n()
const web3ProvidersStore = useWeb3ProvidersStore()

const action = computed<ACTIONS>(() => {
  if (isFieldsValid.value) {
    const amountInDecimals = parseUnits(form.amount, 'ether')
    const allowance = balanceOfForm.value
      ? allowances[balanceOfForm.value.value.currency]
      : null

    if (allowance && amountInDecimals.gt(allowance)) {
      return ACTIONS.approve
    }
  }

  return ACTIONS.stake
})

const balanceOptions = computed<FieldOption<BalanceOptionValue>[]>(() => [
  ...(web3ProvidersStore.balances.stEth
    ? [
        {
          title: `${formatEther(web3ProvidersStore.balances.stEth)} stETH`,
          value: {
            amount: toEther(web3ProvidersStore.balances.stEth),
            currency: CURRENCIES.stEth,
          },
        },
      ]
    : []),
])

const form = reactive({
  balanceOptionIdx: 0,
  amount: '',
  lockPeriod: '',
})

const balanceOfForm = computed<FieldOption<BalanceOptionValue> | null>(
  () => balanceOptions.value[form.balanceOptionIdx] || null,
)

const validationRules = computed(() => ({
  balanceOptionIdx: { required },
  amount: {
    required,
    ether,
    minEther: minEther(props.minStake.add(parseUnits('0.001', 'ether'))),
    ...(balanceOfForm.value?.value && {
      maxEther: maxEther(balanceOfForm.value.value.amount),
    }),
  },
  lockPeriod: {
    minValue: minValue(new Time().timestamp),
  },
}))

const { getFieldErrorMessage, isFieldsValid, isFormValid, touchField } =
  useFormValidation(form, validationRules)

const submissionBtnText = computed<string>(() =>
  action.value === ACTIONS.approve
    ? t('deposit-form.submit-btn.approve')
    : t('deposit-form.submit-btn.deposit'),
)

const fetchAllowanceByCurrency = async (
  currency: CURRENCIES,
): Promise<BigNumber> => {
  let contract
  switch (currency) {
    case CURRENCIES.stEth:
      contract = web3ProvidersStore.stEthContract
      break
    default:
      throw new Error('unknown currency')
  }

  return contract.providerBased.value.allowance(
    web3ProvidersStore.provider.selectedAddress,
    config.networks[web3ProvidersStore.networkId].contractAddressesMap
      .erc1967Proxy,
  )
}

const approveByCurrency = async (currency: CURRENCIES) => {
  let contract
  switch (currency) {
    case CURRENCIES.stEth:
      contract = web3ProvidersStore.stEthContract
      break
    default:
      throw new Error('unknown currency')
  }

  return contract.signerBased.value.approve(
    config.networks[web3ProvidersStore.networkId].contractAddressesMap
      .erc1967Proxy,
    MAX_UINT_256,
  )
}

const onLockPeriodUpdate = (value: string) => {
  console.log('Datetime-field raw value:', value, typeof value);
  
  // Store the raw value
  form.lockPeriod = value;
  
  try {
    // Check if it's a numeric string (Unix timestamp in seconds)
    if (/^\d+$/.test(value)) {
      const timestamp = parseInt(value, 10);
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      console.log('Parsed from timestamp:', date.toISOString());
      console.log('Timestamp value (sec):', timestamp);
      
      if (!isNaN(timestamp) && timestamp > 0) {
        // Valid timestamp
        console.log('Valid timestamp detected:', timestamp);
      } else {
        console.warn('Invalid numeric timestamp:', value);
      }
    } else {
      // Try to parse as a date string
      const date = new Date(value);
      const timestamp = date.getTime() / 1000;
      
      if (!isNaN(timestamp)) {
        console.log('Valid date string:', date.toISOString());
        console.log('Timestamp (sec):', Math.floor(timestamp));
      } else {
        console.warn('Invalid date string:', value);
        form.lockPeriod = '';
      }
    }
  } catch (e) {
    console.error('Error processing datetime value:', e);
    // Keep the raw value
  }
  
  // Force validation check
  touchField('lockPeriod');
};

const submit = async (action: ACTIONS): Promise<void> => {
  if (!isFormValid()) return;
  isSubmitting.value = true;

  try {
    await web3ProvidersStore.provider.selectChain(
      config.networks[web3ProvidersStore.networkId].chainId,
    );

    let tx;
    if (action === ACTIONS.approve && balanceOfForm.value) {
      tx = await approveByCurrency(balanceOfForm.value.value.currency);
    } else {
      const amountInDecimals = parseUnits(form.amount, 'ether');
      
      // Debug the lock period
      console.log('Lock period raw value:', form.lockPeriod);
      
      // Default to 0
      let claimLockEnd_ = BigNumber.from(0);
      
      // Process the lockPeriod value if it exists
      if (form.lockPeriod && form.lockPeriod.trim() !== '') {
        try {
          // Check if it's a numeric timestamp string (seconds)
          if (/^\d+$/.test(form.lockPeriod)) {
            // Direct Unix timestamp in seconds - use it directly
            claimLockEnd_ = BigNumber.from(form.lockPeriod);
            console.log('Using timestamp directly:', claimLockEnd_.toString());
          } else {
            // Parse as date string
            const timestamp = new Date(form.lockPeriod).getTime() / 1000;
            if (!isNaN(timestamp)) {
              claimLockEnd_ = BigNumber.from(Math.floor(timestamp).toString());
              console.log('Parsed from date string:', claimLockEnd_.toString());
            }
          }
        } catch (e) {
          console.error('Error processing timestamp:', e);
        }
      }

      const referrer = '0x0000000000000000000000000000000000000000'

      console.log('Sending stake tx with params:', {
        poolId: props.poolId,
        amountInDecimals: amountInDecimals.toString(),
        claimLockEnd: claimLockEnd_.toString(),
        referrer,
      })

      tx =
        await web3ProvidersStore.erc1967ProxyContract.signerBased.value.stake(
          props.poolId,
          amountInDecimals,
          claimLockEnd_,
          referrer,
        )
      emit('stake-tx-sent')
    }

    const explorerTxUrl = getEthExplorerTxUrl(
      config.networks[web3ProvidersStore.networkId].explorerUrl,
      tx.hash,
    )

    bus.emit(
      BUS_EVENTS.info,
      t('deposit-form.tx-sent-message', { explorerTxUrl }),
    )

    await tx.wait()

    bus.emit(
      BUS_EVENTS.success,
      t('deposit-form.success-message', { explorerTxUrl }),
    )

    bus.emit(BUS_EVENTS.changedPoolData)

    if (balanceOfForm.value)
      allowances[balanceOfForm.value.value.currency] =
        await fetchAllowanceByCurrency(balanceOfForm.value.value.currency)
  } catch (error) {
    ErrorHandler.process(error)
  } finally {
    isSubmitting.value = false
  }
}

const onSubmit = async () => {
  if (action.value === ACTIONS.approve) await submit(ACTIONS.approve)
  if (action.value == ACTIONS.stake) await submit(ACTIONS.stake)
}

const init = async (): Promise<void> => {
  isInitializing.value = true

  try {
    allowances[CURRENCIES.stEth] = await fetchAllowanceByCurrency(
      CURRENCIES.stEth,
    )
  } catch (error) {
    emit('cancel')
    ErrorHandler.process(error)
  }

  isInitializing.value = false
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.deposit-form__select-field-wrp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: toRem(16);

  @include respond-to(medium) {
    flex-direction: column;
    align-items: start;
    gap: toRem(4);
  }
}

.deposit-form__label {
  .deposit-form--loading & {
    @include skeleton;
  }

  @include body-1-regular;
}

.deposit-form__form-data {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
}

.deposit-form .deposit-form__input-field {
  color: #000000;
  margin-top: toRem(40);

  @include respond-to(medium) {
    margin-top: toRem(20);
  }
}

.deposit-form .deposit-form__input-field-btn {
  @include body-3-semi-bold;
}

.deposit-form__buttons-wrp {
  margin-top: toRem(40);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: toRem(16);

  @include respond-to(medium) {
    margin-top: toRem(36);
  }
}

.deposit-form .deposit-form__btn {
  min-width: toRem(200);

  @include respond-to(medium) {
    min-width: min-content;
    width: 100%;
  }
}

// Fix datetime field styling
.deposit-form__datetime-field {
  :deep() {
    input {
      background-color: #ffffff;
      color: #000000;
    }
    
    .flatpickr-calendar {
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      
      .flatpickr-months, 
      .flatpickr-weekdays, 
      .flatpickr-days,
      .flatpickr-time {
        background: #ffffff;
      }
      
      .flatpickr-day {
        color: #333333;
        
        &.selected {
          background: #1976d2;
          color: #ffffff;
        }
        
        &:hover {
          background: #f3f3f3;
        }
      }
      
      .flatpickr-time {
        border-top: 1px solid #e6e6e6;
        
        input, .numInputWrapper, .flatpickr-am-pm {
          background: #ffffff;
          color: #333333;
        }
      }
      
      .flatpickr-monthSelect-month, .flatpickr-weekday {
        color: #333333;
      }
    }
    
    .dp__main {
      // Add specific overrides for the datetime picker if needed
      .dp__theme_light {
        --dp-background-color: #ffffff;
        --dp-text-color: #000000;
        --dp-hover-color: #f3f3f3;
        --dp-hover-text-color: #000000;
        --dp-hover-icon-color: #959595;
        --dp-primary-color: #1976d2;
        --dp-primary-text-color: #ffffff;
        --dp-secondary-color: #c0c4cc;
        --dp-border-color: #ddd;
        --dp-menu-border-color: #ddd;
      }
    }
    
    .dp__input {
      // Ensure input is visible
      background-color: #ffffff;
      color: #000000;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px 12px;
    }
  }
}
</style>
