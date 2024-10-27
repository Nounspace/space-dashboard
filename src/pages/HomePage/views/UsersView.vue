<template>
  <div class="app-view">
    <div class="app-view__grid">
      <!-- TextBar component -->
      <TextBar />

      <!-- Button Section -->
      <div class="button-container">
        <SpaceButton
          title="Check or Claim $SPACE Drop 0"
          buttonClass="space-drop-button"
          @click="isClaimSpaceModalShown = true"
        />
        <SpaceButton
          title="Mint nOGs"
          buttonClass="mint-nogs-button"
          @click="isMintNogsModalShown = true"
        />
      </div>

      <!-- Container for MintNogsContainer and TipContainer -->
      <div class="container-flex side-by-side">
        <MintNogsContainer />
        <TipContainer :totalSpace="formattedTotalSpace" />
      </div>

      <!-- Inline Tab Buttons to select leaderboard season -->
      <div class="tabs-container">
        <button :class="{ active: activeTab === 0 }" @click="activeTab = 0">Season 2</button>
        <button :class="{ active: activeTab === 1 }" @click="activeTab = 1">Season 1</button>
      </div>

      <!-- Center-aligned Leaderboard component based on activeTab -->
      <div class="leaderboard-wrapper">
        <Leaderboard
          v-if="activeTab === 0"
          title="Leaderboard - Season 2"
          :entries="adjustedSeason2Results"
        />
        <Leaderboard
          v-if="activeTab === 1"
          title="Leaderboard - Season 1"
          :entries="season1Results"
        />
      </div>
    </div>

    <ClaimSpaceModal v-model:is-shown="isClaimSpaceModalShown" />
    <MintNogsModal v-model:is-shown="isMintNogsModalShown" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useWeb3ProvidersStore } from '@/store';
import MintNogsModal from '@/common/modals/compositions/MintNogsModal.vue';
import ClaimSpaceModal from '@/common/modals/compositions/ClaimSpaceModal.vue';
import season1ResultsData from '@/pages/HomePage/components/season1_results.json';

// Components
import TextBar from '../components/TextBar.vue';
import SpaceButton from '../components/SpaceButton.vue';
import MintNogsContainer from '../components/MintNogsContainer.vue';
import Leaderboard from '../components/Leaderboard.vue';
import TipContainer from '../components/TipContainer.vue';

const web3ProvidersStore = useWeb3ProvidersStore();
const totalSpace = ref(0);
const isClaimSpaceModalShown = ref(false);
const isMintNogsModalShown = ref(false);
const leaderboard = ref([]);
const adjustedSeason2Results = ref([]);
const activeTab = ref(0); // Controls active tab state
const season1Results = ref(season1ResultsData.data);
const ethAddress = computed(() => web3ProvidersStore.address || null);

function showMintNogsModal() {
  isMintNogsModalShown.value = true;
  console.log("MintNogsModal shown:", isMintNogsModalShown.value);
}

watch(() => web3ProvidersStore.isConnected, (isConnected) => {
  if (isConnected) {
    fetchTotalSpace(ethAddress.value);
  } else {
    totalSpace.value = 0;
  }
});

watch(ethAddress, (newAddress) => {
  if (newAddress) {
    fetchTotalSpace(newAddress);
  }
});

// Fetch Season 1 results from JSON
async function fetchSeason1Results() {
  return new Promise((resolve) => {
    if (!Array.isArray(season1Results.value)) {
      console.error("Season 1 Results is not an array:", season1Results.value);
      resolve(new Map());
      return;
    }
    const season1Map = new Map(
      season1Results.value.map((user) => [user.username, user.amount_received])
    );
    resolve(season1Map);
  });
}

// Fetch Season 2 leaderboard from API
async function fetchLeaderboard() {
  try {
    const response = await fetch('https://space-tip-allocator-git-main-nounspace.vercel.app/api/leaderboard');
    const result = await response.json();
    if (result.success && result.data) {
      leaderboard.value = result.data.map(user => ({
        username: user.username,
        display_name: user.display_name,
        amount_received: user.amount_received,
        pfp_url: user.pfp_url,
      }));
    } else {
      console.error('Failed to fetch leaderboard data:', result);
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
}

// Calculate adjusted Season 2 results based on Season 1 data and sort by amount_received
async function calculateAdjustedSeason2Results() {
  const season1Map = await fetchSeason1Results();
  adjustedSeason2Results.value = leaderboard.value
    .map(user => {
      const season1Amount = season1Map.get(user.username) || 0;
      const adjustedAmount = user.amount_received - season1Amount;
      return {
        ...user,
        amount_received: adjustedAmount,
      };
    })
    .sort((a, b) => b.amount_received - a.amount_received); // Sort by highest amount_received
}

// Fetch leaderboard and calculate adjusted results
async function fetchData() {
  await fetchLeaderboard();
  await calculateAdjustedSeason2Results();
}

async function fetchTotalSpace(ethAddress) {
  if (!ethAddress) {
    console.error('No connected ethAddress found, cannot fetch totalSpace.');
    return;
  }

  try {
    const response = await fetch('https://space-tip-allocator-git-main-nounspace.vercel.app/api/allocate');
    const result = await response.json();
    if (result.success && result.data && result.data.allocations) {
      const userAllocation = result.data.allocations.find(
        (alloc) => alloc.ethAddress.toLowerCase() === ethAddress.toLowerCase()
      );
      totalSpace.value = userAllocation ? userAllocation.allocation : 0;
    } else {
      console.error('Unexpected response structure:', result);
      totalSpace.value = 0;
    }
  } catch (error) {
    console.error('Error fetching totalSpace:', error);
    totalSpace.value = 0;
  }
}

const formattedTotalSpace = computed(() => new Intl.NumberFormat().format(totalSpace.value));

onMounted(() => {
  fetchData();
  if (web3ProvidersStore.isConnected && ethAddress.value) {
    fetchTotalSpace(ethAddress.value);
  }
});

onBeforeUnmount(() => {
  totalSpace.value = 0;
});
</script>

<style lang="scss" scoped>
/* Main layout */
.app-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-view__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Button container styling */
.button-container {
  display: flex;
  gap: 1rem;
}

.space-drop-button,
.mint-nogs-button {
  flex: 1;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
}

.space-drop-button {
  background-color: #00ff00;
}

.space-drop-button:hover {
  background-color: #00cc00;
}

.mint-nogs-button {
  background-color: #FF5A1F;
}

.mint-nogs-button:hover {
  background-color: #e04e1a;
}

/* Tabs container styling */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs-container button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #eeeeee;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tabs-container button.active {
  background-color: #00cc00;
  color: white;
  border-bottom: 3px solid #007b00;
}

.tabs-container button:not(.active):hover {
  background-color: #cccccc;
}

/* Leaderboard styling */
.leaderboard-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2px;
}

/* Modal styling */
.mint-nogs-modal,
.claim-space-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }
}
</style>
