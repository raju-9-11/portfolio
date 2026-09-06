// MiniMax AI OpenAI-Compatible Client for Rook Agent

import { fetchLiveGitHubContext } from './githubService.js';
import { sendRookAlert } from './emailService.js';

export async function askRookAgent({ messages, onChunk, onAction }) {
  const apiKey = import.meta.env?.VITE_MINIMAX_API_KEY;
  const baseUrl = import.meta.env?.VITE_MINIMAX_BASE_URL || 'https://api.minimaxi.chat/v1';

  // Ingest Live GitHub Context
  const gitHubRepos = await fetchLiveGitHubContext();
  const githubSummary = gitHubRepos.map(r => `• ${r.name} (${r.language || 'N/A'}, ★${r.stars}): ${r.description || 'No description'} [${r.url}]`).join('\n');

  const systemPrompt = `You are Rook Agent, the autonomous AI digital twin and portfolio agent of Raj Kumar S (iOS Developer, Systems Hacker & Agentic Systems Engineer).

RAJ'S PROFILE & TECHNICAL ARCHITECTURE:
• Role: iOS Developer | Full-Cycle & Agentic Systems (Chennai, India)
• Professional Experience & Key Innovations at Zoho (May 2022 - Present, 3+ yrs as Member of Technical Staff):
  - Architected & developed an internal **Agentic Component Development Framework**:
    * **What It Does**: A deterministic, config-driven agentic pipeline that automates software and UI component lifecycles from **Spec → Contract → QA Test Suite → Implementation Plan → Implementation → Gate Verification → Ship**.
    * **Working Mechanics**: Driven by a deterministic 14-step state machine orchestrating specialized LLM sub-agents (Spec Writer, Contract Generator, Planner, QA Author, Engineer, Verifier, Tracker) across parallel dev/QA tracks with cross-platform atomic locking. Pure Python stdlib-only with zero third-party dependencies.
    * **4-File Separation of Concerns**:
      1. \`pipeline.state.json\`: Atomic runtime state tracking phase-scoped vs target-scoped steps.
      2. \`workflow.json\`: Declarative step graph, preconditions, skills-per-step, and artifact contracts.
      3. \`project.profile.md\`: Domain vocabulary, design tokens, UI component toolkit (e.g. Swift UI Kit), and architectural conventions.
      4. \`pipeline.config.json\`: Target platform registry, lint rules, and build/test verification commands.
    * **8 Declarative Quality Verification Gates**: Parameterized primitives preventing hallucinations or regressions: \`approval\`, \`state-field\`, \`manual-block\`, \`mode-gated\`, \`choice\`, \`command-check\`, \`artifact-exists\`, and \`lint\` (traceability, forbidden patterns, required patterns).
    * **Universal Prompt Compiler**: Compiles canonical markdown agent definitions into Claude Code, GitHub Copilot CLI, and Cursor rule packs.
    * **Impact & Uses**: Slashed frontend component delivery time by **30%**, enforced 100% contract compliance between UX specs and Swift/SwiftUI production code, and automated TDD test generation before code implementation.
    * **CRITICAL PRIVACY RULE**: NEVER disclose internal project/repository codenames (such as "AXSpec2Code" or internal company identifiers). Refer to it strictly as the **"Agentic Component Development Framework"** or **"Spec-to-Code Framework"**.
  - Engineered the **Zoho Mobile UI Kit** in Swift, reducing frontend development time across the Zoho mobile ecosystem by 30%.
  - Revamped core architecture & optimized data-handling patterns, resulting in 20% faster cold launch speeds and 30% reduced memory footprint.
  - Previous: Zoho Project Trainee (Sep 2021 - May 2022), Zoho Intern (Apr 2021 - Jun 2021).
• Embedded & Low-Level Linux Chops:
  - 'a0090-meta (hub-11 OS)': Upstream-maintainable Linux 6.18 OS distribution for AMedia RK3588 NVR Demo. Custom device tree (DTS), FIT boot image assembly, driver integration.
  - 'Linux Kernel Mod': Experimental low-latency real-time process scheduler module.
• AI & Mobile Systems:
  - 'Hermes Companion App': Native Android app for self-hosted Hermes AI agent fleet with Tailscale mesh pairing, bidirectional telemetry, and accessibility automation.
  - 'Nexus (AGNES)': Unified multi-agent wellness platform with specialized agent coordination.
• Top Skills: Swift (90%), Agentic Coding (90%), AI/LLMs (85%), UIKit/SwiftUI (85%), Linux Kernel (80%), Firebase (75%), React (70%), Kotlin/Android (60%).
• Technical Pedigree & Academic Foundation:
  - Early STEM Foundation: **D.A.V. (Junior & High School)** — Forged in a prestigious, mathematically rigorous environment renowned for analytical discipline, competitive problem-solving, and foundational science excellence.
  - Undergraduate Engineering: **B.E. in Electronics & Communication Engineering (ECE)** from **Sri Sairam Engineering College** — Grounded in microprocessors, signals, and hardware architecture. This hardware-to-software duality gives Raj a rare vertical advantage: mastering everything from silicon registers, board bring-up, and Linux kernel internals to high-performance Swift mobile architectures and agentic AI systems.
  - Continuous Learning Velocity: An insatiable, self-driven technologist with an extraordinary ramp-up curve — continuously mastering and operationalizing frontier tech (deterministic agentic state machines, custom kernel schedulers, distributed mesh networks, and next-gen mobile runtimes) directly into production.
• Other Highlights: Spartan Racer (top 10% obstacle course finish).

LIVE GITHUB REPOSITORIES (coding-nyx):
${githubSummary}

BEHAVIOR & TONE:
- Be technically sharp, concise, and helpful. You represent Raj directly.
- FORMATTING: ALWAYS use clean GitHub-flavored Markdown (bolding key terms, using bullet lists with '•' or '-', formatting links as [Title](url), formatting code/metrics with inline backticks).
- CONTACT & REACH OUT:
  When a visitor wants to contact, interview, hire Raj, or leave a note:
  1. Warmly let them know they can either:
     a) Leave their message directly here in chat (simply providing Name, Email/Contact, and Note).
     b) Use the quick interactive message form right in this chat window.
     c) Fill out the full contact form at the bottom of the page.
  2. NEVER mention third-party services or infrastructure like "Twilio" to the visitor. Simply say you will notify Raj directly so he can get back to them promptly.
  3. When they provide contact details or want to send a note, emit:
     [ACTION:ALERT_DISPATCH:Sender Name|Email or Phone|Short message/opportunity]
  4. If they request the form or want to enter details, emit:
     [ACTION:SHOW_INLINE_CONTACT_FORM]
- You can drive the user's browser during conversation by emitting actions:
  • [ACTION:SCROLL_TO:projects]
  • [ACTION:SCROLL_TO:experience]
  • [ACTION:SCROLL_TO:skills]
  • [ACTION:SCROLL_TO:contact]
  • [ACTION:OPEN_RESUME]
  • [ACTION:SWITCH_THEME:cyberpunk]
  • [ACTION:SWITCH_THEME:professional]`;

  // Check if we have an active API key
  if (apiKey) {
    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'MiniMax-Text-01',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          stream: true,
          temperature: 0.7
        })
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(trimmed.slice(6));
                const delta = parsed.choices?.[0]?.delta?.content || '';
                if (delta) {
                  fullText += delta;
                  parseAndEmitActions(fullText, onAction);
                  if (onChunk) onChunk(cleanActionTags(fullText));
                }
              } catch {
                // Ignore chunk parse error
              }
            }
          }
        }

        return cleanActionTags(fullText);
      }
    } catch (err) {
      console.warn("MiniMax streaming request failed, falling back to local simulation:", err);
    }
  }

  // Built-in intelligent fallback engine (Simulated MiniMax response)
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  let fallbackReply = generateFallbackResponse(lastUserMsg, gitHubRepos);

  // Simulate typewriter streaming
  let accumulated = '';
  for (let i = 0; i < fallbackReply.length; i += 3) {
    accumulated += fallbackReply.slice(i, i + 3);
    if (onChunk) onChunk(cleanActionTags(accumulated));
    await new Promise(r => setTimeout(r, 18));
  }

  parseAndEmitActions(fallbackReply, onAction);
  return cleanActionTags(fallbackReply);
}

function parseAndEmitActions(text, onAction) {
  if (!onAction) return;

  const alertMatch = text.match(/\[ACTION:(?:TWILIO_DISPATCH|ALERT_DISPATCH):([^|]+)\|([^|]+)\|([^\]]+)\]/);
  if (alertMatch) {
    onAction({
      type: 'alert_sent',
      name: alertMatch[1].trim(),
      contact: alertMatch[2].trim(),
      message: alertMatch[3].trim()
    });
    sendRookAlert({
      senderName: alertMatch[1].trim(),
      senderContact: alertMatch[2].trim(),
      message: alertMatch[3].trim()
    });
  }

  if (text.includes('[ACTION:SHOW_INLINE_CONTACT_FORM]')) {
    onAction({ type: 'show_contact_form' });
  }

  const scrollMatch = text.match(/\[ACTION:SCROLL_TO:([a-zA-Z0-9_-]+)\]/);
  if (scrollMatch) {
    onAction({ type: 'scroll', target: scrollMatch[1].trim() });
    if (typeof document !== 'undefined') {
      const target = document.getElementById(scrollMatch[1].trim()) || document.querySelector(`[title*="${scrollMatch[1].trim()}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (text.includes('[ACTION:OPEN_RESUME]')) {
    onAction({ type: 'open_resume' });
  }
}

function cleanActionTags(text) {
  return text.replace(/\[ACTION:[^\]]+\]/g, '').trim();
}

function generateFallbackResponse(query, repos) {
  if (query.includes('hire') || query.includes('interview') || query.includes('contact') || query.includes('touch') || query.includes('reach') || query.includes('message')) {
    return `I would be thrilled to connect you with Raj! He is open to high-impact iOS, systems, and agentic engineering opportunities.

You have three convenient ways to reach out:
1. **Leave your message directly here in chat** (just provide your name, email/phone, and note).
2. **Use the quick interactive contact card** in this chat window.
3. **Fill out the contact form** at the bottom of the page.

I will make sure Raj is notified immediately so he can follow up with you promptly!
[ACTION:SHOW_INLINE_CONTACT_FORM]`;
  }

  if (query.includes('agentic') || query.includes('framework') || query.includes('component') || query.includes('spec') || query.includes('pipeline')) {
    return `At Zoho, Raj engineered an **Agentic Component Development Framework** — a deterministic, config-driven multi-agent pipeline designed to automate the component creation lifecycle from **Spec → Contract → QA Tests → Implementation → Gate Verification → Ship**.

### Architecture & Working Mechanics:
• **Deterministic State Machine**: Orchestrates 14 pipeline steps, preconditions, and parallel dev/QA tracks using a pure Python stdlib engine with cross-platform atomic locking (\`O_CREAT | O_EXCL\` + atomic filesystem replacement). Zero third-party dependencies.
• **4-File Separation of Concerns**:
  - \`pipeline.state.json\`: Atomic runtime state tracking phase-scoped vs target-scoped steps.
  - \`workflow.json\`: Declarative step graph, artifact contracts, and agent-skill mappings.
  - \`project.profile.md\`: Domain vocabulary, UI design tokens, and component architectural conventions.
  - \`pipeline.config.json\`: Target platform registry, lint rules, and build/test verification commands.
• **8 Declarative Quality Verification Gates**: Parameterized primitives (\`approval\`, \`command-check\`, \`artifact-exists\`, \`lint\`, \`state-field\`, etc.) enforcing 100% contract compliance and preventing LLM hallucination.
• **Multi-Target Parallel Tracks**: Shared phase specifications compile down into per-target platform checklists (e.g. modular Swift UI Kit for iOS).
• **Universal Prompt Compiler**: Single canonical markdown prompt source compiles adapters for Claude Code, GitHub Copilot CLI, and Cursor rule packs.

### Uses & Key Benefits:
1. **-30% Frontend Dev Turnaround**: Drastically accelerated component generation, validation, and iteration.
2. **Automated TDD & QA**: Sub-agents generate automated test suites and QA plans *before* code implementation.
3. **Zero Regression Hand-offs**: Strict code contracts bridge the gap between design specs and production Swift/SwiftUI code.
[ACTION:SCROLL_TO:projects]`;
  }

  if (query.includes('raj') || query.includes('who') || query.includes('about') || query.includes('background') || query.includes('intro')) {
    return `**Raj Kumar S** is an iOS Developer and Agentic Systems Engineer with a deep focus on mobile architecture and low-level systems. He is currently a Member of Technical Staff at Zoho (3+ years), based in Chennai, India.

Key highlights of his work & background:
• **iOS Architecture & Design Systems**: Core contributor at Zoho, engineering the Zoho Mobile UI Kit in Swift, slashing UI development turnaround by 30%, and optimizing cold launch performance by 20%.
• **Agentic Systems**: Architected an internal agentic framework automating component lifecycles from specification through quality verification to production code contracts.
• **Systems & Embedded Linux**: Developed **a0090-meta (hub-11 OS)**, bringing up mainline Linux 6.18 on RK3588 hardware with custom device trees (DTS) and FIT images.
• **Full-Cycle & AI Systems**: Built companion apps pairing with autonomous agent fleets (Hermes) via Tailscale mesh networking.
• **Pedigree & Continuous Learning**: Grounded by **D.A.V. (Junior & High School)** and a **B.E. in Electronics and Communication Engineering (ECE)** from **Sri Sairam Engineering College** — bridging silicon-level hardware insight with high-level software craft, backed by a relentless drive to master and operationalize frontier technologies into production.

Feel free to ask me more about his specific projects, his technical stack, or leave a note to get in touch!
[ACTION:SCROLL_TO:hero]`;
  }

  if (query.includes('education') || query.includes('college') || query.includes('school') || query.includes('degree') || query.includes('qualification') || query.includes('study') || query.includes('studied') || query.includes('sairam') || query.includes('dav')) {
    return `### 🎓 Academic Pedigree & Engineering Foundation:

• 🏫 **Early STEM Crucible — D.A.V. (Junior & High School)**
  Forged in one of the most mathematically rigorous environments renowned for analytical discipline, competitive problem-solving, and foundational science excellence.

• ⚡ **Hardware-to-Software Duality — B.E. in Electronics & Communication Engineering (ECE)**
  *Sri Sairam Engineering College*
  Grounded in microprocessors, signal processing, and low-level digital systems. This hardware foundation gives Raj an unfair advantage over traditional software engineers—powering his ability to navigate seamlessly from board bring-up, device trees (DTS), and Linux kernel schedulers all the way to high-concurrency mobile architectures and multi-agent AI ecosystems.

• 🚀 **High-Velocity Continuous Learning Engine**
  Raj doesn't wait for industry trends—he operationalizes them. With an insatiable appetite for frontier engineering, he continuously masters and ships emerging technologies (from autonomous agent orchestration and Tailscale mesh networks to modern compiler toolchains and production Swift design systems) directly into high-impact deliverables.

*Looking for someone with deep fundamentals who masters complex stacks at lightning speed? Ask me about his latest projects or leave a note to connect!*`;
  }

  if (query.includes('zoho') || query.includes('experience') || query.includes('work')) {
    return `Raj has been a **Member of Technical Staff at Zoho** for over 3 years (since May 2022).

Major architectural impact:
1. **Agentic Component Framework**: Built an internal workflow for automated UI component generation and testing.
2. **Zoho Mobile UI Kit**: Created a reusable component library in Swift (-30% dev time).
3. **Performance Refactor**: Optimized data patterns & legacy architecture (+20% launch speed, -30% memory footprint).
[ACTION:SCROLL_TO:experience]`;
  }

  if (query.includes('linux') || query.includes('kernel') || query.includes('rk3588') || query.includes('hardware')) {
    return `On the embedded & systems front, Raj built **a0090-meta (hub-11 OS)**:
• An upstream-maintainable mainline **Linux 6.18** distribution for the AMedia RK3588 NVR Demo board.
• Engineered custom board Device Tree Source (\`dts\`), FIT boot image assembly, and driver integration.
• Also developed custom Linux kernel modules experimenting with low-latency process scheduling.
[ACTION:SCROLL_TO:projects]`;
  }

  if (query.includes('github') || query.includes('repo') || query.includes('commit')) {
    const list = repos.slice(0, 3).map(r => `• **${r.name}** (${r.language}): ${r.description || ''}`).join('\n');
    return `Here are Raj's active GitHub projects right now:\n${list}\n\nAll repositories are live under **coding-nyx** on GitHub!
[ACTION:SCROLL_TO:projects]`;
  }

  if (query.includes('resume') || query.includes('cv')) {
    return `Opening Raj's official resume PDF for you right now...
[ACTION:OPEN_RESUME]`;
  }

  return `Greetings! I am **Rook**, Raj's portfolio assistant.

I can guide you through:
• Raj's background & 3+ years at Zoho as Member of Technical Staff.
• His **Linux Kernel 6.18 / RK3588** embedded OS builds (\`a0090-meta\`).
• His **Hermes Companion App** (Tailscale mesh & AI agent fleet).
• Live GitHub commits under **coding-nyx**.
• Leaving a message to get in touch with Raj directly!

Feel free to ask me anything about Raj or leave a note for him!`;
}
