import {
  ETHEREUM_CHAINS,
  ETHEREUM_EXPLORER_URLS,
  ETHEREUM_RPC_URLS,
  LAYER_ZERO_ENDPOINTS,
} from '@/enums'
import type { EthereumType, Provider } from '@/types'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core'
import { providers, utils } from 'ethers'
import { pickBy, mapKeys } from 'lodash'
import { LogLevelDesc } from 'loglevel'
import packageJson from '../package.json'

export enum CONTRACT_IDS {
  erc1967Proxy = 'erc1967Proxy',
  stEth = 'stEth',
  mor = 'mor',
  space = 'space',
  endpoint = 'endpoint',
}

export enum NETWORK_IDS {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

interface Network {
  chainId: ETHEREUM_CHAINS
  chainTitle: string
  provider: Provider
  explorerUrl: ETHEREUM_EXPLORER_URLS
  extendedChainId: ETHEREUM_CHAINS
  extendedChainTitle: string
  extendedChainProvider: Provider
  extendedChainLayerZeroEndpoint: LAYER_ZERO_ENDPOINTS
  contractAddressesMap: Record<CONTRACT_IDS, string>
}

type Metadata = {
  name: string
  description: string
  url: string
  icons: string[]
}

export const config = {
  // General
  NAME: import.meta.env.VITE_APP_NAME,
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
  URL: import.meta.env.VITE_APP_URL,
  GRAPHQL_API_URL: import.meta.env.VITE_APP_GRAPHQL_API_URL,
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_APP_WALLET_CONNECT_PROJECT_ID,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  LOG_LEVEL: 'trace' as LogLevelDesc,
  GITHUB_URL:
    'https://github.com/Nounspace/nounspace.ts#nounspace',
  DOCS_URL: 
    'https://docs.nounspace.com/nounspace-alpha',
  CONTRACT_FAQ_URL:
    'https://github.com/MorpheusAIs/Docs/blob/main/Guides/Morpheus%20Capital%20Providers%20Contract%20Guide.md',
  LANDING_URL: 'https://www.nounspace.com/',
  CODE_CONTRIBUTION_URL:
    'https://github.com/Nounspace/nounspace.ts/blob/canary/docs/CONTRIBUTING.MD',
  HOW_GET_STETH_URL:
    'https://help.lido.fi/en/articles/5232811-how-do-i-get-steth',

  // Testnet
  ERC1967_PROXY_TESTNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_ERC1967_PROXY_TESTNET_CONTRACT_ADDRESS,
  STETH_TESTNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_STETH_TESTNET_CONTRACT_ADDRESS,
  MOR_TESTNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_MOR_TESTNET_CONTRACT_ADDRESS,
  SPACE_TESTNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_SPACE_TESTNET_CONTRACT_ADDRESS,
  ENDPOINT_TESTNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_ENDPOINT_TESTNET_CONTRACT_ADDRESS,

  // Mainnet
  ERC1967_PROXY_MAINNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_ERC1967_PROXY_MAINNET_CONTRACT_ADDRESS,
  STETH_MAINNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_STETH_MAINNET_CONTRACT_ADDRESS,
  MOR_MAINNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_MOR_MAINNET_CONTRACT_ADDRESS,
  SPACE_MAINNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_SPACE_MAINNET_CONTRACT_ADDRESS,
  ENDPOINT_MAINNET_CONTRACT_ADDRESS: import.meta.env
    .VITE_APP_ENDPOINT_MAINNET_CONTRACT_ADDRESS,

  metadata: {} as Metadata,

  networks: {} as Record<NETWORK_IDS, Network>,

  chainsMap: {} as Record<ETHEREUM_CHAINS, EthereumType.Chain>,

  apolloClient: {} as ApolloClient<NormalizedCacheObject>,
}

Object.assign(config, _mapEnvCfg(import.meta.env))
Object.assign(config, _mapEnvCfg(document.ENV))

config.metadata = {
  name: config.NAME,
  description: config.DESCRIPTION,
  url: config.URL,
  icons: [`${config.URL}/branding/logo.svg`],
}

config.networks = {
  [NETWORK_IDS.mainnet]: {
    chainId: ETHEREUM_CHAINS.ethereum,
    chainTitle: 'Ethereum',
    provider: new providers.FallbackProvider(
      [
        'https://eth.llamarpc.com',
        'https://rpc.mevblocker.io',
        'https://eth-pokt.nodies.app',
        'https://eth.drpc.org',
        'https://rpc.payload.de',
        'https://eth.merkle.io',
      ].map((rpcUrl, idx) => ({
        provider: new providers.StaticJsonRpcProvider(rpcUrl),
        priority: idx,
      })),
      1,
    ),
    explorerUrl: ETHEREUM_EXPLORER_URLS.ethereum,
    extendedChainId: ETHEREUM_CHAINS.base,
    extendedChainTitle: 'Base',
    extendedChainProvider: new providers.StaticJsonRpcProvider(
      ETHEREUM_RPC_URLS.base,
    ),
    extendedChainLayerZeroEndpoint: LAYER_ZERO_ENDPOINTS.base,
    contractAddressesMap: {
      [CONTRACT_IDS.erc1967Proxy]:
        config.ERC1967_PROXY_MAINNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.stEth]: config.STETH_MAINNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.space]: config.SPACE_MAINNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.mor]: config.MOR_MAINNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.endpoint]: config.ENDPOINT_MAINNET_CONTRACT_ADDRESS,
    },
  },
  [NETWORK_IDS.testnet]: {
    chainId: ETHEREUM_CHAINS.sepolia,
    chainTitle: 'Ethereum Sepolia',
    provider: new providers.StaticJsonRpcProvider(ETHEREUM_RPC_URLS.sepolia),
    explorerUrl: ETHEREUM_EXPLORER_URLS.sepolia,
    extendedChainId: ETHEREUM_CHAINS.arbitrumSepolia,
    extendedChainTitle: 'Arbitrum Sepolia',
    extendedChainProvider: new providers.StaticJsonRpcProvider(
      ETHEREUM_RPC_URLS.arbitrumSepolia,
    ),
    extendedChainLayerZeroEndpoint: LAYER_ZERO_ENDPOINTS.arbitrumSepolia,
    contractAddressesMap: {
      [CONTRACT_IDS.erc1967Proxy]:
        config.ERC1967_PROXY_TESTNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.stEth]: config.STETH_TESTNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.mor]: config.MOR_TESTNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.space]: config.SPACE_TESTNET_CONTRACT_ADDRESS,
      [CONTRACT_IDS.endpoint]: config.ENDPOINT_TESTNET_CONTRACT_ADDRESS,
    },
  },
}

config.chainsMap = {
  [ETHEREUM_CHAINS.arbitrum]: {
    chainId: utils.hexValue(Number(ETHEREUM_CHAINS.arbitrum)),
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ETHEREUM_RPC_URLS.base],
    blockExplorerUrls: [ETHEREUM_EXPLORER_URLS.base],
  },
  [ETHEREUM_CHAINS.base]: {
    chainId: utils.hexValue(Number(ETHEREUM_CHAINS.base)),
    chainName: 'Base',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ETHEREUM_RPC_URLS.base],
    blockExplorerUrls: [ETHEREUM_EXPLORER_URLS.base],
  },
  [ETHEREUM_CHAINS.arbitrumSepolia]: {
    chainId: utils.hexValue(Number(ETHEREUM_CHAINS.arbitrumSepolia)),
    chainName: 'Arbitrum Sepolia (Testnet)',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ETHEREUM_RPC_URLS.arbitrumSepolia],
    blockExplorerUrls: [ETHEREUM_EXPLORER_URLS.arbitrumSepolia],
  },
  [ETHEREUM_CHAINS.ethereum]: {
    chainId: utils.hexValue(Number(ETHEREUM_CHAINS.ethereum)),
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ETHEREUM_RPC_URLS.ethereum],
    blockExplorerUrls: [ETHEREUM_EXPLORER_URLS.ethereum],
  },
  [ETHEREUM_CHAINS.sepolia]: {
    chainId: utils.hexValue(Number(ETHEREUM_CHAINS.sepolia)),
    chainName: 'Sepolia',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [ETHEREUM_RPC_URLS.sepolia],
    blockExplorerUrls: [ETHEREUM_EXPLORER_URLS.sepolia],
  },
}

config.apolloClient = new ApolloClient({
  link: createHttpLink({ uri: config.GRAPHQL_API_URL }),
  cache: new InMemoryCache(),
})

function _mapEnvCfg(env: ImportMetaEnv | typeof document.ENV): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_APP_')),
    (v, k) => k.replace(/^VITE_APP_/, ''),
  )
}
