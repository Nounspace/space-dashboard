<template>
  <app-modal
    class="iframe-modal"
    :is-shown="isShown"
    :is-close-by-click-outside="isCloseByClickOutside"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal }">
      <slot :modal="{ close: modal.close }" />
    </template>
  </app-modal>
</template>

<script lang="ts" setup>
import AppModal from '../AppModal.vue'

withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
    hasCloseButton?: boolean
    title?: string
    subtitle?: string
  }>(),
  {
    isCloseByClickOutside: true,
    hasCloseButton: true,
    title: '',
    subtitle: '',
  },
)

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()
</script>

<style lang="scss">
.iframe-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #ffffff;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    padding: 0;
    border-radius: 0;
  }
}
</style>