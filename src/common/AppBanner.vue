<template>
  <div class="app-banner">
    <a href="https://paragraph.xyz/@nounspace/space-fair-launch" target="_blank">
      <div class="app-banner__btn">
        <p class="app-banner__text">
          $SPACE Fair Launch is LIVE!
          <a href="https://paragraph.xyz/@nounspace/space-fair-launch" target="_blank" class="app-banner-inline-link">
            Read the full announcement 🚀
          </a>
        </p>
      </div>
    </a>
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
