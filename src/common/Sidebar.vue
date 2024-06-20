<template>
  <div class="app-sidebar">
    <div class="app-sidebar__links">
      <a href="https://www.nounspace.com"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"></path></svg> <span>Home</span></a>
      <a href="https://space.nounspace.com" class="active"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 25.90625 4 C 25.210938 4 24.242188 4.03125 23.21875 4.125 C 21.171875 4.316406 18.808594 4.660156 17.34375 6.125 C 16.113281 7.355469 13.570313 10.621094 11.21875 13.6875 C 10.753906 14.292969 10.773438 14.28125 10.34375 14.84375 L 8.625 14.75 C 7.347656 14.683594 6.117188 15.222656 5.3125 16.21875 L 3.21875 18.78125 L 2.1875 20.09375 L 3.8125 20.40625 L 7.09375 21.0625 L 10.9375 24.90625 L 11.59375 28.1875 L 11.9375 29.8125 L 13.21875 28.78125 L 15.78125 26.6875 C 16.777344 25.882813 17.316406 24.652344 17.25 23.375 L 17.15625 21.6875 C 17.738281 21.246094 17.71875 21.257813 18.34375 20.78125 C 21.417969 18.425781 24.695313 15.898438 25.90625 14.6875 C 27.359375 13.234375 27.683594 10.835938 27.875 8.78125 C 28.066406 6.726563 27.96875 4.96875 27.96875 4.96875 L 27.9375 4.0625 L 27.03125 4.03125 C 27.03125 4.03125 26.601563 4 25.90625 4 Z M 25 6 C 25.398438 6 25.679688 6.023438 25.96875 6.03125 C 25.980469 6.613281 26.003906 7.21875 25.875 8.59375 C 25.699219 10.488281 25.121094 12.597656 24.46875 13.25 C 23.578125 14.140625 20.1875 16.839844 17.125 19.1875 C 14.417969 21.261719 12.511719 22.71875 11.96875 23.125 L 8.90625 20.0625 C 9.316406 19.511719 10.71875 17.597656 12.78125 14.90625 C 15.125 11.851563 17.832031 8.449219 18.75 7.53125 C 19.433594 6.847656 21.519531 6.269531 23.40625 6.09375 C 24.089844 6.03125 24.601563 6 25 6 Z M 20.4375 9.53125 C 19.320313 9.53125 18.4375 10.445313 18.4375 11.5625 C 18.4375 12.679688 19.320313 13.59375 20.4375 13.59375 C 21.554688 13.59375 22.46875 12.679688 22.46875 11.5625 C 22.46875 10.445313 21.554688 9.53125 20.4375 9.53125 Z M 8.5 16.75 L 8.875 16.78125 C 8.273438 17.578125 7.289063 18.855469 7.15625 19.03125 L 5.8125 18.75 L 6.84375 17.5 C 7.246094 17.003906 7.859375 16.714844 8.5 16.75 Z M 6.21875 21.9375 C 5.363281 22.792969 4.875 23.976563 4.53125 24.96875 C 4.1875 25.960938 4.03125 26.78125 4.03125 26.78125 L 3.71875 28.25 L 5.1875 27.96875 C 5.1875 27.96875 5.984375 27.832031 6.96875 27.5 C 7.953125 27.167969 9.136719 26.675781 10.03125 25.78125 L 8.625 24.375 C 8.179688 24.820313 7.296875 25.210938 6.5 25.5 C 6.804688 24.667969 7.25 23.722656 7.625 23.34375 Z M 15.21875 23.125 L 15.25 23.5 C 15.285156 24.140625 15.03125 24.753906 14.53125 25.15625 L 13.25 26.1875 L 12.96875 24.84375 C 13.144531 24.714844 14.421875 23.722656 15.21875 23.125 Z"></path></svg> <span>$SPACE Fair Launch</span></a>
      <a @click="navigateAndReload('https://www.nounspace.com/nogs/mint')" href="https://www.nounspace.com/nogs/mint"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 15 3 L 15 8 L 17 8 L 17 3 Z M 7.5 6.09375 L 6.09375 7.5 L 9.625 11.0625 L 11.0625 9.625 Z M 24.5 6.09375 L 20.9375 9.625 L 22.375 11.0625 L 25.90625 7.5 Z M 16 9 C 12.144531 9 9 12.144531 9 16 C 9 19.855469 12.144531 23 16 23 C 19.855469 23 23 19.855469 23 16 C 23 12.144531 19.855469 9 16 9 Z M 16 11 C 18.773438 11 21 13.226563 21 16 C 21 18.773438 18.773438 21 16 21 C 13.226563 21 11 18.773438 11 16 C 11 13.226563 13.226563 11 16 11 Z M 3 15 L 3 17 L 8 17 L 8 15 Z M 24 15 L 24 17 L 29 17 L 29 15 Z M 9.625 20.9375 L 6.09375 24.5 L 7.5 25.90625 L 11.0625 22.375 Z M 22.375 20.9375 L 20.9375 22.375 L 24.5 25.90625 L 25.90625 24.5 Z M 15 24 L 15 29 L 17 29 L 17 24 Z"></path></svg> <span>nOGs</span></a>
      <a href="https://www.nounspace.com/faq/nounspace"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 16 10 C 13.800781 10 12 11.800781 12 14 L 14 14 C 14 12.882813 14.882813 12 16 12 C 17.117188 12 18 12.882813 18 14 C 18 14.765625 17.507813 15.445313 16.78125 15.6875 L 16.375 15.8125 C 15.558594 16.082031 15 16.863281 15 17.71875 L 15 19 L 17 19 L 17 17.71875 L 17.40625 17.59375 C 18.945313 17.082031 20 15.621094 20 14 C 20 11.800781 18.199219 10 16 10 Z M 15 20 L 15 22 L 17 22 L 17 20 Z"></path></svg> <span>FAQ</span></a>
    </div>
    <div class="app-sidebar__player-box">
      <music-player />
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const navigateAndReload = (url: any) => {
  router.push(url).then(() => location.reload())
}
</script>

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
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 8px;

  @include respond-to(medium) {
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0;
    box-shadow: 0px -2px 16px 0px #00000029;
    width: auto;
    height: auto;
    border-radius: 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;

    &__player-box {
      display: none;
    }
  }

  &__links {
    padding-inline: 14px;
    margin-bottom: 8rem;

    @include respond-to(medium) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      width: 100%;
      margin-bottom: 2rem;

      a span {
        display: none;
      }
    }
  }
}

.app-sidebar__btn {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-top: auto;
}

.app-sidebar a {
  font-weight: 600;
  font-size: 16px;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  gap: 8px; /* Space between icon and text */
  color: #000000;

  span {
    color: #000000;
  }

  &.active {
    color: #9F7AEA;

    span,
    svg {
      color: #9F7AEA;
    }
  }

  &:hover {
    color: #9F7AEA;

    span,
    svg {
      color: #9F7AEA;
    }
  }
}

.app-sidebar a,
.app-sidebar a svg {
  transition: all 0.15s ease-in-out;
}

.app-sidebar a svg {
  height: 24px;
  width: 24px;

  @include respond-to(medium) {
    height: 2rem;
    width: 2rem;
  }

  a:not([href]) {
    cursor: pointer !important;
  }
}
</style>
