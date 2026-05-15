import type { BlogPost } from '../../data/types'
import { helloWorld } from './hello-world'
import { internshipAgentInfrastructureNotes } from './internship-agent-infrastructure-notes'
import { multicaLocalAgentWorkflow } from './multica-local-agent-workflow'

export const blogPosts: readonly [BlogPost, ...BlogPost[]] = [
  multicaLocalAgentWorkflow,
  internshipAgentInfrastructureNotes,
  helloWorld,
]
