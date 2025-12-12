<template>
  <div class="app-banner">
    <div
      class="app-banner__btn"
      role="link"
      tabindex="0"
      @click="openForumHome"
      @keydown.enter.prevent="openForumHome"
      @keydown.space.prevent="openForumHome"
    >
      <p class="app-banner__text">
        A proposal to migrate $SPACE to ClankerV4 is live!
        <a
          href="https://app.charmverse.io/nounspace/forum/proposal/33"
          target="_blank"
          rel="noopener noreferrer"
          class="app-banner-inline-link"
          @click.stop
        >
          Read it and vote now
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const openForumHome = () => {
  window.open('https://app.charmverse.io/nounspace/forum/', '_blank', 'noopener,noreferrer')
}
</script>

<style lang="scss" scoped>
.app-banner {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-gap: toRem(24);
  // margin-top: 2rem;
  margin-bottom: 1.5rem;

  @include respond-to(medium) {
    // grid-template-columns: 1fr 1fr;
    // grid-auto-flow: row;
    // grid-gap: toRem(12);
  }
}

.app-banner__btn {
  background: url('/branding/migration-banner.png') no-repeat center center;
  background-size: cover;
  font-size: 1.5rem;
  font-weight: 700;
  $color: #ffffff;
  display: grid;
  place-items: center;
  padding: toRem(48) toRem(48);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: var(--transition-duration-fast) var(--transition-timing-default);

  &.router-link-active,
  &--active {
    border-color: var(--primary-main);
    color: var(--primary-main);

    @include body-2-semi-bold;
  }

  &:not(.router-link-active):not(.app-banner__btn--active) {
    &:not([disabled]):hover,
    &:not([disabled]):focus,
    &:not([disabled]):active {
      border-color: var(--primary-main);
      color: var(--primary-main);
    }
  }

  @include body-2-regular;

  @include respond-to(medium) {
    padding: toRem(32) toRem(16);
  }
}

.app-banner__text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: 700;
  $color: #ffffff;
  display: inline;
  place-items: center;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
}

.app-banner-inline-link {
  font-size: inherit;
  font-weight: inherit;
  text-decoration: underline;
  color: #00a7ff;
}
</style>
