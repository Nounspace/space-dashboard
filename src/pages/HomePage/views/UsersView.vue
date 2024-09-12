<template>
  <div class="app-view">
    <div class="app-view__grid">
      <div class="text-bar">
        <p class="text-bar-title">Users</p>
        <div class="text-bar__subtitle-wrp">
          <p class="text-bar__subtitle">20% of $SPACE emissions are allocated to nounspace users</p>
        </div>
        <div class="text-bar__description-wrp">
          <p class="container-description">📢 $SPACE Drop 0 claims open at 1:11pm UTC on September 12! Check your eligibility and claim from the
            Fidget below.</p>
          <p class="container-description">$SPACE Tips launch on September 19th. mint nOGs and hold at least 11,111
            $SPACE to activate your tip allowance.</p>
          <p class="container-description">
            More ways to earn $SPACE are coming soon! Have an idea for distributing $SPACE to nounspace users?
            <a href="https://app.charmverse.io/nounspace/governance-process-03537464653772093" target="_blank">Make a
              proposal</a>
          </p>
        </div>
      </div>
      <button class="app-view__container space-drop-button" @click="isClaimSpaceModalShown = true">
        <p class="container-title">Check or Claim $SPACE Drop 0</p>
      </button>
      <button class="app-view__container mint-nogs-button" @click="isMintNogsModalShown = true">
        <p class="container-title">Mint nOGs to Activate $SPACE Tips</p>
      </button>
      <div class="app-view__container mint-nogs-container">
        <p class="container-title mint-nogs-container-text">Mint nOGs, get rewarded.</p>
        <ul class="mint-nogs-list">
          <li class="mint-nogs-container-text">Earn $SPACE</li>
          <li class="mint-nogs-container-text">Activate $SPACE tip allowance</li>
          <li class="mint-nogs-container-text">Access to new features early</li>
          <li class="mint-nogs-container-text">Enjoy premium access for life</li>
        </ul>
      </div>
      <div class="app-view__container">
        <div class="tip-container">
          <p class="tip-container-title">Daily tip allowance:</p>
          <p class="tip-container-value">{{ formattedDailyTipAllowance }}</p>
        </div>
        <p class="container-subtitle">hold 1 nOGs NFT & 11,111 $SPACE to receive a tip allowance</p>
        <div class="tip-container">
          <p class="tip-container-title">$SPACE tips earned:</p>
          <p class="tip-container-value">{{ formattedSpaceTipsEarned }}</p>
        </div>
        <p class="container-subtitle">season 1 begins September 19th</p>
      </div>
    </div>
    <claim-space-modal v-model:is-shown="isClaimSpaceModalShown" />
    <mint-nogs-modal v-model:is-shown="isMintNogsModalShown" />
  </div>
</template>

<script lang="ts" setup>
import {
  ClaimSpaceModal,
  MintNogsModal,
} from '@/common'
import { ref, computed } from 'vue'
const isClaimSpaceModalShown = ref(false)
const isMintNogsModalShown = ref(false)

const dailyTipAllowance = null
const spaceTipsEarned = null

const formattedDailyTipAllowance = computed(() => {
  return new Intl.NumberFormat().format(dailyTipAllowance)
})

const formattedSpaceTipsEarned = computed(() => {
  return new Intl.NumberFormat().format(spaceTipsEarned)
})

</script>

<style lang="scss" scoped>
.container-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-bottom: 1rem;
}

.tip-container-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
}

.tip-container-value {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  margin-left: auto; /* Push the value to the right */
}

.tip-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container-subtitle {
  font-size: .75rem;
  line-height: 1.4;
  margin-bottom: 1.75rem;
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

.space-drop-button {
  background-color: #00ff00;
  border: none;
  cursor: pointer;
  text-align: center;
}

.space-drop-button .container-title {
  margin: 0;
  text-align: center;
  font-size: 1.25rem;
}

.space-drop-button:hover {
  background-color: #00cc00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mint-nogs-button {
  background-color: #FF5A1F;
  border: none;
  cursor: pointer;
  text-align: center;
}

.mint-nogs-button .container-title {
  margin: 0;
  text-align: center;
  font-size: 1.25rem;
}

.mint-nogs-button:hover {
  background-color: #e04e1a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mint-nogs-container {
  background-image: url('@/assets/mint_nogs.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.mint-nogs-container-text {
  color: white;
}

.mint-nogs-list {
  padding-left: 1.5rem;
}

.mint-nogs-list li {
  list-style-type: disc;
  padding: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .app-view__container {
    flex: 1 1 100%;
  }
}

.text-bar {
  border-radius: 0.375rem;
  border: 1px solid #eeeeee;
  padding: 1.25rem;
  height: max-content;
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
</style>
