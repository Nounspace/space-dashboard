<template>
  <iframe-modal
    :is-shown="props.isShown"
    @update:is-shown="handleModalClose"
    class="mint-nogs-modal"
  >
    <template #default="{ modal }">
      <link rel="stylesheet" href="https://mint.highlight.xyz/assets/embed.css" />
      <div data-widget="highlight-mint-card" data-mint-collection-id="663d2717dffb7b3a490f398f"></div>
      <component
        is="script"
        type="module"
        crossorigin="true"
        src="https://mint.highlight.xyz/assets/embed.js?v=1"
        id="highlight-embed-script"
        data-embed-version="2.0"
      ></component>
    </template>
  </iframe-modal>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, withDefaults, watch, onMounted } from 'vue';
import IframeModal from '../IframeModal.vue';

// Emit event for closing the modal
const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

// Define props with defaults
const props = withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)

// Log when modal props change
watch(() => props.isShown, (newVal) => {
  console.log(`Modal isShown prop changed: ${newVal}`);
  if (newVal) {
    console.log("Modal opened");
  } else {
    console.log("Modal closed");
  }
});

// Function to handle modal closing
function handleModalClose(event: boolean) {
  console.log(`Modal closing: ${event}`);
  emit('update:is-shown', event); // Emit event to update parent
}

// Log when component mounts
onMounted(() => {
  console.log('mint-nogs-modal component mounted');
});
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
