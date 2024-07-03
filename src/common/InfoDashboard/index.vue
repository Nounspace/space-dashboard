<template>
  <div class="info-dashboard" :class="{ 'info-dashboard--loading': isLoading }">
    <transition name="fade" mode="out-in">
      <div v-if="web3ProvidersStore.isConnected" class="info-dashboard__wrp">
        <div class="info-dashboard__header">
          <div>
            <div class="info-dashboard__header-title-wrp">
              <h5 class="info-dashboard__header-title">
                {{ $t('info-dashboard.header-title') }}
              </h5>
            </div>
            <p class="info-dashboard__header-subtitle">
              {{ $t('info-dashboard.header-subtitle') }}
            </p>
          </div>
        </div>
        <div class="info-dashboard__app-chart-wrp">
          <app-chart
            class="info-dashboard__app-chart"
            :config="chartConfig"
            :is-loading="isLoading || isChartDataUpdating"
          />
        </div>
        <ul v-if="indicators?.length" class="info-dashboard__indicators">
          <li
            v-for="(indicator, idx) in indicators"
            :key="idx"
            class="info-dashboard__indicator"
          >
            <div class="info-dashboard__indicator-title-wrp">
              <app-icon
                class="info-dashboard__indicator-icon"
                :name="indicator.iconName"
              />
              <h5 class="info-dashboard__indicator-title">
                {{ indicator.title }}
              </h5>
            </div>
            <p class="info-dashboard__indicator-value">
              {{ indicator.value || '-' }}
            </p>
          </li>
        </ul>
        <div v-if="$slots.default" class="info-dashboard__slot-wrp">
          <slot />
        </div>
      </div>
      <div v-else class="info-dashboard__wrp">
        <img
          class="info-dashboard__logo"
          src="/branding/info-dashboard-logo.png"
          alt="info-dashboard-logo"
        />
        <p class="info-dashboard__connection-msg">
          {{ $t('info-dashboard.connection-msg') }}
        </p>
        <connect-wallet-button class="info-dashboard__connect-wallet-btn" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from '@/composables'
import { ErrorHandler } from '@/helpers'
import { useWeb3ProvidersStore } from '@/store'
import type { ChartConfig, Erc1967ProxyType, InfoDashboardType } from '@/types'
import { Time, formatEther } from '@/utils'
import { onMounted, reactive, ref, watch } from 'vue'
import { CHART_CONFIG } from './const'
import { getChartData } from './helpers'
import AppIcon from '../AppIcon.vue'
import AppChart from '../AppChart.vue'
import ConnectWalletButton from '../ConnectWalletButton.vue'

const props = withDefaults(
  defineProps<{
    poolId: number
    poolData: Erc1967ProxyType.PoolData | null
    indicators?: InfoDashboardType.Indicator[]
    isLoading?: boolean
  }>(),
  {
    indicators: () => [],
    isLoading: false,
  },
)

const { t } = useI18n()

const web3ProvidersStore = useWeb3ProvidersStore()

const isChartDataUpdating = ref(false)

const chartConfig = reactive<ChartConfig>({ ...CHART_CONFIG })

const ONE_DAY_TIMESTAMP = 24 * 60 * 60

const updateChartData = async () => {
  isChartDataUpdating.value = true

  try {
    if (!props.poolData) throw new Error('poolData unavailable')

    const chartData = await getChartData(props.poolId, props.poolData.payoutStart)

    chartConfig.data.labels = Object.keys(chartData).map(key => {
      const timestamp = (Number(key) + 1) * ONE_DAY_TIMESTAMP
      const date = new Date(timestamp * 1000)
      return new Time(date).format('MMMM D')
    })

    chartConfig.data.datasets[0].data = Object.values(chartData).map(amount =>
      Math.ceil(Number(formatEther(amount))),
    )
  } catch (error) {
    ErrorHandler.process(error)
  }

  isChartDataUpdating.value = false
}

onMounted(() => {
  if (props.poolData) {
    updateChartData()
  }
})

watch(
  () => props.poolData,
  (newPoolData) => {
    if (newPoolData) {
      updateChartData()
    }
  }
)
</script>



<style lang="scss" scoped>
.info-dashboard {
  padding: toRem(24) toRem(20) toRem(30);
  height: max-content;
  border: toRem(1) solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    -84deg,
    rgba(255, 255, 255, 0.48),
    rgba(255, 255, 255, 0.08)
  );
  background: #c0c0c0;
  border-radius: 6px;

  @include respond-to(medium) {
    padding: toRem(20) toRem(16) toRem(22);
  }
}

.info-dashboard__wrp {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.info-dashboard__header-title-wrp {
  display: flex;
  align-items: center;
  gap: toRem(12);
}

.info-dashboard__header-title {
  @include body-2-semi-bold;
}

.info-dashboard .info-dashboard__header-title-icon {
  $color: #cccccc;

  color: $color;
  height: toRem(24);
  width: toRem(24);
  pointer-events: unset;
  transition: var(--transition-duration-fast) var(--transition-timing-default);

  &:hover {
    color: var(--text-secondary-light);
  }
}

.info-dashboard__header-subtitle {
  $color: #444b58;

  color: $color;

  @include body-6-regular;
}

.info-dashboard__app-chart-wrp {
  margin-top: toRem(16);
  padding-top: toRem(24);
  border-top: toRem(2) solid #494949;
  width: 100%;
}

.info-dashboard .info-dashboard__app-chart {
  height: toRem(242);
}

.info-dashboard__indicators {
  margin-top: toRem(16);
  width: 100%;
  display: grid;
  grid-gap: toRem(8);
  padding-top: toRem(24);
  border-top: toRem(2) solid #494949;
}

.info-dashboard__indicator {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  grid-gap: toRem(24);

  @include respond-to(medium) {
    grid-gap: toRem(16);
  }
}

.info-dashboard__indicator-title-wrp {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: toRem(8);

  .info-dashboard--loading & {
    height: toRem(26);
    width: 100%;

    @include skeleton;

    @include respond-to(medium) {
      height: toRem(20);
    }
  }

  @include respond-to(medium) {
    grid-gap: toRem(4);
  }
}

.info-dashboard__indicator-icon {
  height: toRem(24);
  width: toRem(24);

  @include respond-to(medium) {
    height: toRem(20);
    width: toRem(20);
  }
}

.info-dashboard__indicator-title {
  @include body-3-regular;
}

.info-dashboard__indicator-value {
  justify-self: end;

  .info-dashboard--loading & {
    height: toRem(26);
    width: 100%;

    @include skeleton;

    @include respond-to(medium) {
      height: toRem(20);
    }
  }

  @include body-3-semi-bold;

  @include text-ellipsis;
}

.info-dashboard__slot-wrp {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: toRem(24);

  .info-dashboard__indicators + & {
    margin-top: toRem(28);

    @include respond-to(medium) {
      margin-top: toRem(24);
    }
  }
}

.info-dashboard__logo {
    max-width: 100%;
    height: auto;
    max-height: 13.75rem;

  @include respond-to(medium) {
    height: toRem(112);
    // width: toRem(80);
  }
}

.info-dashboard__connection-msg {
  margin-top: toRem(24);
  text-align: center;
}

.info-dashboard .info-dashboard__connect-wallet-btn {
  margin-top: toRem(24);
  min-width: toRem(190);

  @include respond-to(medium) {
    min-width: toRem(162);
  }
}
</style>
