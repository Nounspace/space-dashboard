<template>
  <div class="app-banner">
    <div class="app-banner__btn">
      <p class="app-banner__text">
        $SPACE Fair Launch is LIVE!
      </p>
    </div>
  </div>
</template>

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
  background: url('/branding/woods.png') no-repeat center center;
  background-size: cover;
  font-size: 1.5rem;
  font-weight: 700;
  $color: #ffffff;
  display: grid;
  place-items: center;
  padding: toRem(32) toRem(48);
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
    padding: toRem(12) toRem(16);
  }
}

.app-banner__text {
  font-size: 1.5rem;
  font-weight: 700;
  $color: #ffffff;
  display: grid;
  place-items: center;
  color: #ffffff;
}
</style>
