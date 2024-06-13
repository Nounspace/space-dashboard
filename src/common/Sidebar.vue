<template>
  <div class="app-sidebar">
    <p>Home</p>
    <p>$SPACE Fair Launch</p>
    <p>nOGs</p>
    <p>FAQ</p>
  </div>
</template>

<style lang="scss" scoped>
$z-index: 1000;

.app-sidebar {
  position: fixed;
  z-index: $z-index;
  // margin-top: toRem(32);
  top: var(--app-navbar-height); /* Adjusts the height up to the navbar */
  left: 20px; /* Adds padding to the left */
  // height: calc(60% - var(--app-navbar-height));
  height: max-content;
  width: var(--app-sidebar-width);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 6px;

  @include respond-to(medium) {
    display: none;
  }
}
.app-sidebar__btn {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-top: auto;
}
</style>
