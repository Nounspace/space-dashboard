<template>
  <div class="app-tabs">
    <div class="app-tabs__wrapper">
      <button v-if="isMobile" class="app-tabs__nav app-tabs__nav--prev" @click="scrollLeft">
        &lt;
      </button>
      <div class="app-tabs__carousel" ref="carousel">
        <div v-for="tab in tabs" :key="tab.id" class="app-tabs__carousel-item">
          <component
            :is="tab.route ? 'router-link' : 'a'"
            :to="tab.route"
            :href="tab.href"
            :target="tab.href ? '_blank' : undefined"
            :rel="tab.href ? 'noopener noreferrer' : undefined"
            class="app-tabs__btn"
            :class="{ 'app-tabs__btn--active': modelValue?.id === tab.id }"
            @click="updateTab(tab)"
          >
            {{ tab.title }}
          </component>
        </div>
      </div>
      <button v-if="isMobile" class="app-tabs__nav app-tabs__nav--next" @click="scrollRight">
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { type Tab } from '@/types'

defineProps<{
  modelValue?: Tab
  tabs: Tab[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Tab): void
}>()

const updateTab = (tab: Tab) => {
  emit('update:modelValue', tab)
}

const isMobile = ref(false)
const carousel = ref<HTMLElement | null>(null)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>

<style lang="scss" scoped>
.app-tabs {
  display: flex;
  position: relative;

  .app-tabs__wrapper {
    display: flex;
    width: 100%;
  }

  .app-tabs__carousel {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .app-tabs__carousel::-webkit-scrollbar {
    display: none;
  }

  .app-tabs__carousel-item {
    flex: 0 0 auto;
  }

  .app-tabs__nav {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1;
    padding: 0 10px;
    color: #000;
  }

  .app-tabs__nav--prev {
    margin-right: 10px;
  }

  .app-tabs__nav--next {
    margin-left: 10px;
  }
}

.app-tabs__btn {
  $color: #444b58;
  display: grid;
  place-items: center;
  padding: toRem(16) toRem(24);
  color: $color;
  cursor: pointer;
  transition: var(--transition-duration-fast) var(--transition-timing-default);
  position: relative;
  font-size: 1.15rem !important;
  text-align: center;

  &.router-link-active,
  &--active {
    font-weight: bold;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 4px;
      background-color: #00ff00;
      border-radius: 2px;
    }

    @include body-2-semi-bold;
  }

  &:not(.router-link-active):not(.app-tabs__btn--active) {
    &:not([disabled]):hover,
    &:not([disabled]):focus,
    &:not([disabled]):active {
      border-color: #00D318;
      color: #00D318;
    }
  }

  @include body-2-regular;

  @include respond-to(medium) {
    padding: toRem(12) toRem(16);

    &.router-link-active,
    &--active {
      &:after {
        bottom: 5px;
      }
    }
  }

  @include respond-to(small) {
    font-size: 1rem !important;
  }

  @include respond-to(xsmall) {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 768px) {
  .app-tabs__carousel {
    justify-content: flex-start !important;
  }
}
</style>