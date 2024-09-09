<template>
  <div class="app-tabs">
    <component
      v-for="tab in tabs"
      :key="tab.id"
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
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
.app-tabs {
  display: flex;
  justify-content: center;
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
  }
}
</style>
