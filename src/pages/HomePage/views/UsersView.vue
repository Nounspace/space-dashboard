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
        <button :class="{ active: activeTab === 0 }" @click="activeTab = 0">Season 3</button>
        <button :class="{ active: activeTab === 1 }" @click="activeTab = 1">Season 2</button>
        <button :class="{ active: activeTab === 2 }" @click="activeTab = 2">Season 1</button>
      </div>
      <!-- Center-aligned Leaderboard component based on activeTab -->
      <div class="leaderboard-wrapper">
        <Leaderboard
          v-if="activeTab === 0"
          title="Leaderboard - Season 3"
          :entries="season3Results"
        />
        <Leaderboard
          v-if="activeTab === 1"
          title="Leaderboard - Season 2"
          :entries="season2Results"
        />
        <Leaderboard
          v-if="activeTab === 2"
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
// Core Vue Imports
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

// Store and JSON Imports
import { useWeb3ProvidersStore } from '@/store';
import season1ResultsData from '@/pages/HomePage/components/season1_results.json';
import season2ResultsData from '@/pages/HomePage/components/season2_results.json';
// Component Imports
import TextBar from '../components/TextBar.vue';
import SpaceButton from '../components/SpaceButton.vue';
import MintNogsContainer from '../components/MintNogsContainer.vue';
import Leaderboard from '../components/Leaderboard.vue';
import TipContainer from '../components/TipContainer.vue';
import MintNogsModal from '@/common/modals/compositions/MintNogsModal.vue';
import ClaimSpaceModal from '@/common/modals/compositions/ClaimSpaceModal.vue';
interface User {
  fid: number;
  username: string;
  display_name: string;
  amount_received: number;
  pfp_url: string;
  ethAddress?: string; // Optional if not always present
}

// Update the types for all relevant refs
const leaderboard = ref<User[]>([]);
const adjustedSeason2Results = ref<User[]>([]);
const season1Results = ref<User[]>(season1ResultsData.data || []);
const season2Results = ref<User[]>(season2ResultsData.data || []);

const web3ProvidersStore = useWeb3ProvidersStore();
const totalSpace = ref(0);
const isClaimSpaceModalShown = ref(false);
const isMintNogsModalShown = ref(false);
const activeTab = ref(0); // Controls active tab state
const ethAddress = computed(() => web3ProvidersStore.address || null);
// Computed property to format `totalSpace`
const formattedTotalSpace = computed(() => {
  const formatted = new Intl.NumberFormat().format(totalSpace.value);
  return formatted;
});

function showMintNogsModal() {
  isMintNogsModalShown.value = true;
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
async function fetchSeason1Results(): Promise<Map<string, number>> {
  return new Promise((resolve) => {
    if (!Array.isArray(season1Results.value)) {
      console.error("Season 1 Results is not an array:", season1Results.value);
      resolve(new Map<string, number>());
      return;
    }
    const season1Map = new Map(
      season1Results.value.map((user) => [user.username, user.amount_received])
    );
    resolve(season1Map);
  });
}



const season3Results = ref<{ username: string; display_name: string; amount_received: number; pfp_url: string; }[]>([]);


// lets just fetch season2data and prepare it instead of using a calculating function, lets use the json file 
async function fetchSeason2Results(): Promise<Map<string, number>> {
  return new Promise((resolve) => {
    if (!Array.isArray(season2Results.value)) {
      console.error("Season 2 Results is not an array:", season2Results.value);
      resolve(new Map<string, number>());
      return;
    }
    const season2Map = new Map(
      season2Results.value.map((user) => [user.username, user.amount_received])
    );
    resolve(season2Map);
  });
}

async function fetchTotalSpace(ethAddress: string | null) {
  if (!ethAddress) {
    console.error('No connected ethAddress found, cannot fetch totalSpace.');
    return;
  }
  try {
    const response = await fetch('https://space-tip-allocator-git-main-nounspace.vercel.app/api/allocate');
    const result = await response.json();
    if (result.success && result.data && result.data.allocations) {
      const userAllocation = result.data.allocations.find(
        (alloc: { ethAddress: string; }) => alloc.ethAddress.toLowerCase() === ethAddress.toLowerCase()
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


// Fetch the leaderboard data (current totals)
async function fetchLeaderboard() {
  try {
    const response = await fetch('https://space-tip-allocator-git-main-nounspace.vercel.app/api/leaderboard');
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      leaderboard.value = result.data.map((user: {
        fid: number;
        username: string;
        display_name: string;
        amount_received: number;
        num_received: number;
        pfp_url: string;
      }) => ({
        username: user.username,
        display_name: user.display_name,
        amount_received: user.amount_received,
        pfp_url: user.pfp_url,
      }));
    } else {
      console.error('Failed to fetch leaderboard data:', result.error || result);
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
}

// Calculate Season 3 results: lets get the total value of the leaderboard and then calculate the season 3 results by subtracting the season 2 results from the total value
async function calculateSeason3results() {
  const season1Map = await fetchSeason1Results();
  const season2Map = await fetchSeason2Results();
  const leaderboardMap = new Map(
    leaderboard.value.map((user) => [user.username, user.amount_received])
  );
  const season3Map = new Map<string, number>();
  leaderboardMap.forEach((total, username) => {
    const season1Total = season1Map.get(username) || 0;
    const season2Total = season2Map.get(username) || 0;
    const season3Total = total - season1Total - season2Total;
    season3Map.set(username, season3Total);
  });
  season3Results.value = leaderboard.value.map((user) => ({
    username: user.username,
    display_name: user.display_name,
    amount_received: season3Map.get(user.username) || 0,
    pfp_url: user.pfp_url,
  }));

  // filter users with 0 amount received
  season3Results.value = season3Results.value.filter((user) => user.amount_received > 0);
}



// Fetch leaderboard and compute results for all seasons
async function fetchData() {
  await fetchLeaderboard(); // Fetch current totals
  await fetchSeason2Results(); // Calculate Season 2 results
  await calculateSeason3results(); // Derive Season 3 results
}

// On mount, fetch and calculate leaderboard data
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