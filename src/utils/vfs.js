// In-Memory Virtual File System (VFS) for Portfolio Shell

export const VFS = {
  type: 'dir',
  children: {
    'bio.txt': {
      type: 'file',
      content: `Raj Kumar S
Role: iOS Developer | Full-Cycle & Agentic Systems
Location: Chennai, India
Experience: 3+ years at Zoho (Member of Technical Staff)
Core Stack: Swift, SwiftUI, UIKit, Agentic Coding, AI/LLMs, Linux Kernel, Kotlin, React`
    },
    'resume.pdf': {
      type: 'file',
      action: 'open_resume',
      content: `[FILE: resume.pdf] Type 'open resume' or click the Identity File button to view the official PDF.`
    },
    'projects': {
      type: 'dir',
      children: {
        'hermes-companion.md': {
          type: 'file',
          content: `# Hermes Companion App [Active]
Native Android companion application for self-hosted Hermes Agent fleet.
Features: Device pairing via Tailscale mesh, bidirectional control, accessibility automation, and real-time chat.
Tech: Android, Kotlin, Jetpack Compose, Tailscale, AI Agents
Repo: https://github.com/coding-nyx/hermes-companion-app`
        },
        'a0090-meta.md': {
          type: 'file',
          content: `# a0090-meta (hub-11 OS) [Active]
Upstream-maintainable Linux OS distribution for the AMedia RK3588 NVR Demo (hub-11).
Features: Mainline Linux 6.18, custom board DTS, FIT boot image assembly, and driver integration.
Tech: Linux Kernel, RK3588, Device Tree, C, Armbian
Repo: https://github.com/coding-nyx/a0090-meta`
        },
        'nexus.md': {
          type: 'file',
          content: `# Nexus (AGNES) [In Progress]
Unified, multi-agent AI wellness platform with specialized agents and E2EE for holistic stability.
Tech: LLM, React, React Native, Firebase, RAG`
        },
        'fitpro-connect.md': {
          type: 'file',
          content: `# FitPro Connect [In Progress]
Comprehensive platform empowering fitness trainers to manage classes, showcase portfolios, and connect with clients.
Tech: React, Firebase, Stripe`
        },
        'linux-kernel-mod.md': {
          type: 'file',
          content: `# Linux Kernel Mod [Experimental]
Custom kernel module experimenting with process scheduling algorithms for low-latency tasks.
Tech: C, Linux, Make`
        }
      }
    },
    'experience': {
      type: 'dir',
      children: {
        'zoho-mts.log': {
          type: 'file',
          content: `[LOG: Zoho - Member of Technical Staff (May 2022 - Present)]
- Engineered Zoho Mobile UI Kit: Reusable component library in Swift, cutting frontend dev time by 30%.
- Agentic Component Framework: Built automated agentic development workflow for rapid component generation & iteration.
- Core Modules Revamp: Led module design from UI/UX wireframing to API integration.
- Performance Overhaul: Refactored legacy code yielding 20% app launch speedup and reduced memory overhead.`
        },
        'zoho-trainee.log': {
          type: 'file',
          content: `[LOG: Zoho - Project Trainee (Sep 2021 - May 2022)]
Collaborated with mobile team on core architectural patterns and feature enhancements.`
        },
        'servion.log': {
          type: 'file',
          content: `[LOG: Servion Global Solutions - Intern (Nov 2019 - Dec 2019)]
Enterprise software solutions and team collaboration.`
        }
      }
    },
    'skills': {
      type: 'dir',
      children: {
        'mobile.txt': {
          type: 'file',
          content: `MOBILE SKILLS:
- Swift: 90%
- SwiftUI: 85%
- UIKit: 85%
- Kotlin: 60%
- Android: 60%
- React Native: 30%`
        },
        'ai-agentic.txt': {
          type: 'file',
          content: `AI & AGENTIC CODING:
- Agentic Coding: 90% (Fleet orchestration, tool calling, autonomous workflows)
- AI / LLMs: 85% (OpenAI API, MiniMax, Gemini, RAG pipelines, local inference)`
        },
        'systems.txt': {
          type: 'file',
          content: `SYSTEMS & BACKEND:
- Linux: 80% (RK3588, Device Trees, Kernel modules, U-Boot, Armbian)
- Firebase: 75%
- React: 70%
- Java: 65%`
        }
      }
    },
    'system': {
      type: 'dir',
      children: {
        'rk3588.dts': {
          type: 'file',
          content: `/dts-v1/;
/plugin/;
&pci3 {
    status = "okay";
    num-lanes = <4>;
    reset-gpios = <&gpio3 RK_PD1 GPIO_ACTIVE_HIGH>;
};
&npu {
    status = "okay";
    operating-points-v2 = <&npu_opp_table>;
};`
        },
        'scheduler.c': {
          type: 'file',
          content: `// Low-latency process priority hook
static void update_curr_rt_lowlat(struct rq *rq) {
    struct task_struct *curr = rq->curr;
    if (curr->policy == SCHED_RR || curr->policy == SCHED_FIFO) {
        trace_sched_lowlat_eval(curr->pid, curr->rt_priority);
    }
}`
        }
      }
    }
  }
};

// Path resolution helper
export function normalizePath(currentPath, inputPath) {
  if (!inputPath || inputPath === '.') return currentPath;
  let parts = inputPath.startsWith('/') ? inputPath.split('/') : `${currentPath}/${inputPath}`.split('/');
  const resolved = [];

  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(part);
    }
  }

  return '/' + resolved.join('/');
}

// Get node at resolved path
export function getNode(path) {
  if (path === '/' || path === '') return VFS;
  const parts = path.split('/').filter(Boolean);
  let current = VFS;

  for (const part of parts) {
    if (!current || current.type !== 'dir' || !current.children || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }

  return current;
}

// Get path completions for tab completion
export function getCompletions(currentPath, partial) {
  let searchDir = currentPath;
  let prefix = partial;

  if (partial.includes('/')) {
    const lastSlash = partial.lastIndexOf('/');
    const dirPart = partial.slice(0, lastSlash);
    prefix = partial.slice(lastSlash + 1);
    searchDir = normalizePath(currentPath, dirPart || '/');
  }

  const node = getNode(searchDir);
  if (!node || node.type !== 'dir') return [];

  return Object.keys(node.children)
    .filter(name => name.startsWith(prefix))
    .map(name => {
      const isDir = node.children[name].type === 'dir';
      const full = partial.includes('/')
        ? partial.slice(0, partial.lastIndexOf('/') + 1) + name + (isDir ? '/' : '')
        : name + (isDir ? '/' : '');
      return full;
    });
}
