<template>
  <main class="home-page">
    <div class="home-page__content-wrp">
      <app-tabs :tabs="tabs" />
      <router-view v-slot="{ Component }" class="home-page__view">
        <keep-alive>
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AppTabs } from '@/common'
import { useI18n } from '@/composables'
import { NETWORK_IDS, ROUTE_NAMES } from '@/enums'
import { useWeb3ProvidersStore } from '@/store'
import { type Tab } from '@/types'
import { config } from '@config'
import { computed } from 'vue'

const { t } = useI18n()
const web3ProvidersStore = useWeb3ProvidersStore()

</script>

<style lang="scss" scoped>
.home-page {
  $z-index: 1;

  position: relative;
  z-index: $z-index;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;

  &:before {
    $z-index: -1;

    position: absolute;
    z-index: $z-index;
    bottom: toRem(-700);
    left: toRem(-700);
    content: '';
    display: block;
    height: toRem(1400);
    width: toRem(1400);
    // background: radial-gradient(#ff6600, transparent 60%);

    @include respond-to(medium) {
      margin: 0 auto;
      bottom: toRem(-1700);
      left: unset;
      height: toRem(2600);
      width: toRem(2600);
    }
  }

  &:after {
    $z-index: -1;

    position: absolute;
    top: toRem(-440);
    right: toRem(-1030);
    z-index: $z-index;
    content: '';
    display: block;
    height: toRem(1400);
    width: toRem(1400);

    @include respond-to(medium) {
      display: none;
    }
  }
}

.home-page__content-wrp {
  width: 100%;
  max-width: toRem(1240);

  @include respond-to(medium) {
    max-width: unset;
  }
}

.home-page .home-page__view {
  margin-top: toRem(64);
  display: grid;
  grid-template-columns: 1fr minmax(0, toRem(704));
  grid-gap: toRem(30);

  @include respond-to(medium) {
    margin-top: toRem(30);
    grid-template-columns: 1fr;
    grid-gap: toRem(28);
  }
}
</style>
