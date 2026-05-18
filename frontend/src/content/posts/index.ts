import type { BlogPost } from '../../data/types'
import { helloWorld } from './hello-world'
import { internshipAgentInfrastructureNotes } from './internship-agent-infrastructure-notes'
import { internshipInviteBackendFlow } from './internship-invite-backend-flow'
import { internshipStripePaymentBackendFlow } from './internship-stripe-payment-backend-flow'
import { multicaLocalAgentWorkflow } from './multica-local-agent-workflow'

export const blogPosts: readonly [BlogPost, ...BlogPost[]] = [
  internshipInviteBackendFlow,
  internshipStripePaymentBackendFlow,
  multicaLocalAgentWorkflow,
  internshipAgentInfrastructureNotes,
  helloWorld,
]
