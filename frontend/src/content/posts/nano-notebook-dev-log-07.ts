import type { BlogPost } from '../../data/types'

export const nanoNotebookDevLog07 = {
  slug: 'nano-notebook-dev-log-07',
  title: 'nano-notebook 开发日志 07：Prompt 版本控制，让 Agent 定义和运行现场都能复现',
  date: '2026-08-07',
  excerpt:
    '第七篇聊一个很小但很关键的板块：prompt 不能写死在 Go 代码里。nano-notebook 用文件做 Prompt Catalog 和 Agent Definition Catalog，把 identity、version、hash、prompt、模型策略、工具清单绑在一起，让一次 Run 能精确对应到当时用过的 Agent 定义。',
  content: [
    '这一篇很短，但它是 Agent Runtime 里容易被低估的一块：版本。前面几篇讲了可恢复、Trace、Replay、工具和权限，如果 prompt、Agent Definition、工具清单散落在代码里，前面那些能力最终都少一个坐标：这次 Run 到底是在哪个版本下跑的。',
    '先说我遇到的问题。最直接的写法是把 system prompt 写成 Go 里的一个字符串常量，或者在代码里拼一段 Markdown。单个 demo 没问题，一旦 Agent 上线，它会立刻带来三件事：',
    '- prompt 和代码强耦合，改 prompt 也要改代码、发版，review 时看到的经常不是“prompt 改了什么”，而是整段代码 diff。\n- 每次改完只能靠 Replay 一条条跑，再人工比较，因为没有一个稳定版本号可以批量归因。\n- Agent 行为不只是 prompt，还有工具清单、模型策略、contract、limits。只给 prompt 加一个版本号，仍然复现不了完整 Agent。',
    'nano-notebook 的做法是：把 Agent 行为拆成文件，每个文件都有 `identity + version`，再让运行数据引用版本，而不是引用文本。',
    '## Prompt Catalog：prompt 是文件，不是字符串',
    'Prompt 放在 `internal/promptcatalog/prompts/*.md`，每个文件用 front matter 声明 `identity`、`version`、`contract`，正文才是 prompt 内容。比如 `agent.chat-composer-grounded.v3.md` 的开头就是：',
    '```markdown\n---\nidentity: agent.chat-composer-grounded\nversion: 3\ncontract: grounded_final_draft_text.v1\n---\n```',
    '`go:embed` 只负责把这些文件打包进 binary，真正做版本的是 Catalog：加载时 canonicalize 内容、计算 SHA-256、拒绝重复版本和 hash conflict，也禁止 `latest` 这类可变 selector。也就是说，代码里不会出现“用最新 prompt”这种无法复现的写法。',
    '## Agent Definition Catalog：prompt、工具、模型策略一起定版本',
    '`internal/agentcatalog/definitions/chat.leader.v3.json` 不复制 prompt 内容，只引用 `agent.leader-router@1`、`agent.chat-composer-bare@2`、`agent.chat-composer-grounded@3`，再声明 model policy、contract、tools、children 和 limits。release manifest `nano.default@4` 再把每个产品入口 pin 到具体 definition。',
    'Catalog 加载时用 strict JSON decode，unknown field 直接失败；所有 reference 必须解析到已存在版本；文件名也必须和 `identity + version` 一致。这样“prompt 版本”就不是一个孤立字符串，而是 Agent Definition 的一个坐标。`chat.leader@3` 要复现，就包含这三个 prompt 版本、model policy、工具 allowlist、子 Agent 和预算。改工具或改 prompt 都会产生新的 definition version / release，而不是在代码里静默覆盖。',
    '## 记录版本之后，Replay 才有坐标',
    '真正把文件版本变成运行时可复现能力的，是 Trace 和 Replay 都记录版本引用。Run 创建时写 `nano.run.prompt_version`；每次模型调用在 Trace 里写 `nano.prompt.identity/version/sha256/contract`，并记录 model request hash。Replay 再保存归一化后的 `model_request`、`model_decision`、`action_input`、`action_result`，每个 payload 都有 schema version 和 SHA-256。',
    '所以拿到一个 Trace，可以先看 prompt hash，再回 Catalog 找到当时那个文件版本；如果要复现某一次失败，也可以按 release manifest、definition hash 和工具 hash，把当时的 Agent 定义重新拼出来，而不是去 git log 里猜是哪一版 prompt。',
    '这也改变 Replay 的用法：不是每次改完 prompt 都人肉比较，而是先能精确区分“这次变化影响谁”，再用固定 dataset 做回归。旧版本不会因为新版本上线就丢失身份，线上所有用旧 prompt 的 Run 仍然能按 hash 查询和回放。',
    '## 几个边界',
    '也要说清楚 nano-notebook 没有做什么。prompt 和 definition 是 Git-owned 文件，通过 `go:embed` 打进 binary，不是运行时从配置中心拉取；`go:embed` 在这里只是打包方式，版本载体仍然是文件。Catalog 也刻意禁止 `latest`、模板、继承、环境变量插值，因为可复现性和这些便利是冲突的。工具执行能力仍在 Go Executor/Registry 里做 code-level ceiling，Definition 只能收窄，不能凭空增加权限。',
    '一句话总结：prompt 版本控制不是把字符串换个地方存，而是让 Agent 的每个行为输入都有 identity、hash 和引用关系。Run 只要记录这些引用，前面所有 Trace/Replay 能力就都能回答同一个问题：这个结果是在哪个 Agent 定义下产生的。',
    '## 源码锚点',
    '- [internal/promptcatalog/catalog.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/promptcatalog/catalog.go)\n- [internal/promptcatalog/prompts/agent.chat-composer-grounded.v3.md](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/promptcatalog/prompts/agent.chat-composer-grounded.v3.md)\n- [internal/agentcatalog/catalog.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agentcatalog/catalog.go)\n- [internal/agentcatalog/definitions/chat.leader.v3.json](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agentcatalog/definitions/chat.leader.v3.json)\n- [internal/agentcatalog/releases/nano.default.v4.json](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agentcatalog/releases/nano.default.v4.json)\n- [internal/agent/prompt_bindings.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agent/prompt_bindings.go)\n- [internal/agent/run_trace_admission.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agent/run_trace_admission.go)\n- [internal/agent/trace_semconv.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agent/trace_semconv.go)\n- [internal/agent/instrumentation_adapters.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agent/instrumentation_adapters.go)\n- [internal/agent/mcp_tool_plane.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/agent/mcp_tool_plane.go)\n- [internal/replay/payload.go](https://github.com/huangxinxinyu/nano-notebook/blob/main/internal/replay/payload.go)\n- [docs/technical-architecture/adr/0045-migrate-all-agents-to-an-embedded-definition-catalog.md](https://github.com/huangxinxinyu/nano-notebook/blob/main/docs/technical-architecture/adr/0045-migrate-all-agents-to-an-embedded-definition-catalog.md)',
  ],
  aiDisclosure:
    '本文由 AI 协助整理表达，技术决策、实现与源码锚点来自 nano-notebook 仓库的 prompt catalog、agent catalog、trace/replay 与 ADR 0045。',
  readingMinutes: 4,
  category: 'software',
  topic: 'agent-architecture',
  series: 'nano-notebook-dev-log',
  tags: ['nano-notebook', 'Prompt', 'Versioning', 'Agent Definition', 'Replay', 'Go'],
  status: 'published',
} satisfies BlogPost
