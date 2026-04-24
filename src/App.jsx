import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  User, Globe, Server, Database, Cloud, Box, Zap, Layers,
  Plus, Trash2, Link2, Download, Copy, Check, ChevronRight, ChevronDown,
  Folder, FolderOpen, FileCode, FileText, FileJson, FileCog,
  Target, Sparkles, Network, Code2, Settings, Workflow,
  Monitor, Smartphone, Shield, GitBranch, ArrowRight, Wifi,
  CircleDot, X, Move, Eye, EyeOff, RotateCcw
} from 'lucide-react';

// =============================================================================
// TECH-STACK TEMPLATES — echte, production-like Strukturen
// =============================================================================
const TECH = {
  // FRONTEND
  nextjs: {
    label: 'Next.js 14',
    category: 'frontend',
    folder: 'apps/web',
    tree: {
      'app/': { 'layout.tsx': 'f', 'page.tsx': 'f', 'globals.css': 'f', '(auth)/': { 'login/': { 'page.tsx': 'f' } }, 'api/': { 'route.ts': 'f' } },
      'components/': { 'ui/': {}, 'layout/': {} },
      'lib/': { 'utils.ts': 'f', 'api-client.ts': 'f' },
      'public/': {},
      'next.config.mjs': 'f', 'tailwind.config.ts': 'f', 'tsconfig.json': 'f', 'package.json': 'f', '.env.local': 'f'
    }
  },
  vite: {
    label: 'Vite + React',
    category: 'frontend',
    folder: 'apps/web',
    tree: {
      'src/': { 'main.tsx': 'f', 'App.tsx': 'f', 'index.css': 'f', 'components/': {}, 'hooks/': {}, 'lib/': {}, 'routes/': {} },
      'public/': {},
      'index.html': 'f', 'vite.config.ts': 'f', 'tsconfig.json': 'f', 'package.json': 'f'
    }
  },
  expo: {
    label: 'Expo (React Native)',
    category: 'frontend',
    folder: 'apps/mobile',
    tree: {
      'app/': { '_layout.tsx': 'f', 'index.tsx': 'f', '(tabs)/': { '_layout.tsx': 'f', 'home.tsx': 'f' } },
      'components/': {},
      'hooks/': {},
      'assets/': { 'images/': {}, 'fonts/': {} },
      'app.json': 'f', 'babel.config.js': 'f', 'tsconfig.json': 'f', 'package.json': 'f'
    }
  },
  sveltekit: {
    label: 'SvelteKit',
    category: 'frontend',
    folder: 'apps/web',
    tree: {
      'src/': { 'routes/': { '+layout.svelte': 'f', '+page.svelte': 'f' }, 'lib/': {}, 'app.html': 'f' },
      'static/': {},
      'svelte.config.js': 'f', 'vite.config.ts': 'f', 'package.json': 'f'
    }
  },

  // BACKEND
  nestjs: {
    label: 'NestJS',
    category: 'backend',
    folder: 'apps/api',
    tree: {
      'src/': {
        'main.ts': 'f', 'app.module.ts': 'f', 'app.controller.ts': 'f', 'app.service.ts': 'f',
        'modules/': { 'users/': { 'users.module.ts': 'f', 'users.controller.ts': 'f', 'users.service.ts': 'f', 'dto/': {}, 'entities/': {} } },
        'common/': { 'guards/': {}, 'filters/': {}, 'interceptors/': {}, 'pipes/': {}, 'decorators/': {} },
        'config/': { 'configuration.ts': 'f' }
      },
      'test/': {},
      'nest-cli.json': 'f', 'tsconfig.json': 'f', 'package.json': 'f', '.env': 'f'
    }
  },
  express: {
    label: 'Express.js',
    category: 'backend',
    folder: 'apps/api',
    tree: {
      'src/': {
        'index.ts': 'f',
        'routes/': { 'index.ts': 'f' },
        'controllers/': {},
        'middleware/': { 'auth.ts': 'f', 'errorHandler.ts': 'f' },
        'services/': {},
        'models/': {},
        'utils/': {}
      },
      'tsconfig.json': 'f', 'package.json': 'f', '.env': 'f'
    }
  },
  fastapi: {
    label: 'FastAPI',
    category: 'backend',
    folder: 'apps/api',
    tree: {
      'app/': {
        '__init__.py': 'f', 'main.py': 'f',
        'routers/': { '__init__.py': 'f', 'users.py': 'f' },
        'models/': { '__init__.py': 'f' },
        'schemas/': { '__init__.py': 'f' },
        'services/': { '__init__.py': 'f' },
        'core/': { 'config.py': 'f', 'security.py': 'f' }
      },
      'tests/': {},
      'requirements.txt': 'f', 'pyproject.toml': 'f', '.env': 'f'
    }
  },
  django: {
    label: 'Django',
    category: 'backend',
    folder: 'apps/api',
    tree: {
      'config/': { 'settings.py': 'f', 'urls.py': 'f', 'wsgi.py': 'f' },
      'apps/': { 'users/': { 'models.py': 'f', 'views.py': 'f', 'urls.py': 'f', 'serializers.py': 'f' } },
      'manage.py': 'f', 'requirements.txt': 'f'
    }
  },
  go_fiber: {
    label: 'Go (Fiber)',
    category: 'backend',
    folder: 'apps/api',
    tree: {
      'cmd/': { 'api/': { 'main.go': 'f' } },
      'internal/': { 'handlers/': {}, 'services/': {}, 'repository/': {}, 'models/': {} },
      'pkg/': {},
      'go.mod': 'f', 'go.sum': 'f', '.env': 'f'
    }
  },

  // DATABASE
  postgres: {
    label: 'PostgreSQL',
    category: 'database',
    folder: 'packages/db',
    tree: {
      'prisma/': { 'schema.prisma': 'f', 'migrations/': {}, 'seed.ts': 'f' },
      'docker-compose.yml': 'f', '.env': 'f'
    }
  },
  mongodb: {
    label: 'MongoDB',
    category: 'database',
    folder: 'packages/db',
    tree: {
      'schemas/': {},
      'migrations/': {},
      'seeds/': {},
      'docker-compose.yml': 'f', '.env': 'f'
    }
  },
  redis: {
    label: 'Redis',
    category: 'database',
    folder: 'infra/redis',
    tree: {
      'redis.conf': 'f', 'docker-compose.yml': 'f'
    }
  },

  // GATEWAY / EDGE
  nginx: {
    label: 'Nginx',
    category: 'gateway',
    folder: 'infra/nginx',
    tree: {
      'conf.d/': { 'default.conf': 'f', 'upstream.conf': 'f' },
      'ssl/': {},
      'nginx.conf': 'f', 'Dockerfile': 'f'
    }
  },
  cloudflare: {
    label: 'Cloudflare Workers',
    category: 'gateway',
    folder: 'apps/edge',
    tree: {
      'src/': { 'index.ts': 'f', 'handlers/': {}, 'middleware/': {} },
      'wrangler.toml': 'f', 'package.json': 'f'
    }
  },
  kong: {
    label: 'Kong Gateway',
    category: 'gateway',
    folder: 'infra/kong',
    tree: { 'kong.yml': 'f', 'docker-compose.yml': 'f' }
  },

  // EXTERNAL / SERVICES
  n8n: {
    label: 'n8n',
    category: 'external',
    folder: 'infra/n8n',
    tree: { 'workflows/': {}, 'credentials/': {}, 'docker-compose.yml': 'f', '.env': 'f' }
  },
  stripe: {
    label: 'Stripe',
    category: 'external',
    folder: 'packages/payments',
    tree: { 'webhooks/': { 'handler.ts': 'f' }, 'checkout.ts': 'f', 'types.ts': 'f' }
  },
  auth0: {
    label: 'Auth0 / Clerk',
    category: 'external',
    folder: 'packages/auth',
    tree: { 'providers/': {}, 'middleware.ts': 'f', 'config.ts': 'f' }
  },

  // INFRA
  docker: {
    label: 'Docker',
    category: 'infra',
    folder: '.',
    tree: { 'docker-compose.yml': 'f', 'Dockerfile': 'f', '.dockerignore': 'f' }
  },
  k8s: {
    label: 'Kubernetes',
    category: 'infra',
    folder: 'infra/k8s',
    tree: { 'deployments/': {}, 'services/': {}, 'ingress/': {}, 'configmaps/': {}, 'namespace.yaml': 'f' }
  },
  gha: {
    label: 'GitHub Actions',
    category: 'infra',
    folder: '.github',
    tree: { 'workflows/': { 'ci.yml': 'f', 'deploy.yml': 'f' } }
  },

  // CLIENT (keine files, nur marker)
  user: { label: 'End User', category: 'client', folder: null, tree: null },
  browser: { label: 'Web Browser', category: 'client', folder: null, tree: null },
  mobile_device: { label: 'Mobile Device', category: 'client', folder: null, tree: null },
};

// Node-Typ Definitionen (für die Palette)
const NODE_CATEGORIES = [
  { id: 'client', label: 'Client', icon: User, color: '#E0B0FF', techs: ['user', 'browser', 'mobile_device'] },
  { id: 'frontend', label: 'Frontend', icon: Monitor, color: '#7FDBFF', techs: ['nextjs', 'vite', 'sveltekit', 'expo'] },
  { id: 'gateway', label: 'Gateway / Edge', icon: Shield, color: '#FFB800', techs: ['nginx', 'cloudflare', 'kong'] },
  { id: 'backend', label: 'Backend', icon: Server, color: '#A8E6A3', techs: ['nestjs', 'express', 'fastapi', 'django', 'go_fiber'] },
  { id: 'database', label: 'Database', icon: Database, color: '#FF9AA2', techs: ['postgres', 'mongodb', 'redis'] },
  { id: 'external', label: 'External', icon: Zap, color: '#FFD1DC', techs: ['n8n', 'stripe', 'auth0'] },
  { id: 'infra', label: 'Infra', icon: Cloud, color: '#B0B0B0', techs: ['docker', 'k8s', 'gha'] },
];

const CAT_META = Object.fromEntries(NODE_CATEGORIES.map(c => [c.id, c]));

// =============================================================================
// HELPERS
// =============================================================================
const uid = () => Math.random().toString(36).slice(2, 10);

function mergeTrees(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (v === 'f') {
      out[k] = 'f';
    } else if (typeof v === 'object') {
      out[k] = mergeTrees(out[k] && typeof out[k] === 'object' ? out[k] : {}, v);
    }
  }
  return out;
}

function buildGlobalTree(nodes) {
  let root = {};
  // Monorepo-Wurzel
  root['package.json'] = 'f';
  root['turbo.json'] = 'f';
  root['README.md'] = 'f';
  root['.gitignore'] = 'f';

  for (const node of nodes) {
    const tpl = TECH[node.tech];
    if (!tpl || !tpl.tree || !tpl.folder) continue;
    if (tpl.folder === '.') {
      root = mergeTrees(root, tpl.tree);
    } else {
      // erzeuge nested folder path
      const parts = tpl.folder.split('/');
      let cur = root;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i] + '/'] || cur[parts[i] + '/'] === 'f') cur[parts[i] + '/'] = {};
        cur = cur[parts[i] + '/'];
      }
      const leaf = parts[parts.length - 1] + '/';
      cur[leaf] = mergeTrees(cur[leaf] && typeof cur[leaf] === 'object' ? cur[leaf] : {}, tpl.tree);
    }
  }
  return root;
}

function countFiles(tree) {
  let n = 0;
  for (const v of Object.values(tree)) {
    if (v === 'f') n++;
    else if (typeof v === 'object') n += countFiles(v);
  }
  return n;
}

function getFileIcon(name) {
  if (name.endsWith('.json')) return FileJson;
  if (name.match(/\.(ts|tsx|js|jsx|py|go|svelte|vue)$/)) return FileCode;
  if (name.match(/\.(yml|yaml|toml|conf|env)$/) || name.startsWith('.')) return FileCog;
  return FileText;
}

// =============================================================================
// MAIN APP
// =============================================================================
export default function ArchitectureStudio() {
  // Seed-Beispiel: klassischer 3-Tier-Stack
  const [nodes, setNodes] = useState([
    { id: 'n1', tech: 'user', label: 'User', x: 80, y: 180 },
    { id: 'n2', tech: 'nextjs', label: 'Web App', x: 280, y: 180 },
    { id: 'n3', tech: 'cloudflare', label: 'Edge Gateway', x: 500, y: 180 },
    { id: 'n4', tech: 'nestjs', label: 'API', x: 720, y: 180 },
    { id: 'n5', tech: 'postgres', label: 'DB', x: 940, y: 100 },
    { id: 'n6', tech: 'redis', label: 'Cache', x: 940, y: 260 },
  ]);
  const [edges, setEdges] = useState([
    { id: 'e1', from: 'n1', to: 'n2', label: 'HTTPS' },
    { id: 'e2', from: 'n2', to: 'n3', label: 'fetch' },
    { id: 'e3', from: 'n3', to: 'n4', label: 'proxy' },
    { id: 'e4', from: 'n4', to: 'n5', label: 'SQL' },
    { id: 'e5', from: 'n4', to: 'n6', label: 'cache' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeTab, setActiveTab] = useState('canvas');
  const [goal, setGoal] = useState('SaaS-Plattform für Tierarztpraxen: Recruiting-Workflow mit Bewerber-Matching, DSGVO-konform, DACH-Raum.');
  const [specs, setSpecs] = useState('- TypeScript überall\n- Monorepo (Turborepo)\n- SSR + ISR\n- OAuth via Clerk\n- Payments via Stripe\n- Deployed on Hetzner VPS');
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [draggedTech, setDraggedTech] = useState(null);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [expandedCats, setExpandedCats] = useState({ client: true, frontend: true, backend: true });
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showContext, setShowContext] = useState(true);
  const [copied, setCopied] = useState(false);
  const [filterNodeId, setFilterNodeId] = useState(null);

  const canvasRef = useRef(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // ------------------- NODE OPERATIONS -------------------
  const addNodeAt = (tech, x, y) => {
    const tpl = TECH[tech];
    const newNode = { id: uid(), tech, label: tpl.label, x: x - 70, y: y - 30 };
    setNodes(ns => [...ns, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const updateNode = (id, patch) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, ...patch } : n));
  };

  const deleteNode = (id) => {
    setNodes(ns => ns.filter(n => n.id !== id));
    setEdges(es => es.filter(e => e.from !== id && e.to !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleConnectClick = (nodeId) => {
    if (!connectingFrom) {
      setConnectingFrom(nodeId);
    } else if (connectingFrom === nodeId) {
      setConnectingFrom(null);
    } else {
      const exists = edges.some(e => e.from === connectingFrom && e.to === nodeId);
      if (!exists) {
        setEdges(es => [...es, { id: uid(), from: connectingFrom, to: nodeId, label: '' }]);
      }
      setConnectingFrom(null);
    }
  };

  const deleteEdge = (id) => setEdges(es => es.filter(e => e.id !== id));

  // ------------------- DRAG FROM PALETTE -------------------
  const handleCanvasDrop = (e) => {
    e.preventDefault();
    if (!draggedTech || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    addNodeAt(draggedTech, e.clientX - rect.left, e.clientY - rect.top);
    setDraggedTech(null);
  };

  const handleCanvasDragOver = (e) => e.preventDefault();

  // ------------------- DRAG NODES AROUND -------------------
  const startNodeDrag = (e, node) => {
    if (e.target.closest('[data-no-drag]')) return;
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    setDraggingNodeId(node.id);
    setDragOffset({ x: e.clientX - rect.left - node.x, y: e.clientY - rect.top - node.y });
    setSelectedNodeId(node.id);
  };

  useEffect(() => {
    if (!draggingNodeId) return;
    const move = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, e.clientX - rect.left - dragOffset.x);
      const y = Math.max(0, e.clientY - rect.top - dragOffset.y);
      updateNode(draggingNodeId, { x, y });
    };
    const up = () => setDraggingNodeId(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [draggingNodeId, dragOffset]);

  // ------------------- FILE TREE BUILDING -------------------
  const globalTree = useMemo(() => buildGlobalTree(nodes), [nodes]);
  const filteredTree = useMemo(() => {
    if (!filterNodeId) return globalTree;
    const node = nodes.find(n => n.id === filterNodeId);
    if (!node) return globalTree;
    const tpl = TECH[node.tech];
    if (!tpl || !tpl.tree) return {};
    if (tpl.folder === '.') return tpl.tree;
    const parts = tpl.folder.split('/');
    let root = {};
    let cur = root;
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i] + '/'] = {};
      cur = cur[parts[i] + '/'];
    }
    cur[parts[parts.length - 1] + '/'] = tpl.tree;
    return root;
  }, [filterNodeId, nodes, globalTree]);

  const totalFiles = useMemo(() => countFiles(globalTree), [globalTree]);

  // ------------------- EXPORT -------------------
  const exportJson = () => {
    const data = { goal, specs, nodes, edges, tree: globalTree };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture.json';
    a.click();
  };

  const copyTreeText = () => {
    const txt = treeToText(globalTree);
    navigator.clipboard?.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ------------------- RENDER -------------------
  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,184,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,184,0,0.04) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,184,0,0.015) 0%, transparent 70%);
          background-size: 24px 24px, 24px 24px, 100% 100%;
        }
        .scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar::-webkit-scrollbar-track { background: transparent; }
        .scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
        .scrollbar::-webkit-scrollbar-thumb:hover { background: #52525b; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(255, 184, 0, 0.6); }
          100% { box-shadow: 0 0 0 12px rgba(255, 184, 0, 0); }
        }
        .pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .edge-anim { animation: dash 1s linear infinite; }
      `}</style>

      {/* TOPBAR */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Workflow className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-xl leading-none tracking-tight">Architecture <span className="italic text-amber-400">Studio</span></h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">BPMN · Tech-Stack · File-Tree — unified</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4 mr-4 text-xs text-zinc-500">
            <span><span className="text-amber-400 font-bold">{nodes.length}</span> nodes</span>
            <span><span className="text-amber-400 font-bold">{edges.length}</span> edges</span>
            <span><span className="text-amber-400 font-bold">{totalFiles}</span> files</span>
          </div>
          <button onClick={copyTreeText} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'copied' : 'copy tree'}
          </button>
          <button onClick={exportJson} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition">
            <Download className="w-3.5 h-3.5" />
            export
          </button>
        </div>
      </header>

      {/* CONTEXT STRIP */}
      {showContext && (
        <div className="border-b border-zinc-800 bg-zinc-900/40">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase tracking-widest text-zinc-400">Project Context</span>
            </div>
            <button onClick={() => setShowContext(false)} className="text-zinc-500 hover:text-zinc-200">
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            <div className="bg-zinc-950 p-4">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3" /> Goal
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Was soll gebaut werden? (Zielbild, User, Domäne...)"
                className="w-full h-16 bg-transparent text-sm text-zinc-200 resize-none outline-none placeholder-zinc-600 scrollbar"
              />
            </div>
            <div className="bg-zinc-950 p-4">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 mb-2">
                <Settings className="w-3 h-3" /> Specs / Constraints
              </label>
              <textarea
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="Technische Rahmenbedingungen, Tools, Compliance..."
                className="w-full h-16 bg-transparent text-sm text-zinc-200 resize-none outline-none placeholder-zinc-600 scrollbar"
              />
            </div>
          </div>
        </div>
      )}
      {!showContext && (
        <button onClick={() => setShowContext(true)} className="border-b border-zinc-800 bg-zinc-900/40 px-6 py-1.5 text-xs text-zinc-500 hover:text-amber-400 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" /> show project context
        </button>
      )}

      {/* TABS */}
      <nav className="flex border-b border-zinc-800 bg-zinc-950 px-4">
        {[
          { id: 'canvas', label: 'Canvas', icon: Network },
          { id: 'files', label: 'File Tree', icon: Folder },
          { id: 'blueprint', label: 'Blueprint', icon: Layers },
          { id: 'stacks', label: 'Tech Stacks', icon: Code2 },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition -mb-px ${
              activeTab === t.id
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PALETTE */}
        {activeTab === 'canvas' && (
          <aside className="w-64 border-r border-zinc-800 bg-zinc-950 overflow-y-auto scrollbar">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Node Palette</h3>
              <p className="text-xs text-zinc-400">Drag onto canvas</p>
            </div>
            <div className="p-2">
              {NODE_CATEGORIES.map(cat => (
                <div key={cat.id} className="mb-1">
                  <button
                    onClick={() => setExpandedCats(s => ({ ...s, [cat.id]: !s[cat.id] }))}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-100 rounded"
                  >
                    {expandedCats[cat.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <cat.icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    <span className="uppercase tracking-wider font-bold">{cat.label}</span>
                  </button>
                  {expandedCats[cat.id] && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {cat.techs.map(tk => (
                        <div
                          key={tk}
                          draggable
                          onDragStart={() => setDraggedTech(tk)}
                          onDragEnd={() => setDraggedTech(null)}
                          className="group flex items-center gap-2 px-2 py-1.5 rounded text-xs text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 cursor-grab active:cursor-grabbing border border-transparent hover:border-zinc-800"
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                          <span className="truncate">{TECH[tk].label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 mt-4 mx-2 rounded border border-zinc-800 bg-zinc-900/50">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">How it works</div>
              <ol className="text-[11px] text-zinc-400 space-y-1.5 list-decimal ml-3">
                <li>Drag a tech onto canvas</li>
                <li>Click <Link2 className="w-3 h-3 inline" /> on a node, then click target to connect</li>
                <li>Tech-Stack change → file tree auto-updates</li>
                <li>Switch to <strong className="text-amber-400">File Tree</strong> tab</li>
              </ol>
            </div>
          </aside>
        )}

        {/* CENTER */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'canvas' && (
            <CanvasView
              canvasRef={canvasRef}
              nodes={nodes}
              edges={edges}
              selectedNodeId={selectedNodeId}
              connectingFrom={connectingFrom}
              onDrop={handleCanvasDrop}
              onDragOver={handleCanvasDragOver}
              onBgClick={() => { setSelectedNodeId(null); setConnectingFrom(null); }}
              onNodeMouseDown={startNodeDrag}
              onConnectClick={handleConnectClick}
              onDeleteNode={deleteNode}
              onDeleteEdge={deleteEdge}
              onSelectNode={setSelectedNodeId}
              draggingNodeId={draggingNodeId}
            />
          )}
          {activeTab === 'files' && (
            <FilesView
              nodes={nodes}
              tree={filteredTree}
              fullTree={globalTree}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
              filterNodeId={filterNodeId}
              setFilterNodeId={setFilterNodeId}
            />
          )}
          {activeTab === 'blueprint' && <BlueprintView nodes={nodes} edges={edges} goal={goal} specs={specs} totalFiles={totalFiles} />}
          {activeTab === 'stacks' && <StacksView />}
        </main>

        {/* RIGHT PROPERTIES PANEL */}
        {activeTab === 'canvas' && selectedNode && (
          <aside className="w-72 border-l border-zinc-800 bg-zinc-950 overflow-y-auto scrollbar">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Properties</h3>
                <p className="text-xs text-zinc-400 truncate">{selectedNode.label}</p>
              </div>
              <button onClick={() => setSelectedNodeId(null)} className="text-zinc-600 hover:text-zinc-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1.5">Label</label>
                <input
                  value={selectedNode.label}
                  onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-400 rounded px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1.5">Tech Stack</label>
                <select
                  value={selectedNode.tech}
                  onChange={(e) => updateNode(selectedNode.id, { tech: e.target.value, label: TECH[e.target.value].label })}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-400 rounded px-3 py-2 text-sm outline-none"
                >
                  {NODE_CATEGORIES.map(cat => (
                    <optgroup key={cat.id} label={cat.label}>
                      {cat.techs.map(t => (
                        <option key={t} value={t}>{TECH[t].label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <p className="text-[10px] text-zinc-500 mt-1.5">
                  Category: <span style={{ color: CAT_META[TECH[selectedNode.tech].category].color }}>{CAT_META[TECH[selectedNode.tech].category].label}</span>
                </p>
              </div>
              {TECH[selectedNode.tech].folder && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1.5">Auto-generated path</label>
                  <div className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-amber-400">
                    {TECH[selectedNode.tech].folder}/
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1.5">
                    {TECH[selectedNode.tech].tree ? countFiles(TECH[selectedNode.tech].tree) : 0} files generated for this node
                  </p>
                </div>
              )}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1.5">Connections</label>
                <div className="space-y-1">
                  {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map(e => {
                    const other = nodes.find(n => n.id === (e.from === selectedNode.id ? e.to : e.from));
                    if (!other) return null;
                    const isOut = e.from === selectedNode.id;
                    return (
                      <div key={e.id} className="flex items-center justify-between gap-2 bg-zinc-900 rounded px-2 py-1 text-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <ArrowRight className={`w-3 h-3 flex-shrink-0 ${isOut ? 'text-amber-400' : 'text-zinc-500 rotate-180'}`} />
                          <span className="truncate">{other.label}</span>
                        </div>
                        <button onClick={() => deleteEdge(e.id)} className="text-zinc-600 hover:text-rose-400">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                  {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length === 0 && (
                    <p className="text-[11px] text-zinc-600 italic">no connections yet</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => deleteNode(selectedNode.id)}
                className="w-full flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-950 border border-rose-900/50 hover:border-rose-700 text-rose-400 rounded px-3 py-2 text-xs transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> delete node
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* FOOTER STATUS */}
      <footer className="flex items-center justify-between px-6 py-1.5 border-t border-zinc-800 bg-zinc-950 text-[10px] text-zinc-600 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <CircleDot className="w-2.5 h-2.5 text-emerald-400" />
            live sync
          </span>
          {connectingFrom && <span className="text-amber-400">· connecting from {nodes.find(n => n.id === connectingFrom)?.label} — click target</span>}
        </div>
        <div className="flex items-center gap-3">
          <span>Monorepo · Turborepo</span>
          <span>·</span>
          <span>{nodes.length} services</span>
        </div>
      </footer>
    </div>
  );
}

// =============================================================================
// CANVAS VIEW
// =============================================================================
function CanvasView({ canvasRef, nodes, edges, selectedNodeId, connectingFrom, onDrop, onDragOver, onBgClick, onNodeMouseDown, onConnectClick, onDeleteNode, onDeleteEdge, onSelectNode, draggingNodeId }) {
  const getNode = (id) => nodes.find(n => n.id === id);

  const renderEdge = (e) => {
    const a = getNode(e.from); const b = getNode(e.to);
    if (!a || !b) return null;
    const x1 = a.x + 140; const y1 = a.y + 40;
    const x2 = b.x; const y2 = b.y + 40;
    const midX = (x1 + x2) / 2;
    const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    return (
      <g key={e.id} className="group">
        <path d={d} fill="none" stroke="#52525b" strokeWidth="1.5" />
        <path d={d} fill="none" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="4 4" className="edge-anim opacity-60" />
        <circle cx={x2} cy={y2} r="3" fill="#FFB800" />
        <foreignObject x={midX - 40} y={(y1 + y2) / 2 - 12} width="80" height="24">
          <div className="flex items-center justify-center pointer-events-auto">
            <button onClick={() => onDeleteEdge(e.id)} className="opacity-0 group-hover:opacity-100 text-[10px] px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-rose-400 hover:bg-rose-950">
              × edge
            </button>
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div
      ref={canvasRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onBgClick}
      className="flex-1 relative overflow-auto grid-bg bg-zinc-950 scrollbar"
      style={{ minHeight: 0 }}
    >
      {/* SVG Layer für Edges */}
      <svg className="absolute inset-0 pointer-events-none" width="3000" height="2000" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFB800" />
          </marker>
        </defs>
        <g style={{ pointerEvents: 'auto' }}>
          {edges.map(renderEdge)}
        </g>
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
        const tpl = TECH[node.tech];
        const cat = CAT_META[tpl.category];
        const Icon = cat.icon;
        const isSelected = selectedNodeId === node.id;
        const isConnecting = connectingFrom === node.id;
        return (
          <div
            key={node.id}
            onMouseDown={(e) => onNodeMouseDown(e, node)}
            onClick={(e) => { e.stopPropagation(); onSelectNode(node.id); }}
            className={`absolute select-none rounded-xl border-2 bg-zinc-900/90 backdrop-blur shadow-2xl transition ${
              isSelected ? 'border-amber-400 shadow-amber-500/20' : 'border-zinc-700 hover:border-zinc-500'
            } ${isConnecting ? 'pulse-ring' : ''} ${draggingNodeId === node.id ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ left: node.x, top: node.y, width: 140, zIndex: isSelected ? 10 : 2 }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800" style={{ background: `linear-gradient(90deg, ${cat.color}22 0%, transparent 100%)` }}>
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cat.color }} />
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 truncate">{cat.label}</span>
            </div>
            <div className="px-3 py-2">
              <div className="text-sm font-semibold text-zinc-100 truncate">{node.label}</div>
              <div className="text-[10px] text-zinc-500 truncate">{tpl.label}</div>
            </div>
            {tpl.folder && (
              <div className="px-3 pb-2">
                <div className="text-[10px] text-amber-400/80 font-mono flex items-center gap-1 truncate">
                  <Folder className="w-2.5 h-2.5 flex-shrink-0" />
                  {tpl.folder}/
                </div>
              </div>
            )}
            {/* Action buttons */}
            <div data-no-drag className="flex items-center justify-end gap-1 px-2 py-1 border-t border-zinc-800 bg-zinc-950/50 rounded-b-xl">
              <button
                onClick={(e) => { e.stopPropagation(); onConnectClick(node.id); }}
                className={`p-1 rounded hover:bg-zinc-800 ${isConnecting ? 'text-amber-400' : 'text-zinc-500 hover:text-amber-400'}`}
                title="connect"
              >
                <Link2 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteNode(node.id); }}
                className="p-1 rounded hover:bg-rose-950 text-zinc-500 hover:text-rose-400"
                title="delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Network className="w-12 h-12 text-zinc-800 mb-3" />
          <p className="text-zinc-500 text-sm">drag a node from the palette to begin</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// FILES VIEW
// =============================================================================
function FilesView({ nodes, tree, fullTree, expandedFolders, setExpandedFolders, filterNodeId, setFilterNodeId }) {
  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 overflow-y-auto scrollbar">
        <div className="p-4 border-b border-zinc-800">
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Filter</h3>
          <p className="text-xs text-zinc-400">per node or full monorepo</p>
        </div>
        <div className="p-2">
          <button
            onClick={() => setFilterNodeId(null)}
            className={`w-full text-left px-3 py-2 rounded text-xs mb-1 ${filterNodeId === null ? 'bg-amber-400 text-zinc-950 font-semibold' : 'text-zinc-400 hover:bg-zinc-900'}`}
          >
            📦 Full Monorepo ({countFiles(fullTree)} files)
          </button>
          {nodes.filter(n => TECH[n.tech].folder).map(n => {
            const tpl = TECH[n.tech];
            const cat = CAT_META[tpl.category];
            const count = tpl.tree ? countFiles(tpl.tree) : 0;
            return (
              <button
                key={n.id}
                onClick={() => setFilterNodeId(n.id)}
                className={`w-full text-left px-3 py-2 rounded text-xs mb-1 flex items-center gap-2 ${filterNodeId === n.id ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:bg-zinc-900'}`}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                <span className="truncate flex-1">{n.label}</span>
                <span className="text-[10px] text-zinc-600">{count}</span>
              </button>
            );
          })}
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto scrollbar bg-zinc-950 p-6">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-tight">
              {filterNodeId ? nodes.find(n => n.id === filterNodeId)?.label : 'Monorepo Structure'}
            </h2>
            <span className="text-xs text-zinc-500">auto-generated · {countFiles(tree)} files</span>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm scrollbar overflow-x-auto">
            <TreeRenderer tree={tree} expanded={expandedFolders} setExpanded={setExpandedFolders} path="" />
          </div>
          <p className="mt-4 text-xs text-zinc-500 italic">
            → every change in the canvas (add node, switch tech, remove) regenerates this tree consistently.
          </p>
        </div>
      </div>
    </div>
  );
}

function TreeRenderer({ tree, expanded, setExpanded, path, depth = 0 }) {
  const entries = Object.entries(tree).sort(([a], [b]) => {
    const aIsDir = a.endsWith('/'); const bIsDir = b.endsWith('/');
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });
  return (
    <div>
      {entries.map(([name, value]) => {
        const fullPath = path + name;
        const isDir = typeof value === 'object';
        const isExpanded = expanded[fullPath] !== false; // default open
        if (isDir) {
          return (
            <div key={name}>
              <button
                onClick={() => setExpanded(s => ({ ...s, [fullPath]: !isExpanded }))}
                className="flex items-center gap-1.5 hover:bg-zinc-800/50 rounded px-1 py-0.5 w-full text-left"
                style={{ paddingLeft: depth * 16 + 4 }}
              >
                {isExpanded ? <ChevronDown className="w-3 h-3 text-zinc-600" /> : <ChevronRight className="w-3 h-3 text-zinc-600" />}
                {isExpanded ? <FolderOpen className="w-3.5 h-3.5 text-amber-400" /> : <Folder className="w-3.5 h-3.5 text-amber-400/70" />}
                <span className="text-zinc-200">{name}</span>
              </button>
              {isExpanded && Object.keys(value).length > 0 && (
                <TreeRenderer tree={value} expanded={expanded} setExpanded={setExpanded} path={fullPath} depth={depth + 1} />
              )}
              {isExpanded && Object.keys(value).length === 0 && (
                <div className="text-[10px] text-zinc-600 italic" style={{ paddingLeft: (depth + 1) * 16 + 24 }}>
                  (empty — ready for code)
                </div>
              )}
            </div>
          );
        } else {
          const Icon = getFileIcon(name);
          return (
            <div
              key={name}
              className="flex items-center gap-1.5 px-1 py-0.5 hover:bg-zinc-800/50 rounded text-zinc-400"
              style={{ paddingLeft: depth * 16 + 22 }}
            >
              <Icon className="w-3.5 h-3.5 text-zinc-500" />
              <span>{name}</span>
            </div>
          );
        }
      })}
    </div>
  );
}

function treeToText(tree, depth = 0) {
  let out = '';
  const entries = Object.entries(tree).sort(([a], [b]) => {
    const aIsDir = a.endsWith('/'); const bIsDir = b.endsWith('/');
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });
  for (const [name, value] of entries) {
    out += '  '.repeat(depth) + (typeof value === 'object' ? '📁 ' : '📄 ') + name + '\n';
    if (typeof value === 'object') out += treeToText(value, depth + 1);
  }
  return out;
}

// =============================================================================
// BLUEPRINT VIEW (Summary)
// =============================================================================
function BlueprintView({ nodes, edges, goal, specs, totalFiles }) {
  const byCat = useMemo(() => {
    const map = {};
    for (const n of nodes) {
      const c = TECH[n.tech].category;
      if (!map[c]) map[c] = [];
      map[c].push(n);
    }
    return map;
  }, [nodes]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar bg-zinc-950 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-2">Architecture Blueprint</div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-none">
            System <span className="italic">Summary</span>
          </h1>
        </header>

        <section className="border-l-2 border-amber-400 pl-4">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Goal</div>
          <p className="text-zinc-200 leading-relaxed text-sm whitespace-pre-wrap">{goal || '— no goal defined —'}</p>
        </section>

        <section className="border-l-2 border-zinc-700 pl-4">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Constraints</div>
          <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap font-mono">{specs || '— none —'}</p>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">System Components · {nodes.length}</div>
          <div className="space-y-3">
            {NODE_CATEGORIES.filter(c => byCat[c.id]).map(cat => (
              <div key={cat.id} className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800" style={{ background: `${cat.color}11` }}>
                  <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                  <span className="text-xs uppercase tracking-widest font-bold" style={{ color: cat.color }}>{cat.label}</span>
                  <span className="text-[10px] text-zinc-500">· {byCat[cat.id].length}</span>
                </div>
                <div className="divide-y divide-zinc-800">
                  {byCat[cat.id].map(n => {
                    const tpl = TECH[n.tech];
                    return (
                      <div key={n.id} className="px-4 py-2 flex items-center justify-between text-sm">
                        <div>
                          <div className="text-zinc-200">{n.label}</div>
                          <div className="text-[11px] text-zinc-500">{tpl.label}</div>
                        </div>
                        {tpl.folder && (
                          <code className="text-[11px] text-amber-400/80">{tpl.folder}/</code>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Data Flow · {edges.length} connections</div>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 font-mono text-xs space-y-1">
            {edges.length === 0 && <p className="text-zinc-600 italic">no connections yet</p>}
            {edges.map(e => {
              const a = nodes.find(n => n.id === e.from);
              const b = nodes.find(n => n.id === e.to);
              if (!a || !b) return null;
              return (
                <div key={e.id} className="flex items-center gap-2 text-zinc-300">
                  <span className="text-zinc-500">{a.label}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  <span className="text-zinc-500">{b.label}</span>
                  {e.label && <span className="text-[10px] text-zinc-600 ml-2">· {e.label}</span>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Services" value={nodes.length} />
          <Stat label="Connections" value={edges.length} />
          <Stat label="Files scaffolded" value={totalFiles} />
          <Stat label="Distinct techs" value={new Set(nodes.map(n => n.tech)).size} />
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
      <div className="font-display text-3xl text-amber-400">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

// =============================================================================
// STACKS VIEW (Available tech library)
// =============================================================================
function StacksView() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar bg-zinc-950 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-2">Library</div>
          <h1 className="font-display text-4xl tracking-tight">Available <span className="italic">Tech Stacks</span></h1>
          <p className="text-sm text-zinc-400 mt-2">Jeder Stack kommt mit einer production-artigen Ordnerstruktur. Wähle einen Node im Canvas und wechsle den Stack — die Struktur passt sich automatisch an.</p>
        </header>
        <div className="space-y-6">
          {NODE_CATEGORIES.filter(c => c.id !== 'client').map(cat => (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-2">
                <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                <h3 className="text-xs uppercase tracking-widest font-bold" style={{ color: cat.color }}>{cat.label}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.techs.map(t => {
                  const tpl = TECH[t];
                  return (
                    <div key={t} className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-lg p-4 transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-zinc-100">{tpl.label}</div>
                          <code className="text-[11px] text-amber-400/80">{tpl.folder}/</code>
                        </div>
                        <span className="text-[10px] text-zinc-500">{tpl.tree ? countFiles(tpl.tree) : 0} files</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono bg-zinc-950 p-2 rounded max-h-32 overflow-auto scrollbar">
                        {tpl.tree ? Object.keys(tpl.tree).slice(0, 5).map(k => <div key={k}>{k}</div>) : <em>no scaffold</em>}
                        {tpl.tree && Object.keys(tpl.tree).length > 5 && <div className="text-zinc-700">...</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}