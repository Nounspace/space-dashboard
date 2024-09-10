<template>
  <main class="home-page">
    <div class="home-page__content-wrp">
      <app-tabs :tabs="tabs" />
      <app-banner v-if="viewClass === 'capital-page__view'" />
      <router-view v-slot="{ Component }" :class="viewClass">
        <keep-alive>
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { AppTabs } from '@/common'
import { AppBanner } from '@/common'
import { useI18n } from '@/composables'
import { NETWORK_IDS, ROUTE_NAMES } from '@/enums'
import { useWeb3ProvidersStore } from '@/store'
import { type Tab } from '@/types'
import { config } from '@config'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const web3ProvidersStore = useWeb3ProvidersStore()
const route = useRoute()

const tabs = computed<Tab[]>(() => {
  switch (web3ProvidersStore.networkId) {
    case NETWORK_IDS.mainnet:
      return [
        {
          title: t('home-page.capital-tab'),
          id: 'capital',
          route: { name: ROUTE_NAMES.appMainnetCapital },
        },
        {
          title: t('home-page.users-tab'),
          id: 'users',
          route: { name: ROUTE_NAMES.appMainnetUsers },
        },
        {
          title: t('home-page.developers-tab'),
          id: 'developers',
          route: { name: ROUTE_NAMES.appMainnetDevelopers },
        },
        {
          title: t('home-page.community-tab'),
          id: 'community',
          route: { name: ROUTE_NAMES.appMainnetCommunity },
        },
        {
          title: t('home-page.team-tab'),
          id: 'team',
          route: { name: ROUTE_NAMES.appMainnetTeam },
        },
      ]

    case NETWORK_IDS.testnet:
      return [
        {
          title: t('home-page.capital-tab'),
          id: 'capital',
          route: { name: ROUTE_NAMES.appTestnetCapital },
        },
        {
          title: t('home-page.users-tab'),
          id: 'users',
          route: { name: ROUTE_NAMES.appMainnetCapital },
        },
        {
          title: t('home-page.developers-tab'),
          id: 'developers',
          route: { name: ROUTE_NAMES.appMainnetCapital },
        },
        {
          title: t('home-page.community-tab'),
          id: 'community',
          route: { name: ROUTE_NAMES.appTestnetCommunity },
        },
        {
          title: t('home-page.team-tab'),
          id: 'team',
          route: { name: ROUTE_NAMES.appMainnetCapital },
        },
      ]
  }

  return []
})

const viewClass = computed(() => {
  switch (route.name) {
    case ROUTE_NAMES.appMainnetCapital:
      return 'capital-page__view'
    case ROUTE_NAMES.appMainnetUsers:
      return 'users-page__view'
    case ROUTE_NAMES.appMainnetDevelopers:
      return 'developers-page__view'
    case ROUTE_NAMES.appMainnetCommunity:
      return 'community-page__view'
    case ROUTE_NAMES.appMainnetTeam:
      return 'team-page__view'
    default:
      return 'home-page__view'
  }
})

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
  // max-width: toRem(846);

  @include respond-to(medium) {
    max-width: unset;
    padding-left: unset;
  }
}

.home-page .home-page__view {
  // margin-top: toRem(32);
  display: grid;
  grid-template-columns: 1fr minmax(0, toRem(704));
  grid-gap: toRem(30);

  @include respond-to(medium) {
    margin-top: toRem(30);
    grid-template-columns: 1fr;
    grid-gap: toRem(28);
  }
}

.home-page .capital-page__view {
  // margin-top: toRem(32);
  display: grid;
  grid-template-columns: 1fr minmax(0, toRem(704));
  grid-gap: toRem(30);

  @include respond-to(medium) {
    margin-top: toRem(30);
    grid-template-columns: 1fr;
    grid-gap: toRem(28);
  }

  @media (min-width: 1023px) and (max-width: 1280px) {
    grid-template-columns: 1fr;
    grid-gap: toRem(16);
  }

}

.home-page .community-page__view {
  // margin-top: toRem(32);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: toRem(30);

  @include respond-to(medium) {
    margin-top: toRem(30);
    grid-template-columns: 1fr;
    grid-gap: toRem(28);
  }
}
</style>
