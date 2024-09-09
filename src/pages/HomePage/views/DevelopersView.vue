<template>
  <div class="app-view">
    <div class="app-view__grid">
      <div class="text-bar">
        <p class="text-bar-title">Developers</p>
        <div class="text-bar__subtitle-wrp">
          <p class="text-bar__subtitle">20% of $SPACE emissions are allocated to developers that contribute to Nounspace</p>
        </div>
        <div class="text-bar__description-wrp">
          <p class="text-bar-description">20% of $SPACE emissions are designated for developers that contribute to Nounspace, either by building free fidgets the community likes, completing bounties, contributing code that’s merged to any Nounspace repositories, or responsibly disclosing any security vulnerabilities discovered. While the Based Space Foundation will have access to allocate the Developer treasury at launch, the community will have ultimate authority over distributions as well as the power to update or remove the multisig.</p>
        </div>
      </div>
      <div class="app-view__container">
        <p class="container-title">Developer Treasury</p>
        <ul class="info-list">
          <li class="info-item">
            <span class="info-title">Balance:</span>
            <span class="info-value">{{ formattedTreasuryBalance }} SPACE</span>
          </li>
          <li class="info-item">
            <span class="info-title">USD Value:</span>
            <span class="info-value">${{ formattedSpaceValue }}</span>
          </li>
          <li class="info-item">
            <span class="info-title">Available to Claim:</span>
            <span class="info-value">{{ formattedCurrentUserReward }} SPACE</span>
          </li>
          <li style="justify-content:flex-end;" class="info-item">
            <a style="font-size:1rem;" class="textlink" href="https://basescan.org/" target="_blank">View on basescan</a>
          </li>
        </ul>
      </div>
      <div class="app-view__container">
        <p class="container-title">Contribute and Get Rewarded</p>
        <p class="container-subtitle">Scout Game [coming soon]</p>
        <p class="container-description">Nounspace is excited to play in the first round of the Scout Game. Beginning October 1st, developers will have the opportunity to earn $SPACE for contributing code to nounspace’s open-source repo.</p>
        <p class="container-subtitle">Fidget SDK [coming soon]</p>
        <p class="container-description">Soon it will be easier than ever to build and deploy Fidgets to users and communities on nounspace. $SPACE will be distributed to free Fidgets based on usage.</p>
        <p class="container-description">
          Have another idea for how to distribute $SPACE to developers that contribute to nounspace?
          <a href="https://app.charmverse.io/nounspace/governance-process-03537464653772093" target="_blank">Make a proposal</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const treasuryBalance = 1000000 // Example value, replace with actual data
const spaceValue = 1000000 // Example value, replace with actual data
const currentUserReward = 5000 // Example value, replace with actual data

const formattedTreasuryBalance = computed(() => {
  return new Intl.NumberFormat().format(treasuryBalance)
})

const formattedSpaceValue = computed(() => {
  return new Intl.NumberFormat().format(spaceValue)
})

const formattedCurrentUserReward = computed(() => {
  return new Intl.NumberFormat().format(currentUserReward)
})
</script>

<style lang="scss" scoped>
.container-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-bottom: 1rem;
}

.container-subtitle {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  line-height: 1.4;
}

.container-description {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
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

.textlink {
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 1px solid currentColor;
  }
}

.app-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-view__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-view__container {
  flex: 1 1 calc(50% - 1rem);
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 20px;
  height: max-content;
}

@media (max-width: 768px) {
  .app-view__container {
    flex: 1 1 100%;
  }
}

.link-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem; /* 16px */
  margin-top: 1rem;
  margin-bottom: 1rem; /* 16px */
  justify-content: space-between;
  overflow-x: auto;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem; /* 8px */
  text-decoration: none;
  color: inherit;
  flex: 0 0 auto;
}

.link-logo {
  width: 50px;
  height: 50px;
}

.link-subtitle {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  text-align: center;
}

.text-bar {
  border-radius: 0.375rem; /* 6px */
  border: 1px solid #eeeeee;
  padding: 1.25rem; /* 20px */
  height: max-content;
}

.text-bar-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
}

.text-bar__subtitle-wrp {
  display: flex;
  align-items: center;
  gap: 1rem; /* 16px */
}

.text-bar__subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-top: 0.75rem; /* 8px */
}

.text-bar-description {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
}

.text-bar__description-wrp {
  margin-top: 1.5rem; /* 24px */
}


.info-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25em 1em;
}

.info-value {
  font-weight: bold;
}
</style>
