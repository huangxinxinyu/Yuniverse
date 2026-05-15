import type { BlogPost } from '../../data/types'

export const internshipAgentInfrastructureNotes = {
  slug: 'internship-agent-infrastructure-notes',
  title: '实习记录：做 AI Agent Infrastructure 的阶段小结',
  date: '2026-05-15',
  excerpt:
    '这篇先简单记录实习中参与 AI Agent 开发和基础设施搭建的一些阶段性工作。',
  content: [
    '最近在实习中主要参与 AI Agent 相关开发，业务方向和本地生活商户的运营扶持有关，希望通过 Agent 帮助商户更高效地理解经营情况、完成运营动作，并逐步沉淀可复用的智能化能力。',
    '我目前主要负责的是 Agent Infrastructure。相比直接做某一个具体的 Agent 功能，我的工作更多集中在底层链路、观测、成本分析、实验评估和性能优化上。',
    '其中一部分工作是把模型的思考过程和执行过程做成可观测日志。我们基于 Claude Agent SDK 自带的 OpenTelemetry，把模型调用、工具调用、MCP 入参、span 耗时等信息接入后端，并按用户和 conversation_id 做分析。这样可以比较清楚地看到一次对话中 token 是怎么消耗的、工具是怎么被调用的、各个环节分别花了多少时间。',
    '后端链路上，项目使用 LiteLLM 作为模型网关。我做了一些简单的队列和入库逻辑，把相关 transaction 写入数据库，并补充了用户查询接口。查询侧会按 group 聚合每个 action 的 token 用量，方便后续做成本拆解、行为分析和定价参考。基于这些数据，也参考 Manus 以及一些 Agent 产品的形态，做过一版定价建议。',
    '除此之外，我还做了一些工程实验。主要是在不同环节对比模型表现、输出质量和性能差异，帮助判断哪些地方适合用更强的模型，哪些地方可以用更轻量的方案。后面也针对 leader agent 做了一轮性能优化，砍掉了很多它其实不需要知道的工具，减少上下文负担，让它在执行任务时更加聚焦。',
    '这一阶段的工作整体比较偏基础设施：不是直接做一个单点功能，而是在搭建 Agent 系统长期运行所需要的观测、分析、成本控制和性能优化能力。很多细节后面可以单独拆开写，比如 OpenTelemetry 怎么接入、token 成本怎么统计、LiteLLM 网关怎么配合后端链路、leader agent 为什么需要裁剪工具集等等。',
    '这篇先作为一个简单记录。后面每隔一段时间再继续补，把实习期间做过的事情慢慢整理完整。',
  ],
  aiDisclosure: '本文由 AI 协助整理表达，内容来自个人实习记录。',
  readingMinutes: 3,
  category: 'software',
  tags: ['实习记录', 'Agent', 'Vibe Coding'],
  status: 'published',
} satisfies BlogPost
