<template>
  <div class="tabs-container">
    <div class="tabs">
      <button
        :class="{ active: activeTab === 0 }"
        @click="selectTab(0)"
      >
        Season 4
      </button>
      <button
        :class="{ active: activeTab === 0 }"
        @click="selectTab(0)"
      >
        Season 3
      </button>
      <button
        :class="{ active: activeTab === 0 }"
        @click="selectTab(0)"
      >
        Season 2
      </button>
      <button
        :class="{ active: activeTab === 1 }"
        @click="selectTab(1)"
      >
        Season 1
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeTab: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['changeTab']);

function selectTab(tabIndex: number) {
  emit('changeTab', tabIndex);
}
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tabs {
  display: flex;
  margin-bottom: 1rem;
  justify-content: center; /* Center the tabs horizontally */
}

.tabs button {
  padding: 10px 20px;
  margin: 0 5px; /* Add spacing between buttons */
  cursor: pointer;
  border: none;
  background-color: #eeeeee;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Add extra specificity here to ensure the active state takes effect */
.tabs button.active {
  background-color: #00cc00 !important;
  color: white !important;
  font-weight: bold;
  border-bottom: 3px solid #007b00;
}

.tabs button:not(.active):hover {
  background-color: #cccccc; /* Hover effect for inactive buttons */
}
</style>
