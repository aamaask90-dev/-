import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  Zap, 
  Layers, 
  Sliders, 
  MapPin, 
  Flag, 
  Route, 
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MINI_CITY_NODES, MINI_CITY_EDGES, euclideanDistance } from '../data/sampleGraphs';
import { generateSimulationTrace } from '../algorithms/pathfinding';
import { GraphNode, GraphEdge } from '../types';
import { SmartNavigationShip } from './SmartNavigationShip';

export const SimulationView: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<'dijkstra' | 'astar' | 'both'>('astar');
  const [startNodeId, setStartNodeId] = useState<string>('start');
  const [targetNodeId, setTargetNodeId] = useState<string>('target');
  const [blockedEdges, setBlockedEdges] = useState<Set<string>>(new Set());

  // Active edges considering road obstacles
  const activeEdges = useMemo(() => {
    return MINI_CITY_EDGES.filter(e => {
      const edgeKey = `${e.from}-${e.to}`;
      const revKey = `${e.to}-${e.from}`;
      return !blockedEdges.has(edgeKey) && !blockedEdges.has(revKey);
    });
  }, [blockedEdges]);

  // Generate simulation traces
  const astarTrace = useMemo(() => {
    return generateSimulationTrace('astar', MINI_CITY_NODES, activeEdges, startNodeId, targetNodeId);
  }, [activeEdges, startNodeId, targetNodeId]);

  const dijkstraTrace = useMemo(() => {
    return generateSimulationTrace('dijkstra', MINI_CITY_NODES, activeEdges, startNodeId, targetNodeId);
  }, [activeEdges, startNodeId, targetNodeId]);

  // Current active trace based on selection
  const currentTrace = selectedAlgo === 'dijkstra' ? dijkstraTrace : astarTrace;

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step

  // Safe bounds check
  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [selectedAlgo, startNodeId, targetNodeId, blockedEdges]);

  // Playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= currentTrace.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrace.length, playbackSpeed]);

  const currentStep = currentTrace[stepIndex] || currentTrace[0];

  // Toggle edge obstacle
  const handleToggleObstacle = (from: string, to: string) => {
    const key = `${from}-${to}`;
    setBlockedEdges(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const astarFinalStep = astarTrace[astarTrace.length - 1];
  const dijkstraFinalStep = dijkstraTrace[dijkstraTrace.length - 1];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      
      {/* Simulation Top Control Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Algorithm Selector Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">الخوارزمية:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSelectedAlgo('astar')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedAlgo === 'astar'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              A* Algorithm (Informed)
            </button>
            <button
              onClick={() => setSelectedAlgo('dijkstra')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedAlgo === 'dijkstra'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dijkstra (Uninformed)
            </button>
            <button
              onClick={() => setSelectedAlgo('both')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedAlgo === 'both'
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              مقارنة متزامنة (Dual View)
            </button>
          </div>
        </div>

        {/* Start / Destination Selector Dropdowns */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">البداية:</span>
            <select
              value={startNodeId}
              onChange={(e) => setStartNodeId(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {MINI_CITY_NODES.map(n => (
                <option key={n.id} value={n.id} className="bg-slate-900 text-white">
                  {n.labelAr} ({n.label})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Flag className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-slate-400">الوجهة:</span>
            <select
              value={targetNodeId}
              onChange={(e) => setTargetNodeId(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {MINI_CITY_NODES.map(n => (
                <option key={n.id} value={n.id} className="bg-slate-900 text-white">
                  {n.labelAr} ({n.label})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isPlaying
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}</span>
          </button>

          <button
            onClick={() => setStepIndex(prev => Math.min(prev + 1, currentTrace.length - 1))}
            disabled={stepIndex >= currentTrace.length - 1}
            title="الخطوة التالية"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all text-xs"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(false);
            }}
            title="إعادة ضبط المحاكاة"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
            <Zap className="w-3 h-3 text-amber-400" />
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-transparent text-slate-300 text-[11px] focus:outline-none cursor-pointer"
            >
              <option value={1500} className="bg-slate-900">0.5x بطيء</option>
              <option value={1000} className="bg-slate-900">1.0x عادي</option>
              <option value={500} className="bg-slate-900">2.0x سريع</option>
              <option value={200} className="bg-slate-900">5.0x فائق</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Simulation Viewport & Side Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Interactive SVG Canvas Area */}
        <div className="flex-1 bg-slate-950 p-4 relative overflow-hidden flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
          
          {/* Simulation Step Badge & Explanation Banner */}
          <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800/90 rounded-xl p-3 mb-3 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                الخطوة {stepIndex + 1} من {currentTrace.length}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentStep.titleAr}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentStep.explanationAr}
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-slate-400">العقد المستكشفة حتى الآن:</span>
              <div className="text-sm font-bold font-mono text-amber-400">
                {currentStep.closedSet.length} عقدة
              </div>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="w-full max-w-4xl flex-1 bg-slate-900/40 rounded-2xl border border-slate-800/80 relative overflow-hidden shadow-2xl flex items-center justify-center p-2">
            
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            <svg viewBox="0 0 850 480" className="w-full h-full max-h-[520px] select-none">
              <defs>
                <linearGradient id="pathGradientAstar" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="pathGradientDijkstra" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Draw Edges (Roads) */}
              {MINI_CITY_EDGES.map((edge, idx) => {
                const nodeFrom = MINI_CITY_NODES.find(n => n.id === edge.from)!;
                const nodeTo = MINI_CITY_NODES.find(n => n.id === edge.to)!;
                const edgeKey = `${edge.from}-${edge.to}`;
                const isBlocked = blockedEdges.has(edgeKey) || blockedEdges.has(`${edge.to}-${edge.from}`);

                // Check if this edge is in the current highlighted path
                const inPath = currentStep.highlightedPath.some((nodeId, pIdx) => {
                  if (pIdx >= currentStep.highlightedPath.length - 1) return false;
                  const nextNodeId = currentStep.highlightedPath[pIdx + 1];
                  return (
                    (nodeId === edge.from && nextNodeId === edge.to) ||
                    (nodeId === edge.to && nextNodeId === edge.from)
                  );
                });

                const isHighway = edge.isHighway;

                return (
                  <g 
                    key={idx} 
                    className="cursor-pointer group"
                    onClick={() => handleToggleObstacle(edge.from, edge.to)}
                  >
                    {/* Road Base Line */}
                    <line
                      x1={nodeFrom.x}
                      y1={nodeFrom.y}
                      x2={nodeTo.x}
                      y2={nodeTo.y}
                      stroke={
                        isBlocked
                          ? '#ef4444'
                          : inPath
                          ? selectedAlgo === 'dijkstra' ? '#10b981' : '#f59e0b'
                          : isHighway
                          ? '#475569'
                          : '#334155'
                      }
                      strokeWidth={inPath ? 5 : isHighway ? 3.5 : 2}
                      strokeDasharray={isBlocked ? '5,5' : 'none'}
                      strokeLinecap="round"
                      filter={inPath ? 'url(#glow)' : undefined}
                      className="transition-all duration-300"
                    />

                    {/* Road Weight & Distance Label */}
                    <rect
                      x={(nodeFrom.x + nodeTo.x) / 2 - 14}
                      y={(nodeFrom.y + nodeTo.y) / 2 - 10}
                      width={28}
                      height={18}
                      rx={4}
                      fill="#0f172a"
                      stroke={inPath ? (selectedAlgo === 'dijkstra' ? '#10b981' : '#f59e0b') : '#334155'}
                      strokeWidth={1}
                    />
                    <text
                      x={(nodeFrom.x + nodeTo.x) / 2}
                      y={(nodeFrom.y + nodeTo.y) / 2 + 3}
                      textAnchor="middle"
                      fill={isBlocked ? '#f87171' : inPath ? '#ffffff' : '#94a3b8'}
                      fontSize={10}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {isBlocked ? '✕' : edge.weight}
                    </text>
                  </g>
                );
              })}

              {/* Draw Nodes (Intersections & Landmarks) */}
              {MINI_CITY_NODES.map((node) => {
                const isStart = node.id === startNodeId;
                const isTarget = node.id === targetNodeId;
                const isCurrent = node.id === currentStep.currentNodeId;
                const isClosed = currentStep.closedSet.includes(node.id);
                const isOpen = currentStep.openSet.some(item => item.id === node.id);
                const inFinalPath = currentStep.highlightedPath.includes(node.id);

                let fillColor = '#1e293b';
                let strokeColor = '#475569';
                let radius = 16;

                if (isStart) {
                  fillColor = '#10b981';
                  strokeColor = '#34d399';
                  radius = 20;
                } else if (isTarget) {
                  fillColor = '#f43f5e';
                  strokeColor = '#fb7185';
                  radius = 20;
                } else if (isCurrent) {
                  fillColor = '#6366f1';
                  strokeColor = '#a5b4fc';
                  radius = 18;
                } else if (inFinalPath) {
                  fillColor = selectedAlgo === 'dijkstra' ? '#059669' : '#d97706';
                  strokeColor = selectedAlgo === 'dijkstra' ? '#34d399' : '#fbbf24';
                  radius = 18;
                } else if (isClosed) {
                  fillColor = selectedAlgo === 'dijkstra' ? '#047857' : '#b45309';
                  strokeColor = selectedAlgo === 'dijkstra' ? '#10b981' : '#f59e0b';
                } else if (isOpen) {
                  fillColor = '#1e1b4b';
                  strokeColor = '#818cf8';
                }

                return (
                  <g 
                    key={node.id} 
                    className="cursor-pointer group"
                    onClick={() => {
                      // Click to toggle start or target
                      if (node.id !== targetNodeId) {
                        setStartNodeId(node.id);
                      }
                    }}
                  >
                    {/* Node Ripple Glow on Active */}
                    {isCurrent && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 8}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth={2}
                        className="animate-ping"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={2.5}
                      className="transition-all duration-300"
                    />

                    {/* Node Short Label */}
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={11}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {node.label}
                    </text>

                    {/* Arabic District Label underneath */}
                    <text
                      x={node.x}
                      y={node.y + radius + 14}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize={10}
                      fontWeight="500"
                    >
                      {node.labelAr}
                    </text>

                    {/* Cost Badge above Node */}
                    {currentStep.distances[node.id] !== undefined && currentStep.distances[node.id] !== Infinity && (
                      <g>
                        <rect
                          x={node.x - 22}
                          y={node.y - radius - 20}
                          width={44}
                          height={16}
                          rx={4}
                          fill="#0f172a"
                          stroke={isClosed ? '#10b981' : '#6366f1'}
                          strokeWidth={1}
                        />
                        <text
                          x={node.x}
                          y={node.y - radius - 8}
                          textAnchor="middle"
                          fill="#e2e8f0"
                          fontSize={9}
                          fontFamily="monospace"
                        >
                          g={Math.round(currentStep.distances[node.id] * 10) / 10}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Smart Navigation Ship stationed at current active node */}
              {(() => {
                const activeNode = MINI_CITY_NODES.find(n => n.id === currentStep.currentNodeId) || MINI_CITY_NODES.find(n => n.id === startNodeId);
                if (!activeNode) return null;
                return (
                  <SmartNavigationShip
                    x={activeNode.x}
                    y={activeNode.y}
                    size={36}
                    angle={15}
                    label={`سفينة الملاحة: ${activeNode.labelAr.split(' ')[0]}`}
                  />
                );
              })()}
            </svg>

            {/* Map Legend Floating */}
            <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800/80 rounded-xl p-2.5 text-[11px] space-y-1.5 backdrop-blur-md shadow-lg">
              <div className="font-bold text-white mb-1 border-b border-slate-800 pb-1">دليل الرموز والألوان:</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-300">نقطة الانطلاق (Start)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-slate-300">نقطة الوجهة (Target)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-slate-300">العقدة النشطة حالياً (Current)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-300">المجموعة المغلقة (Visited / Closed)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 font-bold">✕</span>
                <span className="text-slate-300">انقر على أي طريق لقطعه بحاجز مروري</span>
              </div>
            </div>

          </div>

        </div>

        {/* Side Panel: State Inspection & Queue Watcher */}
        <div className="w-full lg:w-96 bg-slate-900/95 border-t lg:border-t-0 border-slate-800 p-4 flex flex-col justify-between overflow-y-auto">
          
          <div>
            {/* Dual Comparison Summary Cards */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>المقارنة الميدانية المباشرة للمسار الحالي</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Dijkstra Card */}
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold mb-1">خوارزمية Dijkstra</div>
                  <div className="text-slate-300 text-[11px] mb-1">
                    العقد المفحوصة: <span className="font-mono text-white font-bold">{dijkstraFinalStep?.closedSet.length || 0}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    التكلفة الكلية: <span className="font-mono text-emerald-400 font-bold">{dijkstraFinalStep?.distances[targetNodeId] || 0}</span>
                  </div>
                </div>

                {/* A* Card */}
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
                  <div className="text-amber-400 font-bold mb-1">خوارزمية A*</div>
                  <div className="text-slate-300 text-[11px] mb-1">
                    العقد المفحوصة: <span className="font-mono text-white font-bold">{astarFinalStep?.closedSet.length || 0}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    التكلفة الكلية: <span className="font-mono text-amber-400 font-bold">{astarFinalStep?.distances[targetNodeId] || 0}</span>
                  </div>
                </div>
              </div>

              {/* Efficiency Highlight */}
              {dijkstraFinalStep && astarFinalStep && dijkstraFinalStep.closedSet.length > 0 && (
                <div className="mt-2 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200 flex items-center justify-between">
                  <span>نسبة توفير الجهد في A*:</span>
                  <span className="font-bold font-mono text-amber-400">
                    {Math.round((1 - astarFinalStep.closedSet.length / dijkstraFinalStep.closedSet.length) * 100)}% أقل فحصاً للعقد
                  </span>
                </div>
              )}
            </div>

            {/* Current Open Set (Priority Queue Table) */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>طابور الأولوية (Priority Queue / Open Set)</span>
                <span className="font-mono text-indigo-400 text-[11px]">{currentStep.openSet.length} عناصر</span>
              </h3>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 max-h-44 overflow-y-auto">
                {currentStep.openSet.length === 0 ? (
                  <div className="text-slate-500 text-xs text-center py-4">الطابور فارغ حالياً</div>
                ) : (
                  <div className="space-y-1">
                    {currentStep.openSet.map((item, idx) => {
                      const n = MINI_CITY_NODES.find(node => node.id === item.id);
                      return (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-1.5 rounded bg-slate-900/60 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-mono text-[10px] text-slate-400">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-white font-mono">{n?.label || item.id}</span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[90px]">{n?.labelAr}</span>
                          </div>
                          <div className="font-mono text-[11px] text-right">
                            {selectedAlgo === 'astar' ? (
                              <span className="text-amber-400">
                                f={Math.round((item.f || 0) * 10) / 10} <span className="text-slate-500 text-[9px]">(g:{Math.round(item.g * 10) / 10}+h:{item.h})</span>
                              </span>
                            ) : (
                              <span className="text-emerald-400">
                                dist={Math.round(item.g * 10) / 10}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Closed Set / Settled Nodes */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                العقد المغلقة والمستقرة نهائياً (Closed Set)
              </h3>
              <div className="flex flex-wrap gap-1.5 bg-slate-950 p-2.5 rounded-xl border border-slate-800 min-h-16">
                {currentStep.closedSet.map((nodeId, idx) => {
                  const n = MINI_CITY_NODES.find(node => node.id === nodeId);
                  return (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700 text-[11px] font-mono"
                    >
                      {n?.label || nodeId}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Callout note */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              نظام المحاكاة ينفذ الخوارزمية الفعلية لحظة بلحظة مع احتساب متباينة المسافة الإقليدية Admissible Heuristic.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
