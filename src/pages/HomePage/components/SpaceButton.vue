<!-- ../components/SpaceButton.vue -->
<template>
  <button :class="['app-view__container', buttonClass]" @click="onClick">
    <p class="container-title">{{ title }}</p>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  buttonClass: String,
});

const emit = defineEmits(['click']);

function onClick() {
  emit('click');
}
</script>

<style scoped>
/* Base button style */
.app-view__container {
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  color: #ffffff; /* Ensures text color is always white */
  font-weight: 700;
}

/* Title style */
.container-title {
  margin: 0;
  font-size: 1.25rem;
}

/* Styles for specific button classes */
.space-drop-button {
  background-color: #00ff00; /* Green background */
  width: 100%; /* Full width */
}

.space-drop-button:hover {
  background-color: #00cc00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow on hover */
}

.mint-nogs-button {
  background-color: #FF5A1F; /* Orange background */
  width: 100%; /* Full width */
}

.mint-nogs-button:hover {
  background-color: #e04e1a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow on hover */
}
</style>
