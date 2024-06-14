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
      <button type="button" class="music-player__btn" @click="togglePlay">
        <svg v-if="!isPlaying" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" focusable="false" class="chakra-icon css-15ep0e" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 17 3.59375 L 15.28125 5.28125 L 9.5625 11 L 5 11 L 5 21 L 9.5625 21 L 15.28125 26.71875 L 17 28.40625 Z M 23.8125 8.1875 L 22.40625 9.59375 C 25.925781 13.113281 25.925781 18.761719 22.40625 22.28125 L 23.8125 23.71875 C 28.09375 19.4375 28.09375 12.46875 23.8125 8.1875 Z M 15 8.4375 L 15 23.5625 L 10.71875 19.28125 L 10.40625 19 L 7 19 L 7 13 L 10.40625 13 L 10.71875 12.71875 Z M 20.90625 11.09375 L 19.5 12.5 C 21.410156 14.410156 21.402344 17.574219 19.46875 19.59375 L 20.9375 21 C 23.601563 18.21875 23.59375 13.78125 20.90625 11.09375 Z"></path></svg>
        <svg v-else stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" focusable="false" class="chakra-icon css-15ep0e" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 15 4.59375 L 13.28125 6.28125 L 8.5625 11 L 4 11 L 4 21 L 8.5625 21 L 13.28125 25.71875 L 15 27.40625 Z M 13 9.4375 L 13 22.5625 L 9.71875 19.28125 L 9.40625 19 L 6 19 L 6 13 L 9.40625 13 L 9.71875 12.71875 Z M 20.21875 11.78125 L 18.78125 13.21875 L 21.5625 16 L 18.78125 18.78125 L 20.21875 20.21875 L 23 17.4375 L 25.78125 20.21875 L 27.21875 18.78125 L 24.4375 16 L 27.21875 13.21875 L 25.78125 11.78125 L 23 14.5625 Z"></path></svg>
    </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const audio = ref(null)
const isPlaying = ref(false)

onMounted(() => {
  audio.value = new Audio('/branding/Nounish_Lofi_Radio_-_61224_11.19_PM.mp3')
})

const togglePlay = () => {
  if (!audio.value) return

  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  isPlaying.value = !isPlaying.value
}

</script>

<style lang="scss" scoped>
.music-player {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;

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
    color: #a0aec0;
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
    background: #cbd5e0;
    flex-shrink: 0;
    cursor: pointer;
  }
}
</style>
