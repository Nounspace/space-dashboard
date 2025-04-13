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
      <div class="deposit-form__slider-wrp">
        <label class="deposit-form__label">
          {{ $t('deposit-form.lock-period-slider-label') }}
        </label>
        <input
          type="range"
          v-model="lockPeriodMonths"
          min="0"
          max="60"
          step="1"
          class="deposit-form__slider"
          :disabled="isSubmitting"
          @input="handleSliderInput"
          aria-label="Lock period in months"
          :aria-valuenow="lockPeriodMonths"
        />
        <div class="deposit-form__slider-info">
          <div class="deposit-form__slider-value">
            {{ lockPeriodMonths }} {{ $t('deposit-form.months') }}
          </div>
          <div class="deposit-form__lock-until" v-if="form.lockPeriod">
            {{ $t('deposit-form.lock-until') }} {{ formatLockDate(form.lockPeriod) }}
          </div>
        </div>
      </div>
      <div v-if="form.lockPeriod && !isMinimumLockPeriodMet" class="deposit-form__info-message">
        {{ $t('deposit-form.no-multiplier-message') }}
      </div>
      <div v-if="currentMultiplier && isMinimumLockPeriodMet" class="deposit-form__multiplier-panel">
        <div class="deposit-form__multiplier-panel-header">
          <span class="deposit-form__multiplier-label">{{ $t('deposit-form.your-multiplier') }}</span>
          <span class="deposit-form__multiplier-value">x{{ formatMultiplier(currentMultiplier) }}</span>
        </div>
      </div>
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
        :color="currentMultiplier ? 'primary-gradient' : 'default'"
        :text="getSubmitButtonText()"
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
import { InputField, SelectField } from '@/fields'
import { getEthExplorerTxUrl, bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { useWeb3ProvidersStore } from '@/store'
import { type FieldOption } from '@/types'
import { BigNumber, formatEther, parseUnits, Time, toEther } from '@/utils'
import { ether, maxEther, minEther, minValue, required } from '@/validators'
import { config } from '@config'
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, reactive, ref } from 'vue'
import { formatUnits } from 'ethers/lib/utils'

// Minimum lock period - 6 months in seconds (approx 180 days)
const MIN_LOCK_PERIOD_SECONDS = 180 * 24 * 60 * 60; // 6 months

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
const isMinimumLockPeriodMet = ref(false)

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

const lockPeriodMonths = ref(6); // Set initial value to 6 months
const currentMultiplier = ref<BigNumber | null>(null);

const formatMultiplier = (multiplier: BigNumber | null): string => {
  if (!multiplier || multiplier.isZero()) return '-';

  const humanReadable = parseFloat(formatUnits(multiplier, 25));

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(humanReadable);
};

const formatLockDate = (timestamp: string): string => {
  try {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return '';
  }
};

const getSubmitButtonText = (): string => {
  if (currentMultiplier && isMinimumLockPeriodMet) {
    return t('deposit-form.lock-to-increase-multiplier');
  }
  return action.value === ACTIONS.approve
    ? t('deposit-form.submit-btn.approve')
    : t('deposit-form.submit-btn.deposit');
};

const getClaimLockPeriodMultiplier = async (): Promise<BigNumber | null> => {
  try {
    if (!form.lockPeriod) {
      console.warn('Lock period is missing.');
      return null;
    }

    const claimLockStart = BigNumber.from(Math.floor(Date.now() / 1000));
    const claimLockEnd = BigNumber.from(form.lockPeriod);

    if (claimLockEnd.lte(claimLockStart)) {
      console.error('Invalid lock period: End time must be greater than start time.');
      return null;
    }

    const contract = web3ProvidersStore.erc1967ProxyContract.providerBased.value;
    if (!contract) {
      console.error('Contract instance is not initialized.');
      return null;
    }

    const multiplier = await contract.getClaimLockPeriodMultiplier(
      0,
      claimLockStart,
      claimLockEnd
    );

    console.log('Multiplier fetched successfully:', multiplier.toString());
    return multiplier;
  } catch (error) {
    console.error('Error fetching multiplier:', error);
    return null;
  }
};

const handleSliderInput = async () => {
  try {
    updateLockPeriod();
    await updateMultiplier();
  } catch (error) {
    console.error('Error updating slider values:', error);
  }
};

const updateLockPeriod = () => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const selectedLockPeriodSeconds = lockPeriodMonths.value * 30 * 24 * 60 * 60;

  if (selectedLockPeriodSeconds > Number.MAX_SAFE_INTEGER) {
    throw new Error('Selected lock period exceeds maximum safe value.');
  }

  form.lockPeriod = (currentTimestamp + selectedLockPeriodSeconds).toString();
  isMinimumLockPeriodMet.value =
    selectedLockPeriodSeconds >= MIN_LOCK_PERIOD_SECONDS;
};

const updateMultiplier = async () => {
  currentMultiplier.value = await getClaimLockPeriodMultiplier();
  if (!currentMultiplier.value) {
    console.warn('Multiplier could not be fetched.');
  }
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
      const claimLockEnd_ = processLockPeriod(form.lockPeriod);

      tx =
        await web3ProvidersStore.erc1967ProxyContract.signerBased.value.stake(
          0,
          amountInDecimals,
          claimLockEnd_,
          '0x0000000000000000000000000000000000000000',
        );
      emit('stake-tx-sent');
    }

    const explorerTxUrl = getEthExplorerTxUrl(
      config.networks[web3ProvidersStore.networkId].explorerUrl,
      tx.hash,
    );

    bus.emit(
      BUS_EVENTS.info,
      t('deposit-form.tx-sent-message', { explorerTxUrl }),
    );

    await tx.wait();

    bus.emit(
      BUS_EVENTS.success,
      t('deposit-form.success-message', { explorerTxUrl }),
    );

    bus.emit(BUS_EVENTS.changedPoolData);

    if (balanceOfForm.value)
      allowances[balanceOfForm.value.value.currency] =
        await fetchAllowanceByCurrency(balanceOfForm.value.value.currency);
  } catch (error) {
    ErrorHandler.process(error);
  } finally {
    isSubmitting.value = false;
  }
};

const processLockPeriod = (lockPeriod: string): BigNumber => {
  if (!lockPeriod || !/^\d+$/.test(lockPeriod)) {
    throw new Error('Invalid lock period format.');
  }
  return BigNumber.from(lockPeriod).mask(128);
};

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

onMounted(async () => {
  await init();

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const initialLockPeriodSeconds = lockPeriodMonths.value * 30 * 24 * 60 * 60;

  form.lockPeriod = (currentTimestamp + initialLockPeriodSeconds).toString();
  isMinimumLockPeriodMet.value =
    initialLockPeriodSeconds >= MIN_LOCK_PERIOD_SECONDS;

  currentMultiplier.value = await getClaimLockPeriodMultiplier();
});

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

.deposit-form__slider-wrp {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}

.deposit-form__slider {
  width: 100%;
  appearance: none;
  height: toRem(8);
  background: #ddd;
  border-radius: toRem(4);
  outline: none;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: toRem(16);
    height: toRem(16);
    background: #1976d2;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: toRem(16);
    height: toRem(16);
    background: #1976d2;
    border-radius: 50%;
    cursor: pointer;
  }
}

.deposit-form__slider-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deposit-form__slider-value {
  font-size: toRem(14);
  color: #333;
}

.deposit-form__multiplier {
  display: flex;
  gap: toRem(4);
  align-items: center;
  padding: toRem(4) toRem(8);
  background: #e3f2fd;
  border-radius: toRem(4);
}

.deposit-form__multiplier-label {
  font-size: toRem(14);
  color: #333;
}

.deposit-form__multiplier-value {
  font-size: toRem(14);
  font-weight: 600;
  color: #1976d2;
}

.deposit-form__info-message {
  margin-top: toRem(8);
  color: #ff9800;
  font-size: toRem(14);
  line-height: 1.4;
  padding: toRem(8) toRem(12);
  background-color: rgba(255, 152, 0, 0.1);
  border-radius: toRem(4);
  border-left: toRem(3) solid #ff9800;
}

.deposit-form__multiplier-panel {
  margin-top: toRem(16);
  padding: toRem(16);
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: toRem(8);
}

.deposit-form__multiplier-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.deposit-form__multiplier-label {
  font-size: toRem(16);
  font-weight: 500;
  color: #333;
}

.deposit-form__multiplier-value {
  font-size: toRem(36);
  font-weight: 700;
  color: #333;
}

.deposit-form .deposit-form__btn[color="primary-gradient"] {
  background: linear-gradient(90deg, #1976d2, #2196f3);
  color: #fff;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.deposit-form .deposit-form__btn[color="default"] {
  background: #f0f0f0;
  border: 1px solid #ccc;
  color: #333;
}

.app-button--primary-gradient {
  background: linear-gradient(90deg, #1976d2, #2196f3);
  color: #fff;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-button--primary-gradient:disabled {
  background: #ccc;
  color: #666;
}
</style>
