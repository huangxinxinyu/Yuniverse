export const portfolioData = {
  en: {
    name: "Xinyu Huang",
    title: [
      "Incoming ECE M.S. Student at UC San Diego",
      "B.E. Honours (Software) Graduate from the University of Sydney"
    ],
    description: "Welcome to Yuniverse: a small map of where I am, what I build, and the taste that keeps me moving.",
    nav: {
      identity: "Home",
      journey: "Journey",
      hub: "Navigate",
      work: "Work",
      projects: "Projects",
      blog: "Blog",
      shelf: "Shelf",
      moments: "Moments"
    },
    sitePages: [
      { path: "/", key: "home", title: "Yuniverse", description: "A quiet entrance." },
      { path: "/journey", key: "journey", title: "Journey", description: "A loose timeline." },
      { path: "/work", key: "work", title: "Work", description: "Selected signals." },
      { path: "/blog", key: "blog", title: "Blog", description: "Notes and drafts." },
      { path: "/collection", key: "collection", title: "Collection", description: "Things worth keeping." }
    ],
    sectionOrder: ["identity", "journey", "hub", "work", "projects", "blog", "shelf", "moments"],
    identity: {
      title: "Current Orbit",
      eyebrow: "Identity snapshot",
      lead: "I am Xinyu, an incoming UC San Diego ECE M.S. student and software engineer building toward backend systems, AI agent infrastructure, and reliable products.",
      cards: [
        { label: "Now", value: "Incoming UCSD ECE M.S. student" },
        { label: "Focus", value: "Backend systems and AI agent infrastructure" },
        { label: "Research", value: "Embodied AI, robotics, and LLM-controlled systems" },
        { label: "Off-screen", value: "Gym, Neo-Soul, Funk, and films" }
      ]
    },
    journey: {
      title: "Journey",
      items: [
        { period: "Sydney", title: "Software Engineering foundation", text: "Studied Software Engineering at the University of Sydney and built a foundation in systems, product thinking, and engineering discipline." },
        { period: "Research", title: "Embedded AI and robotics", text: "Worked on embodied AI research and became interested in how intelligent systems behave when software meets the physical world." },
        { period: "Internships", title: "Backend and AI agent infrastructure", text: "Moved from backend systems into AI agent infrastructure, focusing on reliable execution, orchestration, and product-facing systems." },
        { period: "Next", title: "UC San Diego ECE", text: "Preparing for graduate study at UCSD while continuing to build practical systems and explore AI infrastructure." }
      ]
    },
    hub: {
      title: "Find Your Path",
      items: [
        { label: "Journey", path: "/journey", description: "Trajectory, school orbit, and research direction" },
        { label: "Work", path: "/work", description: "Experience and selected engineering projects" },
        { label: "Blog", path: "/blog", description: "Learning notes and life logs" },
        { label: "Collection", path: "/collection", description: "Music, films, and personal fragments" },
        { label: "Resume", href: "/resume-en.pdf", description: "Full resume PDF" },
        { label: "Contact", href: "mailto:xinyuhimself@mgmail.com", description: "Email me directly" }
      ]
    },
    blog: {
      title: "Mission Log",
      intro: "A lightweight blog shelf for learning notes, life updates, and experiments. These are starter logs until the real writing grows in.",
      filters: [
        { id: "all", label: "All" },
        { id: "study", label: "Study" },
        { id: "life", label: "Life" },
        { id: "build", label: "Build" }
      ],
      entries: [
        {
          id: "ucsd-prep",
          category: "study",
          date: "2026.05",
          title: "Preparing for the next academic orbit",
          summary: "Graduate school prep, systems fundamentals, and the questions I want to carry into UC San Diego.",
          signal: "Study log"
        },
        {
          id: "agent-infra",
          category: "build",
          date: "2026.05",
          title: "Notes from building agent infrastructure",
          summary: "Small observations about orchestration, runtime state, and making agent systems feel reliable instead of magical.",
          signal: "Build log"
        },
        {
          id: "life-shelf",
          category: "life",
          date: "Soon",
          title: "A life log outside the resume",
          summary: "A placeholder for gym notes, music discoveries, film fragments, and campus life once the archive has real material.",
          signal: "Life log"
        }
      ]
    },
    shelf: {
      title: "Shelf",
      intro: "A small shelf for taste, not a complete archive.",
      groups: [
        { title: "Music", items: ["Neo-Soul", "Funk", "albums with groove and warmth"] },
        { title: "Films", items: ["films with rhythm, style, and human texture"] }
      ]
    },
    moments: {
      title: "Moments",
      intro: "A growing space for photos, places, and small fragments from life outside the resume.",
      items: ["Campus life", "Travel", "Gym", "Concerts", "Everyday scenes"]
    },
    about: {
      title: "About Me",
      content: [
        "Hello and welcome to Yuniverse. My name is Xinyu, and this space is my digital universe. The name is a nod to 'The Social Network' - simpler, cleaner, and it just sounds right.",
        "I will be pursuing an M.S. in Electrical and Computer Engineering at UC San Diego after completing my undergraduate degree in Software Engineering at the University of Sydney.",
        "After exploring various fields, I've found my passion in backend development and AI agent systems. I get a great sense of accomplishment from designing clean APIs and ensuring every component of a system runs elegantly and robustly.",
        "I believe that truly effective solutions are born from a deep understanding of user needs. This principle guides my work, where I often blend creative thinking with engineering discipline to build products that solve real-world problems.",
        "I did my thesis in Embedded AI research with my advisor. Learning how robotics work is pretty cool.",
        "Outside of tech, I'm usually at the gym, or listening to music and watching movies. I'll probably add my music and movie collection to this page in the future. I listen to Neo-Soul and Funk a lot."
      ]
    },
    experience: {
      title: "Experience",
      items: [
        {
          id: 1,
          title: "AI Agent Infra Developer Intern",
          company: "Foodism",
          period: "Apr 2026 - Present",
          description: [
            "Contributed to the core architecture of Foodism Agent OS by wrapping a unified agent execution engine on top of the Claude Agent SDK, supporting streaming conversations, multi-turn session resume, MCP tool orchestration, sub-agent dispatch, and LiteLLM routing.",
            "Designed a skill-driven dynamic agent loading mechanism that parses metadata, triggers, MCP tools, and skill dependencies from Markdown Frontmatter, enabling runtime agent scanning and capability-based dispatch.",
            "Built asynchronous sub-agent scheduling with worker pools, a runtime job queue, and deliverable state transitions, enabling non-blocking background task dispatch with real-time frontend status updates.",
            "Implemented delayed, recurring, and manually triggered task execution flows, connecting task status, notification feedback, and sub-agent execution chains.",
            "Improved persistence and observability by adding runtime directories for sub-agent memory, task plans, and conversation transcripts, preserving tool calls, LLM provider requests, and execution latency.",
            "Participated in Agent OS deployment architecture on cloud sandbox environments such as Daytona, improving runtime isolation, data persistence, dependency management, stability, and recovery."
          ],
          tech: ["Claude Agent SDK", "MCP", "LiteLLM", "Agent OS", "Daytona"]
        },
        {
          id: 2,
          title: "Backend Developer Intern",
          company: "时氪砹",
          period: "Mar 2026 - Apr 2026",
          description: [
            "Developed an AI Agent for question generation with LangGraph-based workflows.",
            "Designed semantic splitting for long-form text with asynchronous processing and caching.",
            "Implemented MCP integration for real-time exam trend updates and deployed the AgentCore module."
          ],
          tech: ["LangGraph", "Python", "MCP", "Redis"]
        },
        {
          id: 3,
          title: "Embedded Software Intern",
          company: "Bose",
          period: "Jul 2025 - Aug 2025",
          description: [
            "Developed and debugged low-level software for audio devices on resource-constrained microcontrollers."
          ],
          tech: ["C", "STM32", "Keil"]
        },
        {
          id: 4,
          title: "Backend Developer Intern",
          company: "Software Engineering Lab, Zhejiang University",
          period: "Dec 2023 - Jan 2024",
          description: [
            "Contributed to the development of dynamic database query functionalities for graph-based systems."
          ],
          tech: ["Python", "Neo4j", "Cypher"]
        }
      ]
    },
    projects: {
      title: "Projects",
      items: [
        {
          id: 1,
          title: "JavaQuiz",
          description: [
            "Built a Java interview practice platform with AI evaluation powered by the Doubao API.",
            "Designed a microservices architecture with RocketMQ for asynchronous communication.",
            "Implemented SMS login with Aliyun, JWT + Redis token management, ThreadLocal user context isolation, and Redis caching for hot questions with distributed locks."
          ],
          tech: ["Spring Boot", "MySQL", "Redis", "RocketMQ", "AI"],
          github: "https://github.com/huangxinxinyu/JavaQuiz",
          demo: "#"
        },
        {
          id: 2,
          title: "E-Commerce Platform",
          description: [
            "Built a scalable microservices e-commerce system with DDD architecture.",
            "Handled seckill anti-oversell with Redis distributed locks, Lua atomic stock deduction, and a database unique-index fallback.",
            "Implemented one-order-per-user protection with user-level optimistic locking and Redis deduplication.",
            "Used gateway rate limiting, cache shielding, and asynchronous MQ peak shaving for traffic control.",
            "Integrated Dubbo RPC with circuit breaking, service degradation, order timeout callbacks, payment idempotency, and RocketMQ transaction messages for eventual consistency."
          ],
          tech: ["Spring Boot", "Redis", "RocketMQ", "Dubbo", "MySQL", "DDD"],
          github: "https://github.com/huangxinxinyu/eCommerce",
          demo: "#"
        },
        {
          id: 3,
          title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
          description: [
            "Wrote a survey discussing the taxonomy of attack vectors, defense mechanisms, and open challenges for LLM-controlled robotics."
          ],
          tech: ["Embodied AI", "LLM", "Jailbreaking", "Defense"],
          github: "https://arxiv.org/abs/2601.02377",
          demo: "#"
        }
      ]
    },
    social: {
      email: "xinyuhimself@mgmail.com",
      linkedin: "https://www.linkedin.com/in/xinyu-huang-36b43723a/",
      github: "https://github.com/huangxinxinyu",
      wechat: "#"
    },
    resume: {
      href: "/resume-en.pdf",
      label: "View Full Resume"
    },
    ui: {
      themeToggle: "Toggle Theme",
      langToggle: "中文",
      contactAction: "Contact",
      missionLabel: "Yuniverse Personal Mission",
      flightStatus: "Frontend-only archive",
      signalLabel: "Signal",
      signalValue: "Orbiting backend systems, agent infra, and life logs"
    }
  },
  zh: {
    name: "黄新宇",
    title: [
      "即将赴 UCSD 攻读 ECE 硕士",
      "悉尼大学软件工程荣誉工程学士"
    ],
    description: "欢迎来到 Yuniverse：这里记录我现在的位置、正在构建的东西，以及让我保持流动的 taste。",
    nav: {
      identity: "主页",
      journey: "轨迹",
      hub: "导航",
      work: "工作",
      projects: "项目",
      blog: "日志",
      shelf: "收藏",
      moments: "瞬间"
    },
    sitePages: [
      { path: "/", key: "home", title: "Yuniverse", description: "一个安静入口。" },
      { path: "/journey", key: "journey", title: "轨迹", description: "松散时间线。" },
      { path: "/work", key: "work", title: "工作", description: "一些技术信号。" },
      { path: "/blog", key: "blog", title: "日志", description: "笔记和草稿。" },
      { path: "/collection", key: "collection", title: "收藏", description: "值得留下的东西。" }
    ],
    sectionOrder: ["identity", "journey", "hub", "work", "projects", "blog", "shelf", "moments"],
    identity: {
      title: "当前轨道",
      eyebrow: "个人状态速写",
      lead: "我是新宇，即将赴 UC San Diego 攻读 ECE 硕士，也是一名专注后端系统、AI Agent 基础设施和可靠产品的 software engineer。",
      cards: [
        { label: "现在", value: "即将赴 UCSD 攻读 ECE 硕士" },
        { label: "关注", value: "后端系统与 AI Agent 基础设施" },
        { label: "研究", value: "Embodied AI、机器人与 LLM 控制系统" },
        { label: "生活", value: "健身、Neo-Soul、Funk 和电影" }
      ]
    },
    journey: {
      title: "人生轨迹",
      items: [
        { period: "Sydney", title: "软件工程基础", text: "在悉尼大学完成软件工程学习，建立了系统设计、产品理解和工程纪律的基础。" },
        { period: "Research", title: "嵌入式 AI 与机器人", text: "毕业设计接触 embodied AI 研究，也开始关注智能系统进入真实物理环境后的行为与安全问题。" },
        { period: "Internships", title: "后端与 AI Agent 基础设施", text: "从后端系统逐步走向 AI Agent Infra，关注可靠执行、任务编排和面向产品的工程系统。" },
        { period: "Next", title: "UC San Diego ECE", text: "即将赴 UCSD 读研，同时继续构建实际系统并探索 AI 基础设施方向。" }
      ]
    },
    hub: {
      title: "你可以从这里开始",
      items: [
        { label: "轨迹", path: "/journey", description: "成长路径、学校轨道和研究方向" },
        { label: "工作", path: "/work", description: "经历与精选工程项目" },
        { label: "日志", path: "/blog", description: "学习笔记与生活记录" },
        { label: "收藏", path: "/collection", description: "音乐、电影和生活碎片" },
        { label: "简历", href: "/resume-zh.pdf", description: "完整 PDF 简历" },
        { label: "联系", href: "mailto:xinyuhimself@mgmail.com", description: "直接邮件联系" }
      ]
    },
    blog: {
      title: "任务日志",
      intro: "这里会放学习笔记、生活更新和一些实验记录。当前先用种子内容占位，之后可以逐渐长成真正的日志。",
      filters: [
        { id: "all", label: "全部" },
        { id: "study", label: "学习" },
        { id: "life", label: "生活" },
        { id: "build", label: "构建" }
      ],
      entries: [
        {
          id: "ucsd-prep",
          category: "study",
          date: "2026.05",
          title: "进入下一段学术轨道前",
          summary: "关于读研准备、系统基础，以及我想带去 UC San Diego 的一些问题。",
          signal: "学习日志"
        },
        {
          id: "agent-infra",
          category: "build",
          date: "2026.05",
          title: "构建 Agent Infra 的一些笔记",
          summary: "关于任务编排、运行时状态，以及如何让 Agent 系统显得可靠而不是玄学的一些观察。",
          signal: "构建日志"
        },
        {
          id: "life-shelf",
          category: "life",
          date: "Soon",
          title: "简历之外的生活记录",
          summary: "为健身、音乐发现、电影片段和校园生活预留的占位日志，等真实内容慢慢填上。",
          signal: "生活日志"
        }
      ]
    },
    shelf: {
      title: "收藏",
      intro: "这里不是完整档案，更像一个关于 taste 的小架子。",
      groups: [
        { title: "音乐", items: ["Neo-Soul", "Funk", "有律动和温度的专辑"] },
        { title: "电影", items: ["有节奏、风格和人味的电影"] }
      ]
    },
    moments: {
      title: "瞬间",
      intro: "留给照片、地点和简历之外生活碎片的生长空间。",
      items: ["校园生活", "旅行", "健身", "演出", "日常画面"]
    },
    about: {
      title: "关于我",
      content: [
        "你好，欢迎来到 Yuniverse。我叫新宇，这里是我的数字宇宙。这个名字有点像《社交网络》里的那句“drop the the, just Facebook”：更简单，也更顺口。",
        "我即将赴加州大学圣地亚哥分校攻读 Electrical and Computer Engineering 硕士，本科毕业于悉尼大学软件工程荣誉工程学士项目。",
        "我做过不同方向的尝试，目前更确定自己对后端开发和 AI Agent 系统感兴趣。设计清晰的 API，并让系统的每个环节稳定、优雅地运行，会给我很大的成就感。",
        "我专注于理解需求并解决问题，也喜欢把有创造力的想法落到工程实现里，构建真正能解决用户问题的产品。",
        "毕业设计和导师做嵌入式 AI 领域的研究，主要是关于 Embodied AI 的攻防，能学到机器人的发展还是挺酷的。",
        "平时健身、听音乐、看电影比较多。之后可能会把我的音乐和电影收藏也加到这里。我很喜欢 Neo-Soul 和 Funk。"
      ]
    },
    experience: {
      title: "工作经历",
      items: [
        {
          id: 1,
          title: "AI Agent Infra 开发实习生",
          company: "食物主义",
          period: "2026.04 - 至今",
          description: [
            "参与 Foodism Agent OS 核心架构开发，基于 Claude Agent SDK 封装统一 Agent 执行引擎，支持流式对话、多轮 session resume、MCP 工具编排、子 Agent 调度与 LiteLLM 路由。",
            "设计 Skill 驱动的 Agent 动态加载机制，基于 Markdown Frontmatter 解析 Agent 元数据、触发条件、MCP 工具与 Skill 依赖，支持运行时扫描与按需 capability dispatch。",
            "落地异步 sub-agent 任务调度，引入 worker 池、runtime job queue 与 deliverable 状态流转，实现 Leader Agent 非阻塞派发后台任务，并支持前端实时展示任务状态。",
            "设计延时、周期与手动触发等多种异步任务执行模式，打通任务状态、通知反馈与子 Agent 执行链路。",
            "优化 Agent 执行链路的持久化与可观测性，为 sub-agent 增加 memory、task_plan、conversations transcript 运行时目录，沉淀工具调用、LLM provider 请求与执行耗时。",
            "参与 Agent OS 在 Daytona 等云端沙箱环境下的部署架构设计，优化运行时隔离、数据持久化、依赖管理、服务稳定性与恢复能力。"
          ],
          tech: ["Claude Agent SDK", "MCP", "LiteLLM", "Agent OS", "Daytona"]
        },
        {
          id: 2,
          title: "后端开发实习生",
          company: "时氪砹",
          period: "2026.03 - 2026.04",
          description: [
            "参与题目生成 AI Agent 核心开发，基于 LangGraph 搭建工作流。",
            "设计长文本语义拆分方案，结合异步处理与缓存策略提升处理效率。",
            "基于 MCP 实现考试热点实时更新，并完成 AgentCore 核心模块部署落地。"
          ],
          tech: ["LangGraph", "Python", "MCP", "Redis"]
        },
        {
          id: 3,
          title: "嵌入式软件开发实习生",
          company: "Bose",
          period: "2025.07 - 2025.08",
          description: [
            "为资源受限的微控制器音频设备开发并调试底层软件。"
          ],
          tech: ["C", "STM32", "Keil"]
        },
        {
          id: 4,
          title: "后端开发实习生",
          company: "浙江大学软件工程实验室",
          period: "2023.12 - 2024.01",
          description: [
            "参与图数据库系统动态查询功能开发。"
          ],
          tech: ["Python", "Neo4j", "Cypher"]
        }
      ]
    },
    projects: {
      title: "个人项目",
      items: [
        {
          id: 1,
          title: "JavaQuiz",
          description: [
            "面向 Java 面试场景搭建问答练习平台，集成豆包 AI 接口提供专业评价。",
            "采用微服务架构与 RocketMQ 实现异步通信。",
            "实现阿里云短信登录、JWT + Redis 令牌管理、ThreadLocal 用户上下文隔离，以及 Redis 热点题库缓存与分布式锁。"
          ],
          tech: ["Spring Boot", "MySQL", "Redis", "RocketMQ", "AI"],
          github: "https://github.com/huangxinxinyu/JavaQuiz",
          demo: "#"
        },
        {
          id: 2,
          title: "电商平台",
          description: [
            "基于 DDD 架构设计可拓展的微服务电商系统。",
            "秒杀防超卖：使用 Redis 分布式锁、Lua 脚本原子扣减库存，并结合数据库唯一索引兜底。",
            "一人一单：通过用户维度乐观锁与 Redis 去重实现双重校验。",
            "流量治理：使用网关限流、缓存屏障与异步 MQ 削峰处理高并发流量。",
            "高可用链路：集成 Dubbo RPC、服务降级与熔断、订单超时回调、支付幂等处理和 RocketMQ 事务消息，保证最终一致性。"
          ],
          tech: ["Spring Boot", "Redis", "RocketMQ", "Dubbo", "MySQL", "DDD"],
          github: "https://github.com/huangxinxinyu/eCommerce",
          demo: "#"
        },
        {
          id: 3,
          title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
          description: [
            "撰写关于 LLM 驱动机器人攻击向量、防御机制与开放挑战的综述。"
          ],
          tech: ["Embodied AI", "LLM", "Jailbreaking", "Defense"],
          github: "https://arxiv.org/abs/2601.02377",
          demo: "#"
        }
      ]
    },
    social: {
      email: "xinyuhimself@mgmail.com",
      linkedin: "https://www.linkedin.com/in/xinyu-huang-36b43723a/",
      github: "https://github.com/huangxinxinyu",
      wechat: "#"
    },
    resume: {
      href: "/resume-zh.pdf",
      label: "查看完整简历"
    },
    ui: {
      themeToggle: "切换主题",
      langToggle: "EN",
      contactAction: "联系",
      missionLabel: "Yuniverse 个人任务档案",
      flightStatus: "纯前端静态档案",
      signalLabel: "信号",
      signalValue: "围绕后端系统、Agent Infra 与生活日志运行"
    }
  }
};
