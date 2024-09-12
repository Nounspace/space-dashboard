<template>
  <div class="public-pool-view">
    <info-dashboard
      :pool-id="poolId"
      :pool-data="poolData"
      :indicators="dashboardIndicators"
      :is-loading="isInitializing || isUserDataUpdating"
      class="public-pool-view__dashboard"
    >
      <div class="public-pool-view__dashboard-buttons-wrp">
        <app-button
          class="public-pool-view__dashboard-button"
          color="secondary"
          :text="$t('home-page.public-pool-view.withdraw-btn')"
          :is-loading="isInitializing || isUserDataUpdating"
          :disabled="isWithdrawDisabled"
          @click="isWithdrawModalShown = true"
        />
        <app-button
          class="public-pool-view__dashboard-button"
          color="primary"
          :text="$t('home-page.public-pool-view.claim-btn')"
          :is-loading="isInitializing || isUserDataUpdating"
          :disabled="isClaimDisabled"
          @click="isClaimModalShown = true"
        />
      </div>
      <p class="public-pool-view__dashboard-description">
        {{ $t(`home-page.public-pool-view.dashboard-description--${poolId}`) }}
      </p>
      <p v-if="poolData" class="public-pool-view__dashboard-note">
        {{
          $t(`home-page.public-pool-view.dashboard-note--${poolId}`, {
            daysCount: poolData.withdrawLockPeriod.div(24 * 60 * 60),
          })
        }}
      </p>
      <withdraw-modal
        v-if="!isWithdrawDisabled && userPoolData"
        v-model:is-shown="isWithdrawModalShown"
        :pool-id="poolId"
        :available-amount="userPoolData.deposited"
      />
      <claim-modal
        v-if="!isClaimDisabled && currentUserReward"
        v-model:is-shown="isClaimModalShown"
        :amount="formatEther(currentUserReward)"
        :pool-id="poolId"
      />
    </info-dashboard>

    <info-bar
      status="public"
      :indicators="barIndicators"
      :is-loading="isInitializing"
      class="public-pool-view__bar"
    >
      <template v-if="poolId === 0" #description>
        <zero-pool-description />
      </template>
      <template #default>
        <transition name="fade">
          <div
            v-if="web3ProvidersStore.isConnected"
            class="public-pool-view__bar-slot-wrp"
          >
            <div class="public-pool-view__bar-buttons-wrp">
              <app-button
                class="public-pool-view__bar-button"
                color="primary"
                :text="$t('home-page.public-pool-view.deposit-btn')"
                :is-loading="isInitializing"
                :disabled="isDepositDisabled"
                @click="isDepositModalShown = true"
              />
              <app-button
                class="public-pool-view__bar-button"
                scheme="link"
                color="none"
                target="_blank"
                rel="noopener noreferrer"
                :text="$t('home-page.public-pool-view.external-link')"
                :icon-right="$icons.externalLink"
                :is-loading="isInitializing"
                :href="$config.HOW_GET_STETH_URL"
              />
            </div>
            <deposit-modal
              v-if="!isDepositDisabled && poolData?.minimalStake"
              v-model:is-shown="isDepositModalShown"
              :pool-id="poolId"
              :min-stake="poolData.minimalStake"
              @share="isShareModalShown = true; isDepositModalShown = false"
            />
            <share-modal
              v-if="userPoolData && poolData"
              v-model:is-shown="isShareModalShown"
              :pool-data="poolData"
              :available-amount="userPoolData.deposited"
            />
          </div>
        </transition>
      </template>
    </info-bar>
    <iframe
      src="https://drive.google.com/file/d/1iL23mwo8saM7eBdCfwQuoBw6kPBEVVj8/preview"
      width="640" 
      height="360"
      allow="autoplay; fullscreen"
      class="video-iframe"
    ></iframe>
  </div>
</template>


<script lang="ts" setup>
import {
  AppButton,
  ClaimModal,
  DepositModal,
  ShareModal,
  InfoBar,
  InfoDashboard,
  WithdrawModal,
} from '@/common'
import { useI18n, usePool } from '@/composables'
import { DEFAULT_TIME_FORMAT } from '@/const'
import { ICON_NAMES } from '@/enums'
import { useWeb3ProvidersStore } from '@/store'
import type { InfoBarType, InfoDashboardType } from '@/types'
import { formatNumberInt, convertStEthToUsd, formatEther, Time } from '@/utils'
import { computed, ref } from 'vue'
import { ZeroPoolDescription } from '../components'

const props = defineProps<{ poolId: number }>()

const isClaimModalShown = ref(false)
const isDepositModalShown = ref(false)
const isShareModalShown = ref(false)
const isWithdrawModalShown = ref(false)

const poolId = computed(() => props.poolId)

const { t } = useI18n()

const {
  currentUserReward,
  dailyReward,
  poolData,
  userPoolData,

  isClaimDisabled,
  isDepositDisabled,
  isWithdrawDisabled,

  isInitializing,
  isUserDataUpdating,
} = usePool(poolId.value)

const web3ProvidersStore = useWeb3ProvidersStore()

const barIndicators = computed<InfoBarType.Indicator[]>(() => [
  {
    title: t('home-page.public-pool-view.total-deposits-title'),
    value: poolData.value
      ? `${formatNumberInt(formatEther(poolData.value.totalDeposited))} stETH`
      : '',
  },
  {
    title: t('home-page.public-pool-view.total-usd-title'),
    value: poolData.value
      ? `${convertStEthToUsd(poolData.value.totalDeposited, poolData.value.stEThPriceInUsd) || '🚀'}`
      : '',
  },
  {
    title: t('home-page.public-pool-view.daily-reward-title'),
    value: dailyReward.value ? `${formatNumberInt(formatEther(dailyReward.value))} SPACE` : '',
  },
  {
    title: t('home-page.public-pool-view.started-at-title'),
    value: poolData.value
      ? new Time(poolData.value.payoutStart.toNumber()).format(
          DEFAULT_TIME_FORMAT,
        )
      : '',
  },
  {
    title: t('home-page.public-pool-view.withdraw-at-title'),
    value: poolData.value
      ? new Time(
          userPoolData.value && !userPoolData.value.lastStake.isZero()
            ? userPoolData.value.lastStake
                .add(poolData.value.withdrawLockPeriodAfterStake)
                .toNumber()
            : Math.floor(Date.now() / 1000) + poolData.value.withdrawLockPeriodAfterStake.toNumber(),
        ).format(DEFAULT_TIME_FORMAT)
      : '',
    note: t('home-page.public-pool-view.withdraw-at-note'),
  },
  {
    title: t('home-page.public-pool-view.claim-at-title'),
    value: poolData.value
      ? new Time(
          poolData.value.payoutStart
            .add(poolData.value.claimLockPeriod)
            .toNumber(),
        ).format(DEFAULT_TIME_FORMAT)
      : '',
    note: t('home-page.public-pool-view.claim-at-note'),
  },
])

const dashboardIndicators = computed<InfoDashboardType.Indicator[]>(() => [
  {
    iconName: ICON_NAMES.ethereum,
    title: t('home-page.public-pool-view.user-deposit-title'),
    value: userPoolData.value
      ? `${formatNumberInt(formatEther(userPoolData.value.deposited))} stETH`
      : '',
  },
  {
    iconName: ICON_NAMES.base,
    title: t('home-page.public-pool-view.available-to-claim-title'),
    value: currentUserReward.value
      ? `${formatNumberInt(formatEther(currentUserReward.value))} SPACE`
      : '',
  },
])
</script>

<style lang="scss" scoped>
.public-pool-view {
  display: flex;
  flex-direction: column;

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    align-items: start;
  }
}

.public-pool-view__dashboard {
  order: 1;
  height: 100%;
  @media (min-width: 1280px) {
    grid-column: 2;
    grid-row: 1;
  }
}

.public-pool-view__bar {
  order: 2;
  @media (min-width: 1280px) {
    grid-column: 1;
    grid-row: 1;
  }
}

.video-iframe {
  display: flex;
  order: 3;
  width: 100%;
  height: auto;
  min-height: 360px;
  border-radius: 8px;

  @media (min-width: 1280px) {
    grid-column: 2;
    grid-row: 2;
    align-self: start;
    max-width: none;
    width: 100%;
  }

  @include respond-to(medium) {
    aspect-ratio: 16/9;
    min-height: auto;
  }
}
.public-pool-view__bar-slot-wrp {
  margin-top: toRem(16);
  border-top: toRem(2) solid #494949;
  padding-top: toRem(30);

  @include respond-to(medium) {
    padding-top: toRem(32);
  }
}

.public-pool-view__bar-buttons-wrp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: toRem(16);

  @include respond-to(medium) {
    flex-direction: column;
    gap: toRem(8);
  }
}

.public-pool-view__bar-button {
  &:first-child {
    @include respond-to(medium) {
      width: 100%;
    }
  }
}

.public-pool-view__dashboard-buttons-wrp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.public-pool-view .public-ppool-view__dashboard-button {
  width: 100%;
}

.public-pool-view__dashboard-description {
  $color: #444b58;

  margin-top: toRem(24);
  color: $color;

  @include body-5-regular;
}

.public-pool-view__dashboard-note {
  $color: #444b58;

  margin-top: toRem(24);
  color: $color;
  width: 100%;

  @include body-italic;
}
</style>