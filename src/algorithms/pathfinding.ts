import { GraphNode, GraphEdge, SimulationStep, BenchmarkResult, AlgorithmMetrics, ScenarioResult } from '../types';
import { 
  euclideanDistance, 
  generateBenchmarkGraph,
  BEST_CASE_NODES,
  BEST_CASE_EDGES,
  AVERAGE_CASE_GRAPH,
  WORST_CASE_NODES,
  WORST_CASE_EDGES
} from '../data/sampleGraphs';

// Standard Binary Min-Heap Priority Queue
export class MinHeap<T> {
  private heap: { item: T; priority: number }[] = [];

  push(item: T, priority: number) {
    this.heap.push({ item, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): { item: T; priority: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  getItems(): { item: T; priority: number }[] {
    return [...this.heap];
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[index].priority < this.heap[parentIdx].priority) {
        const temp = this.heap[index];
        this.heap[index] = this.heap[parentIdx];
        this.heap[parentIdx] = temp;
        index = parentIdx;
      } else {
        break;
      }
    }
  }

  private bubbleDown(index: number) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      if (rightChild < length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        const temp = this.heap[index];
        this.heap[index] = this.heap[smallest];
        this.heap[smallest] = temp;
        index = smallest;
      } else {
        break;
      }
    }
  }
}

// Build adjacency lookup map from edge list
export function buildAdjacencyList(edges: GraphEdge[]): Map<string, { to: string; weight: number; roadName?: string }[]> {
  const adj = new Map<string, { to: string; weight: number; roadName?: string }[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    if (!adj.has(e.to)) adj.set(e.to, []);
    adj.get(e.from)!.push({ to: e.to, weight: e.weight, roadName: e.roadName });
    adj.get(e.to)!.push({ to: e.from, weight: e.weight, roadName: e.roadName }); // Bidirectional roads
  }
  return adj;
}

// Fast Dijkstra Implementation for Benchmarking & Analysis
export function solveDijkstra(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  targetId: string
): AlgorithmMetrics {
  const t0 = performance.now();
  const adj = buildAdjacencyList(edges);
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const visited = new Set<string>();

  for (const n of nodes) {
    dist[n.id] = Infinity;
    parent[n.id] = null;
  }
  dist[startId] = 0;

  const pq = new MinHeap<string>();
  pq.push(startId, 0);
  let pqOperations = 1; // 1 push
  let nodeExpansions = 0;
  let edgeRelaxations = 0;
  let maxQueueSize = 1;
  let targetFound = false;

  while (!pq.isEmpty()) {
    maxQueueSize = Math.max(maxQueueSize, pq.size());
    const top = pq.pop()!;
    pqOperations++; // 1 pop
    const u = top.item;
    const currentDist = top.priority;

    if (visited.has(u)) continue;
    visited.add(u);
    nodeExpansions++;

    if (u === targetId) {
      targetFound = true;
      break;
    }

    const neighbors = adj.get(u) || [];
    for (const edge of neighbors) {
      const v = edge.to;
      if (visited.has(v)) continue;
      const newDist = currentDist + edge.weight;
      if (newDist < dist[v]) {
        edgeRelaxations++;
        dist[v] = newDist;
        parent[v] = u;
        pq.push(v, newDist);
        pqOperations++;
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  if (targetFound || dist[targetId] !== Infinity) {
    let curr: string | null = targetId;
    while (curr !== null) {
      path.unshift(curr);
      curr = parent[curr];
    }
  }

  const t1 = performance.now();
  const executionTimeMs = Math.max(0.005, Math.round((t1 - t0) * 1000) / 1000);
  // Memory Footprint: visited set (~120 B/node) + heap nodes (~96 B) + graph edges (~48 B)
  const memoryFootprintKb = Math.round((visited.size * 120 + maxQueueSize * 96 + edges.length * 48) / 1024 * 10) / 10;

  return {
    path,
    cost: dist[targetId] === Infinity ? 0 : Math.round(dist[targetId] * 10) / 10,
    visitedCount: visited.size,
    nodeExpansions,
    edgeRelaxations,
    pqOperations,
    maxQueueSize,
    executionTimeMs,
    memoryFootprintKb
  };
}

// Fast A* Implementation for Benchmarking & Analysis
export function solveAStar(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  targetId: string
): AlgorithmMetrics {
  const t0 = performance.now();
  const nodeMap = new Map<string, GraphNode>(nodes.map(n => [n.id, n]));
  const targetNode = nodeMap.get(targetId);
  const adj = buildAdjacencyList(edges);

  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const closedSet = new Set<string>();

  for (const n of nodes) {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
    parent[n.id] = null;
  }

  gScore[startId] = 0;
  const startNode = nodeMap.get(startId);
  const initialH = (startNode && targetNode) ? euclideanDistance(startNode, targetNode) : 0;
  fScore[startId] = initialH;

  const openSet = new MinHeap<string>();
  openSet.push(startId, fScore[startId]);
  let pqOperations = 1; // 1 push
  let nodeExpansions = 0;
  let edgeRelaxations = 0;
  let maxQueueSize = 1;
  let targetFound = false;

  while (!openSet.isEmpty()) {
    maxQueueSize = Math.max(maxQueueSize, openSet.size());
    const top = openSet.pop()!;
    pqOperations++; // 1 pop
    const u = top.item;

    if (closedSet.has(u)) continue;
    closedSet.add(u);
    nodeExpansions++;

    if (u === targetId) {
      targetFound = true;
      break;
    }

    const neighbors = adj.get(u) || [];
    for (const edge of neighbors) {
      const v = edge.to;
      if (closedSet.has(v)) continue;

      const tentativeG = gScore[u] + edge.weight;
      if (tentativeG < gScore[v]) {
        edgeRelaxations++;
        parent[v] = u;
        gScore[v] = tentativeG;
        const vNode = nodeMap.get(v);
        const h = (vNode && targetNode) ? euclideanDistance(vNode, targetNode) : 0;
        const f = tentativeG + h;
        fScore[v] = f;
        openSet.push(v, f);
        pqOperations++;
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  if (targetFound || gScore[targetId] !== Infinity) {
    let curr: string | null = targetId;
    while (curr !== null) {
      path.unshift(curr);
      curr = parent[curr];
    }
  }

  const t1 = performance.now();
  const executionTimeMs = Math.max(0.005, Math.round((t1 - t0) * 1000) / 1000);
  const memoryFootprintKb = Math.round((closedSet.size * 120 + maxQueueSize * 96 + edges.length * 48) / 1024 * 10) / 10;

  return {
    path,
    cost: gScore[targetId] === Infinity ? 0 : Math.round(gScore[targetId] * 10) / 10,
    visitedCount: closedSet.size,
    nodeExpansions,
    edgeRelaxations,
    pqOperations,
    maxQueueSize,
    executionTimeMs,
    memoryFootprintKb
  };
}

// Evaluate Best, Average, and Worst Case Scenarios
export function evaluateScenario(type: 'best' | 'average' | 'worst'): ScenarioResult {
  let nodes: GraphNode[];
  let edges: GraphEdge[];
  let startId: string;
  let targetId: string;
  let scenarioNameAr: string;
  let scenarioNameEn: string;
  let descriptionAr: string;

  if (type === 'best') {
    nodes = BEST_CASE_NODES;
    edges = BEST_CASE_EDGES;
    startId = 'b_start';
    targetId = 'b_target';
    scenarioNameAr = 'الحالة الفضلى (Best-Case Scenario)';
    scenarioNameEn = 'Best Case (Direct Corridor & Close Goal)';
    descriptionAr = 'مسار مستقيم شبه مباشر نحو الهدف، قلة التفرعات، وتوجيه فوري من دالة الـ Heuristic مع إيقاف مبكر لديكسترا بمجرد الوصول للهدف.';
  } else if (type === 'worst') {
    nodes = WORST_CASE_NODES;
    edges = WORST_CASE_EDGES;
    startId = 'w_start';
    targetId = 'w_target';
    scenarioNameAr = 'الحالة الأسوأ (Worst-Case Scenario)';
    scenarioNameEn = 'Worst Case (Deceptive Trap & Detour Barrier)';
    descriptionAr = 'حاجز مسدود مضلل هندسياً يجذب دالة التقدير إلى شارع مسدود، ومجموعة تفرعات جنوبية متقاربة التكلفة تشتت طابور أولوية ديكسترا قبل الالتفاف للشمال.';
  } else {
    nodes = AVERAGE_CASE_GRAPH.nodes;
    edges = AVERAGE_CASE_GRAPH.edges;
    startId = AVERAGE_CASE_GRAPH.startId;
    targetId = AVERAGE_CASE_GRAPH.targetId;
    scenarioNameAr = 'الحالة المتوسطة / النمطية (Average Case)';
    scenarioNameEn = 'Average / Typical Case (Urban Knowledge City)';
    descriptionAr = 'شبكة طرق حضرية حقيقية متعددة المسارات البديلة والتقاطعات، لا تحتوي على تسهيل مصطنع ولا خداع هندسي حاد.';
  }

  const dijkstra = solveDijkstra(nodes, edges, startId, targetId);
  const astar = solveAStar(nodes, edges, startId, targetId);
  const optimalityRatio = (dijkstra.cost > 0 && astar.cost > 0) 
    ? Math.round((dijkstra.cost / astar.cost) * 100) / 100 
    : 1.0;

  return {
    scenarioNameAr,
    scenarioNameEn,
    scenarioType: type,
    descriptionAr,
    nodesCount: nodes.length,
    edgesCount: edges.length,
    dijkstra,
    astar,
    optimalityRatio
  };
}

export function evaluateAllScenarios(): ScenarioResult[] {
  return [
    evaluateScenario('best'),
    evaluateScenario('average'),
    evaluateScenario('worst')
  ];
}

// Generate Detailed Step-by-Step Simulation States for Visualization
export function generateSimulationTrace(
  algorithm: 'dijkstra' | 'astar',
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  targetId: string
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const nodeMap = new Map<string, GraphNode>(nodes.map(n => [n.id, n]));
  const targetNode = nodeMap.get(targetId);
  const adj = buildAdjacencyList(edges);

  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  const closedSet = new Set<string>();

  for (const n of nodes) {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
    parent[n.id] = null;
  }

  gScore[startId] = 0;
  const startH = (nodeMap.get(startId) && targetNode) ? Math.round(euclideanDistance(nodeMap.get(startId)!, targetNode)) : 0;
  fScore[startId] = algorithm === 'astar' ? startH : 0;

  const pq = new MinHeap<string>();
  pq.push(startId, fScore[startId]);

  // Step 1: Initial state
  steps.push({
    stepNumber: 1,
    phase: 'init',
    titleAr: 'المرحلة 1: تهيئة نقطة الانطلاق وطابور الأولوية (Initialization)',
    currentNodeId: startId,
    openSet: [{ id: startId, g: 0, h: startH, f: fScore[startId] }],
    closedSet: [],
    distances: { ...gScore },
    previous: { ...parent },
    activeNeighbors: [],
    highlightedPath: [startId],
    explanationAr: `تم وضع نقطة الانطلاق (${nodeMap.get(startId)?.labelAr || startId}) في طابور الأولوية بتكلفة g=0. ${
      algorithm === 'astar' ? `تم حساب المسافة التقديرية للهدف h=${startH} ليصبح f=${fScore[startId]}.` : 'ديكسترا تبدأ بالبحث الأعمى بحساب المسافة الصفرية.'
    }`
  });

  let stepCounter = 2;
  let targetFound = false;

  while (!pq.isEmpty()) {
    const top = pq.pop()!;
    const u = top.item;

    if (closedSet.has(u)) continue;
    closedSet.add(u);

    const uNode = nodeMap.get(u);
    const neighbors = adj.get(u) || [];
    const activeNeighborsList: { id: string; cost: number; updated: boolean }[] = [];

    // Phase determination
    let phase: SimulationStep['phase'] = 'exploring';
    if (u === targetId) {
      phase = 'goal_reached';
      targetFound = true;
    } else if (closedSet.size > 2) {
      phase = 'expanding';
    }

    if (u === targetId) {
      // Reconstruct path
      const finalPath: string[] = [];
      let curr: string | null = targetId;
      while (curr !== null) {
        finalPath.unshift(curr);
        curr = parent[curr];
      }

      steps.push({
        stepNumber: stepCounter++,
        phase: 'goal_reached',
        titleAr: 'المرحلة 4: الوصول إلى نقطة الوجهة المستهدفة (Target Reached)',
        currentNodeId: u,
        openSet: pq.getItems().map(item => ({
          id: item.item,
          g: gScore[item.item],
          h: targetNode ? Math.round(euclideanDistance(nodeMap.get(item.item)!, targetNode)) : 0,
          f: item.priority
        })),
        closedSet: Array.from(closedSet),
        distances: { ...gScore },
        previous: { ...parent },
        activeNeighbors: [],
        highlightedPath: finalPath,
        explanationAr: `نجحت الخوارزمية في الوصول إلى نقطة الوجهة (${uNode?.labelAr || u}) بأدنى تكلفة مؤكدة تساوي ${Math.round(gScore[u] * 10) / 10}.`
      });

      // Step 5: Path reconstructed
      steps.push({
        stepNumber: stepCounter++,
        phase: 'path_reconstructed',
        titleAr: 'المرحلة 5: استرجاع وإبراز المسار النهائي الأقصر (Final Path)',
        currentNodeId: null,
        openSet: [],
        closedSet: Array.from(closedSet),
        distances: { ...gScore },
        previous: { ...parent },
        activeNeighbors: [],
        highlightedPath: finalPath,
        explanationAr: `المسار الأمثل المكتمل: يتكون من ${finalPath.length} تقاطعات بإجمالي تكلفة ${Math.round(gScore[targetId] * 10) / 10}. تم فحص ${closedSet.size} عقدة فقط أثناء العملية.`
      });
      break;
    }

    // Inspect neighbors
    for (const edge of neighbors) {
      const v = edge.to;
      if (closedSet.has(v)) continue;

      const tentativeG = gScore[u] + edge.weight;
      if (tentativeG < gScore[v]) {
        parent[v] = u;
        gScore[v] = tentativeG;
        const vNode = nodeMap.get(v);
        const h = (vNode && targetNode) ? Math.round(euclideanDistance(vNode, targetNode)) : 0;
        const f = algorithm === 'astar' ? tentativeG + h : tentativeG;
        fScore[v] = f;
        pq.push(v, f);
        activeNeighborsList.push({ id: v, cost: f, updated: true });
      } else {
        activeNeighborsList.push({ id: v, cost: fScore[v], updated: false });
      }
    }

    // Build partial path up to current node
    const partialPath: string[] = [];
    let pCurr: string | null = u;
    while (pCurr !== null) {
      partialPath.unshift(pCurr);
      pCurr = parent[pCurr];
    }

    const titleAr = closedSet.size === 1
      ? 'المرحلة 2: بدء استكشاف الجيران المباشرين'
      : `المرحلة 3: توسع البحث وفحص التقاطع (${uNode?.labelAr || u})`;

    steps.push({
      stepNumber: stepCounter++,
      phase,
      titleAr,
      currentNodeId: u,
      openSet: pq.getItems().map(item => ({
        id: item.item,
        g: gScore[item.item],
        h: targetNode ? Math.round(euclideanDistance(nodeMap.get(item.item)!, targetNode)) : 0,
        f: item.priority
      })),
      closedSet: Array.from(closedSet),
      distances: { ...gScore },
      previous: { ...parent },
      activeNeighbors: activeNeighborsList,
      highlightedPath: partialPath,
      explanationAr: `تم سحب العقدة [${uNode?.label || u}] ذات الأولوية الصغرى. تم فحص ${neighbors.length} من الطرق المتصلة واسترخاء المسافات.`
    });
  }

  return steps;
}

// Live Benchmark Suite: runs on 10, 50, 100, 500, 1000 nodes
export function runLiveBenchmarkSuite(): BenchmarkResult[] {
  const sizes = [10, 50, 100, 500, 1000];
  const results: BenchmarkResult[] = [];

  for (const size of sizes) {
    const { nodes, edges, startId, targetId } = generateBenchmarkGraph(size);

    // Warm-up
    solveDijkstra(nodes, edges, startId, targetId);
    solveAStar(nodes, edges, startId, targetId);

    // Measure Dijkstra
    const ITERATIONS = size <= 100 ? 10 : 3;
    let totalDijkstraTime = 0;
    let dResult: AlgorithmMetrics = solveDijkstra(nodes, edges, startId, targetId);
    for (let i = 0; i < ITERATIONS; i++) {
      const t0 = performance.now();
      dResult = solveDijkstra(nodes, edges, startId, targetId);
      const t1 = performance.now();
      totalDijkstraTime += (t1 - t0);
    }
    const avgDijkstraTime = totalDijkstraTime / ITERATIONS;

    // Measure A*
    let totalAStarTime = 0;
    let aResult: AlgorithmMetrics = solveAStar(nodes, edges, startId, targetId);
    for (let i = 0; i < ITERATIONS; i++) {
      const t0 = performance.now();
      aResult = solveAStar(nodes, edges, startId, targetId);
      const t1 = performance.now();
      totalAStarTime += (t1 - t0);
    }
    const avgAStarTime = totalAStarTime / ITERATIONS;

    // Approximate memory based on nodes in sets and priority queue entries
    // Each node entry in map/heap is ~120 bytes
    const dijkstraMemKb = Math.round((dResult.visitedCount * 120 + dResult.maxQueueSize * 96 + edges.length * 48) / 1024 * 10) / 10;
    const astarMemKb = Math.round((aResult.visitedCount * 120 + aResult.maxQueueSize * 96 + edges.length * 48) / 1024 * 10) / 10;

    results.push({
      nodeCount: size,
      edgeCount: edges.length,
      dijkstraTimeMs: Math.max(0.01, Math.round(avgDijkstraTime * 100) / 100),
      astarTimeMs: Math.max(0.01, Math.round(avgAStarTime * 100) / 100),
      dijkstraVisited: dResult.visitedCount,
      astarVisited: aResult.visitedCount,
      dijkstraOperations: dResult.nodeExpansions + dResult.edgeRelaxations + dResult.pqOperations,
      astarOperations: aResult.nodeExpansions + aResult.edgeRelaxations + aResult.pqOperations,
      dijkstraCost: dResult.cost,
      astarCost: aResult.cost,
      dijkstraMemoryKb: dijkstraMemKb,
      astarMemoryKb: astarMemKb,
      pathLength: aResult.path.length,
      optimalityMatch: Math.abs(dResult.cost - aResult.cost) < 0.5
    });
  }

  return results;
}
