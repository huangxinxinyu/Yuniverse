import type { BlogPost } from '../../data/types'

export const xCreatorsWorthFollowing = {
  slug: 'x-creators-worth-following',
  title: '我在 X 上关注的 AI 博主：九个值得关注的人',
  date: '2026-11-03',
  excerpt:
    '整理网站收藏页时翻了一遍自己的 X 关注列表，挑出九个个人账号：做研究的、一线写代码的、中文圈做信息搬运和访谈的。',
  en: {
    title: 'AI People I Follow on X: Nine Accounts Worth Following',
    excerpt:
      'While building the collection page on this site, I went through my X following list and picked nine personal accounts: researchers, hands-on builders, and Chinese-language creators.',
    aiDisclosure:
      'Written with AI help. The list comes from my own X following list; the descriptions are based on each account’s public bio and well-known public work.',
  },
  aiDisclosure:
    '本文在 AI 协助下完成。名单来自我自己的 X 关注列表，每个人的介绍基于他们的公开简介和公开作品。',
  content: [
    '给网站的收藏页加“博主”这一栏时，我回头翻了一遍自己的 X 关注列表。大约三十个关注里，有十来个是公司和项目的官方号：OpenAI、Anthropic、Google DeepMind、Hugging Face、Mistral，还有 TypeScript 这类技术项目。',
    '官方号的作用是发布消息：新模型、新功能、新论文。但真正能帮我形成判断的，基本都是个人账号。他们会说一个东西为什么重要、自己用下来哪里不行、下一步可能往哪走。所以这篇只挑个人。',
    '我按三类分：做研究、讲原理的；每天在一线写代码、做产品的；以及中文圈做翻译、访谈和内容的。',
    '## 研究和原理',
    '- [Andrej Karpathy](https://x.com/karpathy)：OpenAI 早期成员，做过 Tesla 的 AI 负责人。他最难得的是能把 LLM 从原理一路讲到你自己能写出来的代码，nanoGPT 和他的视频课都是这个风格。“vibe coding”这个词也是他提出来的。\n- [Bojie Li 李博杰](https://x.com/bojie_li)：研究交互式 Agent 系统。他写的《深入理解 AI Agent：设计原理与工程实践》开源在 GitHub 上，用“Agent = LLM + 上下文 + 工具”这个公式把整本书串起来，还配了大量实验。这本书现在也在我的收藏书架上。',
    '## 一线构建者',
    '- [dex](https://x.com/dexhorthy)：HumanLayer 的创始人，写过 12-Factor Agents，也是最早系统讲“上下文工程”的人之一。做 Agent 产品的人很值得看他怎么拆上下文和人机协作。\n- [Peter Steinberger](https://x.com/steipete)：PSPDFKit 的创始人，退休后回来折腾 AI，做了 OpenClaw，现在在 OpenAI。他会高频分享自己怎么用 coding agent 干活，是很好的一线样本。\n- [yetone](https://x.com/yetone)：avante.nvim 的作者，一直在做 AI 产品的独立开发者，能看到一个人怎么从想法做到上线。\n- [Matt Pocock](https://x.com/mattpocockuk)：Total TypeScript 的作者，以前在 Vercel，现在也在做 AI Hero，教开发者怎么用 AI 写代码。讲东西非常清楚。',
    '## 中文圈',
    '- [宝玉](https://x.com/dotey)：长期翻译和解读英文圈的 AI 文章、论文和提示词。英文信息看不过来的时候，他是很稳定的中文入口。\n- [月球大叔](https://x.com/uncle_moon_x)：在硅谷采访 100 个有意思的人，长访谈，适合了解行业里具体的人在想什么。\n- [数字生命卡兹克](https://x.com/Khazix0918)：中文 AI 内容创作者，新工具出来上手很快，适合跟进产品层面的变化。',
    '## 怎么用这份名单',
    '如果只关注三个，我会选 Karpathy、dex 和宝玉：一个讲原理，一个讲 Agent 工程，一个帮你把英文圈的信息搬过来。剩下的按你在做的方向挑。',
    '这份名单之后也会在网站的收藏页“博主”一栏里更新。',
  ],
  readingMinutes: 4,
  category: 'taste',
  topic: 'ai-tools',
  tags: ['X', 'AI', 'Agent', '推荐'],
  status: 'published',
} satisfies BlogPost
