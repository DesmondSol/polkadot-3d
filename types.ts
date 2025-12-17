
export enum NodeType {
  RELAY_CHAIN = 'RELAY_CHAIN',
  PARACHAIN = 'PARACHAIN',
  DAPP = 'DAPP',
  BRIDGE = 'BRIDGE'
}

export interface NodeData {
  id: string;
  type: NodeType;
  name: string;
  category?: string;
  description: string;
  technicalDetails?: string; // For advanced mode
  parentId?: string; // For dApps linking to Parachains
  color?: string;
  position?: [number, number, number]; // Calculated at runtime or fixed
  bridgesTo?: string[]; // Names of external chains
  
  // Advanced Metrics
  tokenTicker?: string;
  marketCap?: string;
  tps?: string;
  blockTime?: string;
}

export type ViewMode = 'beginner' | 'advanced';

export interface EcosystemState {
  selectedId: string | null;
  hoveredId: string | null;
  viewMode: ViewMode;
  showLayer0: boolean;
  showLayer1: boolean;
  showLayer2: boolean;
  isTourActive: boolean;
  tourStep: number;
}
