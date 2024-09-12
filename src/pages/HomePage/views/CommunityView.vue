<template>
  <div class="community-view">
    <div class="community-view__grid">
      <div class="text-bar">
        <p class="text-bar-title">Community</p>
        <div class="text-bar__subtitle-wrp">
          <p class="text-bar__subtitle">20% of $SPACE emissions are allocated to the nounspace DAO Treasury</p>
        </div>
        <div class="text-bar__description-wrp">
          <p class="text-bar-description">$SPACE holders are empowered to allocate the DAO Treasury via governance. The DAO Treasury has admin power on
            both the $SPACE Distribution contract as well as the User and Developer pools. oSnap, powered by UMA, enables $SPACE holders to execute transactions included in SnapShot proposals
            autonomously. Initially the Based Space Foundation will manage the treasury via a 3/6 multisig, but the
            community has the power to update or remove the multisig at any point via governance.</p>
        </div>
      </div>
      <div class="community-view__container">
        <p class="container-title">Community Treasury</p>
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
            <a style="font-size:1rem;" class="textlink" href="https://basescan.org/address/0xa2654e8df46466b7bffD0CB97FB7dDEAb8D3f015" target="_blank">View on basescan</a>
          </li>
        </ul>
      </div>
      <div class="community-view__container">
        <p class="container-title">Get Involved</p>
        <div class="link-list">
          <a href="https://discord.gg/eYQeXU2WuH" target="_blank" class="link-item">
            <img src="../../../assets/discord.png" alt="Discord Logo" class="link-logo" />
            <span class="link-subtitle">Discord</span>
          </a>
          <a href="https://app.charmverse.io/nounspace/nounspace-dao-8606384041973207" target="_blank" class="link-item">
            <img src="../../../assets/charmverse.png" alt="Charmverse Logo" class="link-logo" />
            <span class="link-subtitle">Discuss</span>
          </a>
          <a href="https://snapshot.org/#/dao.nounspace.eth" target="_blank" class="link-item">
            <img src="../../../assets/snapshot.png" alt="Snapshot Logo" class="link-logo" />
            <span class="link-subtitle">Govern</span>
          </a>
          <a href="https://warpcast.com/~/channel/nounspace" target="_blank" class="link-item">
            <img src="../../../assets/warpcast.png" alt="Socialize Logo" class="link-logo" />
            <span class="link-subtitle">Socialize</span>
          </a>
          <a href="https://nounspace.com/" target="_blank" class="link-item">
            <img src="../../../assets/nounspace.png" alt="Customize Logo" class="link-logo" />
            <span class="link-subtitle">Customize</span>
          </a>
        </div>
        <p class="container-description">
          There may be opportunities to earn $SPACE for contributing to the nounspace ecosystem as a 
          <a href="https://discord.com/invite/5garmexhxM" target="_blank">Community Member</a>, 
          <a href="https://www.google.com">User</a>, or 
          <a href="https://www.google.com">Developer</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { config } from '@/config';
import { BigNumber, utils, Contract } from 'ethers';
import { NETWORK_IDS } from '@/enums';
import ERC20ABI from '@/abi/ERC20.json';
import ERC1967ProxyABI from '@/abi/ERC1967Proxy.json';


// Select the network configuration for Mainnet
const networkConfig = config.networks[NETWORK_IDS.mainnet];
const provider = networkConfig.provider;

// Select Base Network provider
const extendedChainProvider = config.networks[NETWORK_IDS.mainnet].extendedChainProvider

// ERC1967 Proxy contract
const erc1967ProxyAddress = config.ERC1967_PROXY_MAINNET_CONTRACT_ADDRESS;
const erc1967ProxyContract = new Contract(erc1967ProxyAddress, ERC1967ProxyABI, provider);

async function getEthBalance(address: string): Promise<string> {
  try {
    const balance = await provider.getBalance(address);
    console.log(balance);
    return utils.formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

async function getTokenBalance(address: string, tokenAddress: string, tokenDecimals: number): Promise<string> {
  try {
    const tokenContract = new Contract(tokenAddress, ERC20ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    return utils.formatUnits(balance, tokenDecimals);
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
}

async function getBaseTokenBalance(address: string, tokenAddress: string, tokenDecimals: number): Promise<string> {
  try {
    const tokenContract = new Contract(tokenAddress, ERC20ABI, extendedChainProvider);
    const balance = await tokenContract.balanceOf(address);
    return utils.formatUnits(balance, tokenDecimals);
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
}

async function getClaimableSpace(address: string): Promise<string> {
  try {
    const poolId = 1; // Community pool ID
    const reward: BigNumber = await erc1967ProxyContract.getCurrentUserReward(poolId, address);
    return utils.formatUnits(reward, 18);
  } catch (error) {
    console.error('Error fetching claimable SPACE:', error);
    throw error;
  }
}
// SPACE Token Address on BASE Network
const spaceAddress = '0x48C6740BcF807d6C47C864FaEEA15Ed4dA3910Ab';
// Community Treasury Address on Ethereum Mainnet
const treasuryAddress = '0x201295fd6A833259E852E59551724d2d81456c6c';
// Community Treasury Address on BASE Network
const treasuryBaseAddress = '0xa2654e8df46466b7bffD0CB97FB7dDEAb8D3f015';

const treasuryBalance = ref<string | null>(null);
const currentUserReward = ref<string | null>(null);

onMounted(async () => {
  try {
    currentUserReward.value = await getClaimableSpace(treasuryAddress);
    treasuryBalance.value = await getBaseTokenBalance(treasuryBaseAddress, spaceAddress, 18);
  } catch (error) {
    console.error('Error fetching claimable SPACE:', error);
  }
});

const formattedTreasuryBalance = computed(() => {
  return treasuryBalance.value
    ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(treasuryBalance.value))
    : '0.00';
});

const formattedSpaceValue = '-' // Example value, replace with actual data

const formattedCurrentUserReward = computed(() => {
  return currentUserReward.value
    ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(currentUserReward.value))
    : '0.00';
});
</script>

<style lang="scss" scoped>
.container-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-bottom: 1rem;
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

.community-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.community-view__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.community-view__container {
  flex: 1 1 calc(50% - 1rem);
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 20px;
  height: max-content;
}

@media (max-width: 768px) {
  .community-view__container {
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
  font-weight: bold;
}

.info-value {
  font-weight: bold;
}
</style>
