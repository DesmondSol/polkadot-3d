import { NodeData, NodeType } from './types';

export const POLKADOT_PINK = '#E6007A';
export const POLKADOT_PURPLE = '#570081';
export const ACCENT_CYAN = '#00F0FF';
export const TEXT_HIGHLIGHT = '#FF4081';

export const ECOSYSTEM_DATA: NodeData[] = [
  // Layer 0: Relay Chain
  {
    id: 'relay-chain',
    type: NodeType.RELAY_CHAIN,
    name: 'Polkadot Relay Chain',
    category: 'Layer 0',
    description: 'The heart of Polkadot. It provides shared security, consensus, and interoperability for all connected blockchains (Parachains). It does not handle smart contracts directly, ensuring it remains lightweight and efficient.',
    technicalDetails: 'Uses NPoS (Nominated Proof-of-Stake) for consensus. Validators secure the network. Collators on parachains submit blocks to validators. It coordinates cross-chain message passing (XCM).',
    color: POLKADOT_PINK,
  },
  // Layer 1: Parachains
  {
    id: 'moonbeam',
    type: NodeType.PARACHAIN,
    name: 'Moonbeam',
    category: 'Smart Contract / EVM',
    description: 'An Ethereum-compatible smart contract platform. It allows developers to deploy existing Solidity smart contracts to Polkadot with minimal changes.',
    technicalDetails: 'Full EVM implementation, Web3 RPC compatible. Supports standard Ethereum tools like MetaMask, Hardhat, and Waffle.',
    color: '#D43384',
    bridgesTo: ['Ethereum'],
  },
  {
    id: 'acala',
    type: NodeType.PARACHAIN,
    name: 'Acala',
    category: 'DeFi Hub',
    description: 'The decentralized finance hub of Polkadot. It offers a stablecoin (aUSD), a decentralized exchange (DEX), and liquid staking protocols.',
    technicalDetails: 'Specialized DeFi chain with custom EVM+ for DeFi optimization. Built-in primitives for liquidity and staking.',
    color: '#645AFF',
  },
  {
    id: 'astar',
    type: NodeType.PARACHAIN,
    name: 'Astar',
    category: 'Multi-VM / dApp Hub',
    description: 'A scalable network supporting multiple virtual machines, including EVM and WebAssembly (Wasm). A true innovation hub for dApps.',
    technicalDetails: 'Supports dApp staking (Build2Earn). Connects Polkadot to major L1 blockchains via bridges.',
    color: '#1b6dc1',
  },
  {
    id: 'hydradx',
    type: NodeType.PARACHAIN,
    name: 'HydraDX',
    category: 'Liquidity',
    description: 'A decentralized exchange protocol designed to bring liquidity to the Polkadot ecosystem using an Omnipool model.',
    technicalDetails: 'Substrate-based. Omnipool allows all assets to be traded against a single liquidity pool, reducing slippage and fragmentation.',
    color: '#55efc4',
  },
  {
    id: 'polimec',
    type: NodeType.PARACHAIN,
    name: 'Polimec',
    category: 'Funding',
    description: 'A decentralized community-driven funding protocol to accelerate the Web3 ecosystem.',
    technicalDetails: 'Compliance framework for fundraising. On-chain credentials.',
    color: '#fdcb6e',
  },
  // Layer 2: dApps (Children of Parachains)
  // Moonbeam dApps
  {
    id: 'stellaswap',
    type: NodeType.DAPP,
    name: 'StellaSwap',
    parentId: 'moonbeam',
    category: 'DEX',
    description: 'The leading DEX on Moonbeam, offering swapping, farming, and bridging features.',
    technicalDetails: 'Standard AMM model running on Moonbeam EVM.',
  },
  {
    id: 'moonwell',
    type: NodeType.DAPP,
    name: 'Moonwell',
    parentId: 'moonbeam',
    category: 'Lending',
    description: 'An open lending and borrowing DeFi protocol on Moonbeam and Moonriver.',
    technicalDetails: 'Compound V2 fork adapted for the Polkadot ecosystem.',
  },
  // Acala dApps
  {
    id: 'ausd',
    type: NodeType.DAPP,
    name: 'aUSD Protocol',
    parentId: 'acala',
    category: 'Stablecoin',
    description: 'The native decentralized stablecoin of Polkadot, backed by multiple collateral assets.',
    technicalDetails: 'Over-collateralized stablecoin system integral to the Acala chain.',
  },
  {
    id: 'euphrates',
    type: NodeType.DAPP,
    name: 'Euphrates',
    parentId: 'acala',
    category: 'Liquid Staking',
    description: 'Boosts staking rewards and liquidity for DOT holders.',
    technicalDetails: 'Liquid staking derivatives (LSD) protocol.',
  },
  // Astar dApps
  {
    id: 'arthswap',
    type: NodeType.DAPP,
    name: 'ArthSwap',
    parentId: 'astar',
    category: 'DEX',
    description: 'A one-stop DeFi protocol on Astar Network with high APY farming.',
    technicalDetails: 'Comprehensive DeFi suite optimized for Wasm/EVM.',
  }
];

export const TOUR_STEPS = [
  {
    title: "Welcome to Polkadot",
    content: "Polkadot is a network of networks. It connects specialized blockchains together into a unified, scalable, and secure ecosystem. Let's explore its architecture.",
    targetId: 'relay-chain', // Focus camera here roughly
    layerFocus: 'all'
  },
  {
    title: "Layer 0: The Relay Chain",
    content: "At the center is the Relay Chain. It doesn't run complex smart contracts. Instead, it provides security and coordinates communication for the entire network. Think of it as the airport hub.",
    targetId: 'relay-chain',
    layerFocus: 'layer0'
  },
  {
    title: "Layer 1: Parachains",
    content: "Orbiting the core are Parachains. These are independent blockchains optimized for specific use cases like DeFi, Gaming, or Identity. They 'plug in' to the Relay Chain for shared security.",
    targetId: 'moonbeam',
    layerFocus: 'layer1'
  },
  {
    title: "Layer 2: Applications",
    content: "Built on top of Parachains are dApps (Decentralized Applications). This is where users interact—swapping tokens, playing games, or managing identity.",
    targetId: 'stellaswap',
    layerFocus: 'layer2'
  }
];