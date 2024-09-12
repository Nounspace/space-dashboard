<template>
  <div class="text-bar" :class="{ 'text-bar--loading': isLoading }">
    <p class="text-bar-title">{{ title }}</p>
    <div class="text-bar__subtitle-wrp">
      <p class="text-bar__subtitle">{{ subtitle }}</p>
    </div>
    <div class="text-bar__description-wrp">
      <template v-if="$slots.description">
        <slot name="description" />
      </template>
      <template v-else>
        <p class="text-bar-description">{{ description }}</p>
      </template>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { type InfoBarType } from '@/types'

withDefaults(
  defineProps<{
    subtitle: string
    status: 'public' | 'private'
    title: string
    description: string
    indicators: InfoBarType.Indicator[]
    isLoading?: boolean
  }>(),
  { isLoading: false },
)
</script>

<style lang="scss" scoped>
.text-bar {
  border-radius: 0.375rem; /* 6px */
  border: 1px solid #eeeeee;
  padding: 1.25rem; /* 20px */
  height: max-content;
}

.text-bar-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2; /* 29.05px */
  text-align: left;
}

.text-bar__subtitle-wrp {
  display: flex;
  align-items: center;
  gap: 1rem; /* 16px */

  @include respond-to(medium) {
    margin-bottom: 0.5rem; /* 8px */
    gap: 0.5rem; /* 8px */
  }
}

.text-bar__subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-top: 0.75rem; /* 8px */
}

.text-bar-description {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
}

.text-bar__status {
  $color: #15151d;

  color: $color;
  padding: 0.25rem 0.75rem; /* 4px 12px */

  &--public {
    background: var(--primary-main);
  }

  &--private {
    background: linear-gradient(90deg, #e08c5c 0%, #ffbe72 100%);
  }

  .text-bar--loading & {
    @include skeleton;
  }

  @include respond-to(medium) {
    padding: 0.125rem 0.875rem; /* 2px 14px */
  }
}

.text-bar__description-wrp {
  margin-top: 1.5rem; /* 24px */

  @include respond-to(medium) {
    margin-top: 1rem; /* 16px */
  }
}

.text-bar__indicators {
  margin-top: 1.5rem; /* 24px */
  display: grid;
  grid-gap: 0.5rem; /* 8px */
  padding-top: 1rem; /* 16px */
  border-top: 0.125rem solid #494949; /* 2px */

  @include respond-to(medium) {
    margin-top: 1rem; /* 16px */
    grid-gap: 0.625rem; /* 10px */
  }
}

.text-bar__indicator {
  display: grid;
  grid-template-columns: max-content minmax(max-content, 1fr);
  align-items: center;
  grid-gap: 1.5rem; /* 24px */

  @include respond-to(medium) {
    grid-gap: 1rem; /* 16px */
  }
}

.text-bar__indicator-title-wrp {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 0.25rem; /* 4px */

  .text-bar--loading & {
    height: 1.625rem; /* 26px */
    width: 100%;

    @include skeleton;

    @include respond-to(medium) {
      height: 1.25rem; /* 20px */
    }
  }
}

.text-bar__indicator-title {
  @include body-4-regular;
}

.text-bar .text-bar__indicator-note {
  $color: #cccccc;

  color: $color;
  height: 1.25rem; /* 20px */
  width: 1.25rem; /* 20px */
  pointer-events: unset;
  transition: var(--transition-duration-fast) var(--transition-timing-default);

  &:hover {
    color: var(--text-secondary-light);
  }
}

.text-bar__indicator-value {
  justify-self: end;

  .text-bar--loading & {
    height: 1.625rem; /* 26px */
    width: 100%;

    @include skeleton;

    @include respond-to(medium) {
      height: 1.25rem; /* 20px */
    }
  }

  @include body-3-semi-bold;

  @include text-ellipsis;
}
</style>
