<template>
  <div class="music-player">
    <div class="music-player__poster">
      <img src="/branding/player-poster.png" alt="Poster" />
    </div>
    <div class="music-player__info">
      <div>
      <p class="music-player__title">All Day, Everyday, Forever: A Nou...</p>
      <p class="music-player__artist">NounsTube</p>
      </div>
      <button type="button" class="music-player__btn" @click="onClick">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" focusable="false" class="chakra-icon css-15ep0e" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 15 4.59375 L 13.28125 6.28125 L 8.5625 11 L 4 11 L 4 21 L 8.5625 21 L 13.28125 25.71875 L 15 27.40625 Z M 13 9.4375 L 13 22.5625 L 9.71875 19.28125 L 9.40625 19 L 6 19 L 6 13 L 9.40625 13 L 9.71875 12.71875 Z M 20.21875 11.78125 L 18.78125 13.21875 L 21.5625 16 L 18.78125 18.78125 L 20.21875 20.21875 L 23 17.4375 L 25.78125 20.21875 L 27.21875 18.78125 L 24.4375 16 L 27.21875 13.21875 L 25.78125 11.78125 L 23 14.5625 Z"></path></svg>
    </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const onClick = async () => {
  console.log('play')
}
</script>

<style lang="scss" scoped>
.music-player {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #E2E8F0;

  @include respond-to(medium) {
    border-radius: 64px;
  }

  &__poster {
    @include respond-to(medium) {
      margin-left: .5rem;
    }
    img {
      width: 74px;
      height: 74px;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      margin: 0;
      display: block;

      @include respond-to(medium) {
        width: 30px;
        height: 30px;
        border-radius: 0.5rem;
      }
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .5rem;
  }

  &__title {
    margin: 0px;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @include respond-to(medium) {
      font-size: 0.6rem;
    }
  }

  &__artist {
    margin: 0px;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.2;
    color: #A0AEC0;
    overflow: hidden;
    @include respond-to(medium) {
      font-size: 0.6rem;
    }
  }

  .music-player__btn {
    all: unset;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: grid;
    place-content: center;
    background: #CBD5E0;
    flex-shrink: 0;
    cursor: pointer;
  }
}
</style>
