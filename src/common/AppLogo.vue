<template>
  <div class="app-logo">
    <a class="app-logo__link" href="https://www.nounspace.com/">
      <svg class="app-logo__img">
        <use href="/branding/logo.svg#logo" />
      </svg>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.app-logo__img {
  display: block;
  height: toRem(15);
  width: toRem(40);
  color: #000000;
  transition: color var(--transition-duration-fast)
    var(--transition-timing-default);

  .app-logo__link:hover &,
  .app-logo__link:focus &,
  .app-logo__link:active & {
    color: var(--primary-main);
  }

  @include respond-to(medium) {
    height: toRem(24);
    width: toRem(56);
  }
}
</style>
