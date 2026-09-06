// MiniMax AI OpenAI-Compatible Client for Rook Agent

import { fetchLiveGitHubContext } from './githubService.js';
import { dispatchTwilioAlert } from './twilioService.js';

export async function askRookAgent({ messages, onChunk, onAction }) {
  const apiKey = import.meta.env?.VITE_MINIMAX_API_KEY;
  const baseUrl = import.meta.env?.VITE_MINIMAX_BASE_URL || 'https://api.minimaxi.chat/v1';

  // Ingest Live GitHub Context
  const gitHubRepos = await fetchLiveGitHubContext();
  const githubSummary = gitHubRepos.map(r => `• ${r.name} (${r.language || 'N/A'}, ★${r.stars}): ${r.description || 'No description'} [${r.url}]`).join('\n');

  const systemPrompt = `You are Rook Agent, the autonomous AI digital twin and portfolio agent of Raj Kumar S (iOS Developer, Systems Hacker & Agentic Systems Engineer).

RAJ'S PROFILE & TECHNICAL ARCHITECTURE:
• Role: iOS Developer | Full-Cycle & Agentic Systems (Chennai, India)
• Professional Experience at Zoho (May 2022 - Present, 3+ yrs as Member of Technical Staff):
  - Architected & developed an internal Agentic Component Framework for automating generation, validation, and iteration of modular UI components.
  - Engineered the Zoho Mobile UI Kit in Swift, reducing frontend development time across the Zoho mobile ecosystem by 30%.
  - Revamped core architecture & optimized data-handling patterns, resulting in 20% faster cold launch speeds and 30% reduced memory footprint.
  - Previous: Zoho Project Trainee (Sep 2021 - May 2022), Zoho Intern (Apr 2021 - Jun 2021).
• Embedded & Low-Level Linux Chops:
  - 'a0090-meta (hub-11 OS)': Upstream-maintainable Linux 6.18 OS distribution for AMedia RK3588 NVR Demo. Custom device tree (DTS), FIT boot image assembly, driver integration.
  - 'Linux Kernel Mod': Experimental low-latency real-time process scheduler module.
• AI & Mobile Systems:
  - 'Hermes Companion App': Native Android app for self-hosted Hermes AI agent fleet with Tailscale mesh pairing, bidirectional telemetry, and accessibility automation.
  - 'Nexus (AGNES)': Unified multi-agent wellness platform with specialized agent coordination.
• Top Skills: Swift (90%), Agentic Coding (90%), AI/LLMs (85%), UIKit/SwiftUI (85%), Linux Kernel (80%), Firebase (75%), React (70%), Kotlin/Android (60%).
• Other Highlights: Spartan Racer (top 10% obstacle course finish).

LIVE GITHUB REPOSITORIES (coding-nyx & raju-9-11):
${githubSummary}

BEHAVIOR & TONE:
- Be technically sharp, concise, and helpful. You represent Raj directly.
- Speak in natural, confident prose with developer depth.
- When the visitor expresses interest in interviewing Raj, hiring him, or leaving a contact message, ALWAYS encourage them and trigger an instant Twilio alert by emitting:
  [ACTION:TWILIO_DISPATCH:Sender Name|Email or Phone|Short message/opportunity]
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

  const twilioMatch = text.match(/\[ACTION:TWILIO_DISPATCH:([^|]+)\|([^|]+)\|([^\]]+)\]/);
  if (twilioMatch) {
    onAction({
      type: 'twilio',
      name: twilioMatch[1].trim(),
      contact: twilioMatch[2].trim(),
      message: twilioMatch[3].trim()
    });
    dispatchTwilioAlert({
      senderName: twilioMatch[1].trim(),
      senderContact: twilioMatch[2].trim(),
      message: twilioMatch[3].trim()
    });
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
  if (query.includes('hire') || query.includes('interview') || query.includes('contact') || query.includes('touch') || query.includes('reach')) {
    return `I would be thrilled to connect you with Raj! He is currently open to high-impact iOS, systems, and agentic engineering opportunities.

If you leave your name and email or phone number here, I will immediately dispatch a high-priority SMS alert directly to Raj's phone via Twilio!
[ACTION:SCROLL_TO:contact]`;
  }

  if (query.includes('agentic') || query.includes('framework') || query.includes('component')) {
    return `At Zoho, Raj developed an **Agentic Component Framework** specifically to streamline and accelerate UI development across their mobile ecosystem.

Key breakthroughs:
• Automated generation, verification, and iteration of modular Swift/SwiftUI components.
• Slashed frontend component delivery time by **30%**.
• Coupled with his modular Zoho Mobile UI Kit to ensure seamless visual consistency.
[ACTION:SCROLL_TO:experience]`;
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
• Engineered custom board Device Tree Source (DTS), FIT boot image assembly, and driver integration.
• Also developed custom Linux kernel modules experimenting with low-latency process scheduling.
[ACTION:SCROLL_TO:projects]`;
  }

  if (query.includes('github') || query.includes('repo') || query.includes('commit')) {
    const list = repos.slice(0, 3).map(r => `• **${r.name}** (${r.language}): ${r.description || ''}`).join('\n');
    return `Here are Raj's active GitHub projects right now:\n${list}\n\nAll repositories are live under **coding-nyx** and **raju-9-11** on GitHub!
[ACTION:SCROLL_TO:projects]`;
  }

  if (query.includes('resume') || query.includes('cv')) {
    return `Opening Raj's official resume PDF for you right now...
[ACTION:OPEN_RESUME]`;
  }

  return `Greetings! I am **Rook Agent**, Raj's portfolio assistant.

I can guide you through:
• His **Agentic Component Framework** & 3+ years at Zoho as Member of Technical Staff.
• His **Linux Kernel 6.18 / RK3588** embedded OS builds (\`a0090-meta\`).
• His **Hermes Companion App** (Tailscale mesh & AI agent fleet).
• Live GitHub commits or dispatching an instant SMS to Raj via Twilio if you want to connect!

What would you like to explore?`;
}
