<template>
  <iframe-modal
    v-bind="props"
    class="claim-space-modal"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal }">
      <iframe src="https://app.hedgey.finance/claim/9048301e-f3f3-43f7-9c9f-2dff998b2616" frameborder="0" class="full-size-iframe"></iframe>
    </template>
  </iframe-modal>
</template>

<script lang="ts" setup>
import IframeModal from '../IframeModal.vue'

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)
</script>

<style lang="scss" scoped>
.claim-space-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.full-size-iframe {
  width: 100%;
  height: 100%;
  border: none;
  min-width: calc(100vw - 120px);
  min-height: calc(100vh - 120px);
}
</style>
