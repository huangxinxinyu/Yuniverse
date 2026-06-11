import type { BlogPost } from '../../data/types'
import { agentDataFlywheelObservabilitySeo } from './agent-data-flywheel-observability-seo'
import { codexLegendaryDriverContextNoise } from './codex-legendary-driver-context-noise'
import { codexLegendaryDriverSkillWorkflows } from './codex-legendary-driver-skill-workflows'
import { helloWorld } from './hello-world'
import { internshipAgentInfrastructureNotes } from './internship-agent-infrastructure-notes'
import { internshipDaytonaAgentWorkspace } from './internship-daytona-agent-workspace'
import { internshipInviteBackendFlow } from './internship-invite-backend-flow'
import { internshipStripePaymentBackendFlow } from './internship-stripe-payment-backend-flow'
import { multicaLocalAgentWorkflow } from './multica-local-agent-workflow'
import { obsidianCodexAiKnowledgeBase } from './obsidian-codex-ai-knowledge-base'

export const blogPosts: readonly [BlogPost, ...BlogPost[]] = [
  codexLegendaryDriverContextNoise,
  codexLegendaryDriverSkillWorkflows,
  internshipDaytonaAgentWorkspace,
  obsidianCodexAiKnowledgeBase,
  agentDataFlywheelObservabilitySeo,
  internshipInviteBackendFlow,
  internshipStripePaymentBackendFlow,
  multicaLocalAgentWorkflow,
  internshipAgentInfrastructureNotes,
  helloWorld,
]
