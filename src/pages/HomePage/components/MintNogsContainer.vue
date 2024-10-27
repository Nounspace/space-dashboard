<!-- ../components/MintNogsContainer.vue -->
<template>
  <div class="mint-nogs-container">
    <p class="container-title mint-nogs-container-text">Mint nOGs, get rewarded.</p>
    <ul class="mint-nogs-list">
      <li class="mint-nogs-container-text">Earn $SPACE</li>
      <li class="mint-nogs-container-text">Activate $SPACE tip allowance</li>
      <li class="mint-nogs-container-text">Access to new features early</li>
      <li class="mint-nogs-container-text">Enjoy premium access for life</li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Styles for MintNogsContainer component */

.mint-nogs-container {
  background-image: url('@/assets/mint_nogs.png'); /* Ensure the image path is correct */
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  padding: 24px; /* Increased padding for better spacing */
  color: white; /* Ensures text remains readable on the background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Adds a shadow to elevate the container */
}

/* Title styling */
.container-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); /* Add shadow to improve readability */
}

/* Text color and styling for list items */
.mint-nogs-container-text {
  color: #ffffff; /* Ensures text color is white for readability */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6); /* Adds shadow to text for better contrast */
}

/* Styling for the unordered list */
.mint-nogs-list {
  padding-left: 1.5rem;
  list-style-type: disc;
  margin: 0;
}

.mint-nogs-list li {
  font-weight: 500;
  margin: 0.5rem 0;
  line-height: 1.4;
}
</style>
