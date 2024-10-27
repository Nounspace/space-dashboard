<!-- ../components/TipContainer.vue -->
<template>
  <div class="tip-container">
    <p class="tip-container-title">Daily tip allowance:</p>
    <p class="tip-container-value">{{ totalSpace }}</p>
    <p class="container-subtitle">Hold 1 nOGs NFT & 11,111 $SPACE to receive a tip allowance</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  totalSpace: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.tip-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px; /* Slightly increased padding for better spacing */
  border: 1px solid #eeeeee;
  border-radius: 6px;
  text-align: center;
  background-color: #f9f9f9; /* Light background to distinguish the container */
  margin-top:20px;

}

.tip-container-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #333; /* Darker color for title */
}

.tip-container-value {
  font-size: 2rem; /* Slightly larger font for emphasis */
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0.5rem;
  color: #00cc00; /* Green color to highlight the value */
}

.container-subtitle {
  font-size: 0.85rem; /* Slightly increased font size for readability */
  line-height: 1.4;
  margin-top: 0.75rem;
  color: #666; /* Subtle color for the subtitle */
  text-align: center;
  max-width: 80%; /* Limit the width of subtitle text */
}
</style>
