<!-- ../components/TextBar.vue -->
<template>
  <div class="text-bar">
    <p class="text-bar-title">Users</p>
    <div class="text-bar__subtitle-wrp">
      <p class="text-bar__subtitle">20% of $SPACE emissions are allocated to nounspace users</p>
    </div>
    <div class="text-bar__description-wrp">
      <p class="container-description">📢 $SPACE Drop 4 claims open on February 1! Check your eligibility and claim by February 28.</p>
      <p class="container-description">Hold nOGs and use nounspace to be eligible for $SPACE drop 5 in March</p>
      <p class="container-description">
        More ways to earn $SPACE are coming soon! Have an idea for distributing $SPACE to nounspace users?
        <a href="https://app.charmverse.io/nounspace/governance-process-03537464653772093" target="_blank">Make a proposal</a>
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.text-bar {
  border-radius: 0.375rem;
  border: 1px solid #eeeeee;
  padding: 1.25rem;
  width: 100%;
}

.text-bar-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
}

.text-bar__subtitle-wrp {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.text-bar__subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-top: 0.75rem;
}

.text-bar__description-wrp {
  margin-top: 1.5rem;
}

.container-description {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  margin-top: 1rem;
}

.container-description a {
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 1px solid currentColor;
  }
}
</style>
