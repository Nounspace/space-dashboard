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

watch(() => props.isShown, (newVal) => {
  if (newVal) {
    console.log("Modal opened");
  } else {
    console.log("Modal closed");
  }
});

function handleModalClose(event: boolean) {
  emit('update:is-shown', event);
}

onMounted(() => {
  console.log('mint-nogs-modal component mounted');
});
</script>

<style lang="scss" scoped>
.mint-nogs-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Dimmed background for modal focus */
  z-index: 1000; /* Ensure modal appears on top */
}

.full-size-iframe {
  width: 80%; /* Adjust width as needed */
  max-width: 600px; /* Limit max width */
  height: 80%; /* Adjust height as needed */
  border: none;
  background: #ffffff; /* White background for the iframe content */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Shadow for depth */
}
</style>
