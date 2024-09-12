<template>
  <iframe-modal
    v-bind="props"
    class="mint-nogs-modal"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal }">
      <link rel="stylesheet" href="https://mint.highlight.xyz/assets/embed.css" />
      <div data-widget="highlight-mint-card" data-mint-collection-id="663d2717dffb7b3a490f398f"  ></div>
      <component is="script" type="module" crossorigin="true" src="https://mint.highlight.xyz/assets/embed.js?v=1" id="highlight-embed-script" data-embed-version="2.0"></component>
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
.mint-nogs-modal {
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
