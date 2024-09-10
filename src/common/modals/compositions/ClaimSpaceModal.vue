<template>
  <iframe-modal
    v-bind="props"
    class="claim-space-modal"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal }">
      <iframe src="https://app.hedgey.finance/claim/efcda4cf-d1aa-44b8-be0b-542d0e47962f" frameborder="0" class="full-size-iframe"></iframe>
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
}
</style>
