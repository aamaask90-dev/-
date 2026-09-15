import { GraphNode, GraphEdge } from '../types';

// Realistic Mini-City "مدينة المعرفة الذكية" (Smart Knowledge City)
export const MINI_CITY_NODES: GraphNode[] = [
  { id: 'start', label: 'Start', labelAr: 'محطة الانطلاق (محطة الشحن الغربية)', x: 60, y: 250, type: 'landmark' },
  { id: 'A', label: 'West Gate', labelAr: 'بوابة الغرب', x: 160, y: 150, type: 'residential' },
  { id: 'B', label: 'Industrial District', labelAr: 'المنطقة الصناعية واللوجستية', x: 160, y: 360, type: 'industrial' },
  { id: 'C', label: 'North Boulevard', labelAr: 'جادة الشمال السكنية', x: 300, y: 110, type: 'residential' },
  { id: 'D', label: 'Central Junction', labelAr: 'دوار التقاطع المركزي', x: 320, y: 240, type: 'commercial' },
  { id: 'E', label: 'South Depot', labelAr: 'مستودعات الجنوب', x: 300, y: 380, type: 'industrial' },
  { id: 'F', label: 'Tech Park', labelAr: 'واحة التقنية والأبحاث', x: 480, y: 140, type: 'commercial' },
  { id: 'G', label: 'Highway 10', labelAr: 'الطريق السريع 10', x: 490, y: 260, type: 'highway' },
  { id: 'H', label: 'Harbor Gate', labelAr: 'بوابة الميناء البحري', x: 470, y: 390, type: 'industrial' },
  { id: 'I', label: 'Medical City', labelAr: 'المدينة الطبية المركزية', x: 640, y: 160, type: 'residential' },
  { id: 'J', label: 'University Axis', labelAr: 'محور الجامعة والعلوم', x: 650, y: 270, type: 'commercial' },
  { id: 'target', label: 'Financial Center', labelAr: 'نقطة الوجهة (المركز المالي الدولي)', x: 780, y: 220, type: 'landmark' }
];

export const MINI_CITY_EDGES: GraphEdge[] = [
  // From Start
  { from: 'start', to: 'A', weight: 14, roadName: 'شارع الواحة' },
  { from: 'start', to: 'B', weight: 15, roadName: 'طريق الشاحنات القديم' },
  { from: 'start', to: 'D', weight: 30, roadName: 'الجادة الغربية السريعة' },

  // From A
  { from: 'A', to: 'C', weight: 15, roadName: 'طريق الحزام الشمالي' },
  { from: 'A', to: 'D', weight: 18, roadName: 'شارع الزهور' },

  // From B
  { from: 'B', to: 'D', weight: 19, roadName: 'طريق الصناعية المركزي' },
  { from: 'B', to: 'E', weight: 16, roadName: 'مسار الشحن الجنوبي' },

  // From C
  { from: 'C', to: 'F', weight: 19, roadName: 'شارع الأبحاث' },
  { from: 'C', to: 'D', weight: 15, roadName: 'تقاطع الشمال الداخلي' },

  // From D (Central)
  { from: 'D', to: 'F', weight: 20, roadName: 'جسر التقنية' },
  { from: 'D', to: 'G', weight: 18, roadName: 'جسر الوفاق السريع', isHighway: true },
  { from: 'D', to: 'E', weight: 16, roadName: 'شارع البلدية' },

  // From E
  { from: 'E', to: 'H', weight: 20, roadName: 'طريق الميناء' },
  { from: 'E', to: 'G', weight: 22, roadName: 'طريق الدائري الجنوبي' },

  // From F
  { from: 'F', to: 'I', weight: 17, roadName: 'طريق المستشفيات' },
  { from: 'F', to: 'G', weight: 14, roadName: 'محور الربط الشرقي' },
  { from: 'F', to: 'target', weight: 34, roadName: 'طريق الأعمال الشمالي' },

  // From G (Highway)
  { from: 'G', to: 'J', weight: 16, roadName: 'الطريق السريع الرئيسي', isHighway: true },
  { from: 'G', to: 'H', weight: 15, roadName: 'وصلة الميناء' },
  { from: 'G', to: 'target', weight: 30, roadName: 'نفق المركز المالي السريع', isHighway: true },

  // From H
  { from: 'H', to: 'J', weight: 23, roadName: 'شارع الجمارك' },

  // From I
  { from: 'I', to: 'target', weight: 16, roadName: 'جسر المال والأعمال' },

  // From J
  { from: 'J', to: 'target', weight: 14, roadName: 'شارع الأبراج' }
];

// Helper to calculate Euclidean distance (admissible straight-line heuristic)
export function euclideanDistance(node1: GraphNode, node2: GraphNode): number {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Procedural Generator for Experimental Graphs (10, 50, 100, 500, 1000 nodes)
export function generateBenchmarkGraph(numNodes: number): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startId: string;
  targetId: string;
} {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  
  // Use a pseudo-random seed for deterministic repeatability across tests
  let seed = 42;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const gridSize = Math.ceil(Math.sqrt(numNodes * 1.5));
  const spacing = 40;

  for (let i = 0; i < numNodes; i++) {
    const gx = i % gridSize;
    const gy = Math.floor(i / gridSize);
    const jitterX = (random() - 0.5) * 15;
    const jitterY = (random() - 0.5) * 15;

    nodes.push({
      id: `node_${i}`,
      label: `N${i}`,
      labelAr: `تقاطع ${i}`,
      x: Math.round(gx * spacing + jitterX + 50),
      y: Math.round(gy * spacing + jitterY + 50),
      type: i === 0 ? 'landmark' : i === numNodes - 1 ? 'landmark' : (i % 7 === 0 ? 'highway' : 'residential')
    });
  }

  // Create realistic road connections (connect to 2-4 nearest neighbors to form a planar-like road grid)
  for (let i = 0; i < numNodes; i++) {
    const nodeA = nodes[i];
    // Find nearest candidates
    const distances: { index: number; dist: number }[] = [];
    for (let j = 0; j < numNodes; j++) {
      if (i === j) continue;
      const nodeB = nodes[j];
      const dist = euclideanDistance(nodeA, nodeB);
      // Only consider nodes within reasonable distance
      if (dist < spacing * 2.2) {
        distances.push({ index: j, dist });
      }
    }

    distances.sort((a, b) => a.dist - b.dist);
    const connectCount = Math.min(distances.length, Math.floor(random() * 2) + 3);

    for (let k = 0; k < connectCount; k++) {
      const targetIdx = distances[k].index;
      const targetNode = nodes[targetIdx];
      // Weight is physical euclidean distance multiplied by a road factor (1.0 to 1.3 to simulate real street curves)
      const roadFactor = 1.0 + random() * 0.3;
      const weight = Math.round(euclideanDistance(nodeA, targetNode) * roadFactor * 10) / 10;

      // Avoid exact duplicate edges
      const exists = edges.some(e => 
        (e.from === nodeA.id && e.to === targetNode.id) || 
        (e.from === targetNode.id && e.to === nodeA.id)
      );

      if (!exists) {
        edges.push({
          from: nodeA.id,
          to: targetNode.id,
          weight,
          roadName: `شارع ${nodeA.label}-${targetNode.label}`,
          isHighway: random() > 0.8
        });
      }
    }
  }

  // Ensure graph connectivity by creating a backbone spine if needed
  for (let i = 0; i < numNodes - 1; i++) {
    const fromId = `node_${i}`;
    const toId = `node_${i + 1}`;
    const alreadyConnected = edges.some(e => 
      (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId)
    );
    if (!alreadyConnected) {
      const weight = Math.round(euclideanDistance(nodes[i], nodes[i + 1]) * 1.1 * 10) / 10;
      edges.push({
        from: fromId,
        to: toId,
        weight: Math.max(1, weight),
        roadName: `وصلة ربط ${i}`
      });
    }
  }

  return {
    nodes,
    edges,
    startId: nodes[0].id,
    targetId: nodes[numNodes - 1].id
  };
}

// ==========================================
// SCENARIO 1: BEST CASE GRAPH (Corridor / Direct Highway)
// Target is straight ahead, direct connections, minimal branching
// ==========================================
export const BEST_CASE_NODES: GraphNode[] = [
  { id: 'b_start', label: 'Start', labelAr: 'نقطة الانطلاق', x: 80, y: 220, type: 'landmark' },
  { id: 'b_1', label: 'Point A', labelAr: 'محطة أ', x: 240, y: 220, type: 'highway' },
  { id: 'b_2', label: 'Point B', labelAr: 'محطة ب', x: 400, y: 220, type: 'highway' },
  { id: 'b_target', label: 'Target', labelAr: 'الهدف المباشر', x: 560, y: 220, type: 'landmark' },
  // Distant alternative branches (ignored or rapidly pruned)
  { id: 'b_side1', label: 'Side 1', labelAr: 'فرعي شمالي', x: 240, y: 80, type: 'residential' },
  { id: 'b_side2', label: 'Side 2', labelAr: 'فرعي جنوبي', x: 400, y: 360, type: 'residential' },
];

export const BEST_CASE_EDGES: GraphEdge[] = [
  { from: 'b_start', to: 'b_1', weight: 10, roadName: 'طريق سريع مباشر 1', isHighway: true },
  { from: 'b_1', to: 'b_2', weight: 10, roadName: 'طريق سريع مباشر 2', isHighway: true },
  { from: 'b_2', to: 'b_target', weight: 10, roadName: 'طريق سريع مباشر 3', isHighway: true },
  { from: 'b_start', to: 'b_side1', weight: 35, roadName: 'مسار جبلي بديل' },
  { from: 'b_1', to: 'b_side2', weight: 40, roadName: 'طريق شحن فرعي' },
];

// ==========================================
// SCENARIO 2: AVERAGE / TYPICAL CASE GRAPH
// Standard urban grid with multiple competing alternatives
// ==========================================
export const AVERAGE_CASE_GRAPH = {
  nodes: MINI_CITY_NODES,
  edges: MINI_CITY_EDGES,
  startId: 'start',
  targetId: 'target'
};

// ==========================================
// SCENARIO 3: WORST CASE GRAPH (Deceptive Cul-de-Sac Barrier)
// Straight line points into a deep dead-end barrier, forcing A* to explore
// the trap before backtracking around a distant perimeter, and forcing Dijkstra
// to expand across a massive dense cluster of equal-weight decoy nodes!
// ==========================================
export const WORST_CASE_NODES: GraphNode[] = [
  { id: 'w_start', label: 'Start', labelAr: 'نقطة البداية', x: 80, y: 250, type: 'landmark' },
  // Deceptive Trap Cluster (high Euclidean attraction, but dead ends!)
  { id: 'w_trap1', label: 'Trap A', labelAr: 'مصيدة 1 (مغلقة)', x: 220, y: 250, type: 'residential' },
  { id: 'w_trap2', label: 'Trap B', labelAr: 'مصيدة 2 (مغلقة)', x: 340, y: 250, type: 'residential' },
  { id: 'w_trap3', label: 'Cul-de-sac', labelAr: 'شارع مسدود جداري', x: 440, y: 250, type: 'industrial' },
  // Lower Decoy Cluster (diverting Dijkstra)
  { id: 'w_decoy1', label: 'Decoy 1', labelAr: 'تفرع جنوبي 1', x: 180, y: 380, type: 'residential' },
  { id: 'w_decoy2', label: 'Decoy 2', labelAr: 'تفرع جنوبي 2', x: 280, y: 390, type: 'residential' },
  { id: 'w_decoy3', label: 'Decoy 3', labelAr: 'تفرع جنوبي 3', x: 380, y: 380, type: 'residential' },
  // True Detour Path (far North around the impassable barrier)
  { id: 'w_detour1', label: 'Detour North 1', labelAr: 'ممر الالتفاف الشمالي 1', x: 160, y: 90, type: 'highway' },
  { id: 'w_detour2', label: 'Detour North 2', labelAr: 'ممر الالتفاف الشمالي 2', x: 320, y: 70, type: 'highway' },
  { id: 'w_detour3', label: 'Detour North 3', labelAr: 'ممر الالتفاف الشمالي 3', x: 480, y: 90, type: 'highway' },
  { id: 'w_bridge', label: 'East Bridge', labelAr: 'جسر العبور الشرقي', x: 600, y: 150, type: 'highway' },
  // Target
  { id: 'w_target', label: 'Target', labelAr: 'الهدف المعزول', x: 580, y: 250, type: 'landmark' },
];

export const WORST_CASE_EDGES: GraphEdge[] = [
  // Deceptive forward path (small attractive weights into cul-de-sac)
  { from: 'w_start', to: 'w_trap1', weight: 8, roadName: 'شارع الفخ 1' },
  { from: 'w_trap1', to: 'w_trap2', weight: 8, roadName: 'شارع الفخ 2' },
  { from: 'w_trap2', to: 'w_trap3', weight: 8, roadName: 'حاجز مسدود' },
  // Decoy branches that waste Dijkstra's priority queue exploration
  { from: 'w_start', to: 'w_decoy1', weight: 9, roadName: 'فرعي 1' },
  { from: 'w_decoy1', to: 'w_decoy2', weight: 7, roadName: 'فرعي 2' },
  { from: 'w_decoy2', to: 'w_decoy3', weight: 8, roadName: 'فرعي 3' },
  // True detour path (long geometric path that works)
  { from: 'w_start', to: 'w_detour1', weight: 18, roadName: 'طريق الالتفاف 1' },
  { from: 'w_detour1', to: 'w_detour2', weight: 16, roadName: 'طريق الالتفاف 2' },
  { from: 'w_detour2', to: 'w_detour3', weight: 16, roadName: 'طريق الالتفاف 3' },
  { from: 'w_detour3', to: 'w_bridge', weight: 14, roadName: 'وصلة الجسر' },
  { from: 'w_bridge', to: 'w_target', weight: 12, roadName: 'نفق الوصول النهائي' },
];
