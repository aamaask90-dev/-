export interface SlideContent {
  id: number;
  numberStr: string; // e.g., "01", "02"
  title: string;
  subtitle?: string;
  pillar: string; // One of the 10 academic pillars
  pillarNumber: number; // 1 to 10
  keyPoints: string[];
  notes?: string;
  badge?: string;
  formula?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  metrics?: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  diagramType?: 'city-graph' | 'heuristic-triangle' | 'queue-flow' | 'complexity-table' | 'benchmark-chart' | 'steps-flow' | 'dijkstra-vs-astar' | 'none';
}

export interface GraphNode {
  id: string;
  label: string;
  labelAr: string;
  x: number;
  y: number;
  type?: 'residential' | 'commercial' | 'industrial' | 'highway' | 'landmark';
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number; // distance / travel time in minutes or km
  roadName?: string;
  isHighway?: boolean;
}

export interface SimulationStep {
  stepNumber: number;
  phase: 'init' | 'exploring' | 'expanding' | 'goal_reached' | 'path_reconstructed';
  titleAr: string;
  currentNodeId: string | null;
  openSet: { id: string; g: number; h?: number; f?: number }[];
  closedSet: string[];
  distances: Record<string, number>;
  previous: Record<string, string | null>;
  activeNeighbors: { id: string; cost: number; updated: boolean }[];
  highlightedPath: string[];
  explanationAr: string;
}

export interface AlgorithmMetrics {
  path: string[];
  cost: number;
  visitedCount: number;
  nodeExpansions: number;
  edgeRelaxations: number;
  pqOperations: number;
  maxQueueSize: number;
  executionTimeMs: number;
  memoryFootprintKb: number;
}

export interface ScenarioResult {
  scenarioNameAr: string;
  scenarioNameEn: string;
  scenarioType: 'best' | 'average' | 'worst';
  descriptionAr: string;
  nodesCount: number;
  edgesCount: number;
  dijkstra: AlgorithmMetrics;
  astar: AlgorithmMetrics;
  optimalityRatio: number; // e.g. 1.0 (100% match)
}

export interface BenchmarkResult {
  nodeCount: number;
  edgeCount: number;
  dijkstraTimeMs: number;
  astarTimeMs: number;
  dijkstraVisited: number;
  astarVisited: number;
  dijkstraOperations: number;
  astarOperations: number;
  dijkstraCost: number;
  astarCost: number;
  dijkstraMemoryKb: number;
  astarMemoryKb: number;
  pathLength: number;
  optimalityMatch: boolean;
}
