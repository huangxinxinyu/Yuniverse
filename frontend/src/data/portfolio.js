export const portfolioData = {
  en: {
    name: "Xinyu Huang",
    title: "Incoming ECE M.S. Student at UC San Diego | B.E. Honours (Software) Graduate from the University of Sydney",
    description: "I am a software engineer focused on building robust backend systems and AI agent infrastructure. I thrive on turning complex requirements into reliable, high-performance systems.",
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects"
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
            "Designed and implemented a skill-driven dynamic agent loading mechanism that parses agent metadata, trigger conditions, MCP tools, and skill dependencies from Markdown Frontmatter, enabling uploaded agents to be scanned at runtime and dispatched by capability on demand.",
            "Designed and delivered asynchronous sub-agent task scheduling with worker pools, a runtime job queue, and deliverable state transitions, enabling the Leader Agent to dispatch background tasks non-blockingly while the frontend displays pending, running, completed, and failed states in real time.",
            "Built an asynchronous scheduling system supporting delayed, recurring, and manually triggered execution modes, connecting task status, notification feedback, and sub-agent execution flows.",
            "Improved persistence and observability across the agent execution pipeline by adding runtime directories for sub-agent memory, task plans, and conversation transcripts, preserving session-level plans, tool call logs, LLM provider requests, and execution latency for stronger traceability and fault tolerance.",
            "Participated in the deployment architecture design of Agent OS on cloud sandbox environments such as Daytona, improving runtime isolation, data persistence, dependency management, service stability, and recovery capability."
          ],
          tech: ["Claude Agent SDK", "MCP", "LiteLLM", "Agent OS", "Daytona"]
        },
        {
          id: 2,
          title: "Backend Developer Intern",
          company: "时氪砹",
          period: "Dec 2025 - Apr 2026",
          description: "Developed AI Agent for question generation using LangGraph; designed semantic text splitting with async processing and caching; implemented MCP for real-time exam trends; deployed AgentCore module.",
          tech: ["LangGraph", "Python", "MCP", "Redis"]
        },
        {
          id: 3,
          title: "Backend Developer Intern",
          company: "Software Engineering Lab, Zhejiang University",
          period: "Dec 2023 - Jan 2024",
          description: "Contributed to the development of dynamic database query functionalities for graph-based systems.",
          tech: ["Python", "Neo4j", "Cypher"]
        },
        {
          id: 4,
          title: "Embedded Software Intern",
          company: "Bose",
          period: "Jul 2025 - Aug 2025",
          description: "Developed and debugged low-level software for audio devices on resource-constrained microcontrollers.",
          tech: ["C", "STM32", "Keil"]
        }
      ]
    },
    projects: {
      title: "Projects",
      items: [
        {
          id: 1,
          title: "JavaQuiz",
          description: "A Java interview practice platform with AI evaluation powered by Doubao API. Features microservices architecture with RocketMQ for async communication; SMS login via Aliyun with JWT + Redis token management; ThreadLocal for user context isolation; Redis caching for hot questions with distributed locks.",
          tech: ["Spring Boot", "MySQL", "Redis", "RocketMQ", "AI"],
          github: "https://github.com/huangxinxinyu/JavaQuiz",
          demo: "#"
        },
        {
          id: 2,
          title: "E-Commerce Platform",
          description: "Scalable microservices e-commerce system with DDD architecture.\n\n- Seckill anti-oversell: Redis distributed lock + Lua atomic stock deduction, with DB unique index as fallback\n- One-per-user: User-dimension optimistic lock + Redis deduplication double-check\n- Traffic shunting: Gateway rate limiting + cache shields 99% read requests, async MQ for peak shaving\n- Service communication: Dubbo RPC with circuit breaker and service degradation\n- High availability: Order timeout callback + payment idempotency; RocketMQ transaction message ensures eventual consistency",
          tech: ["Spring Boot", "Redis", "RocketMQ", "Dubbo", "MySQL", "DDD"],
          github: "https://github.com/huangxinxinyu/eCommerce",
          demo: "#"
        },
        {
          id: 3,
          title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
          description: "A survey discussing a comprehensive taxonomy of attack vectors and defense mechanisms for LLM-controlled robotics.",
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
    ui: {
      themeToggle: "Toggle Theme",
      langToggle: "中文"
    }
  },
  zh: {
    name: "黄新宇",
    title: "即将赴 UCSD 攻读 ECE 硕士 | 悉尼大学软件工程荣誉工程学士",
    description: "我专注于构建稳定的后端系统与 AI Agent 基础设施，擅长将复杂需求转化为可靠、高性能的工程系统。",
    nav: {
      about: "关于",
      experience: "经历",
      projects: "项目"
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
            "设计并实现 Skill 驱动的 Agent 动态加载机制，基于 Markdown Frontmatter 解析 Agent 元数据、触发条件、MCP 工具与 Skill 依赖，支持上传 Agent 自动纳入运行时扫描及按需 capability dispatch。",
            "设计并落地异步 sub-agent 任务调度机制，引入 worker 池、runtime job queue 与 deliverable 状态流转，实现 Leader Agent 非阻塞派发后台任务，并支持前端实时展示 pending、running、completed、failed 状态。",
            "设计异步任务调度体系，支持延时、周期与手动触发等多种执行模式，并打通任务状态、通知反馈与子 Agent 执行链路。",
            "优化 Agent 执行链路的持久化与可观测性，为 sub-agent 增加 memory、task_plan、conversations transcript 运行时目录结构，沉淀会话级任务计划、工具调用记录、LLM provider 请求与执行耗时，增强系统可追踪性与容错能力。",
            "参与 Agent OS 在 Daytona 等云端沙箱环境下的部署架构设计，优化运行时环境隔离、数据持久化与 Agent 执行依赖管理，提升服务稳定性与恢复能力。"
          ],
          tech: ["Claude Agent SDK", "MCP", "LiteLLM", "Agent OS", "Daytona"]
        },
        {
          id: 2,
          title: "后端开发实习生",
          company: "时氪砹",
          period: "2025.12 - 2026.04",
          description: "参与题目生成 AI Agent 核心开发，基于 LangGraph 搭建工作流；设计长文本语义拆分方案，结合异步处理与缓存策略；基于 MCP 实现考试热点实时更新；完成 AgentCore 核心模块部署落地。",
          tech: ["LangGraph", "Python", "MCP", "Redis"]
        },
        {
          id: 3,
          title: "后端开发实习生",
          company: "浙江大学软件工程实验室",
          period: "2023.12 - 2024.01",
          description: "参与图数据库系统动态查询功能开发。",
          tech: ["Python", "Neo4j", "Cypher"]
        },
        {
          id: 4,
          title: "嵌入式软件开发实习生",
          company: "Bose",
          period: "2025.07 - 2025.08",
          description: "为资源受限的微控制器音频设备开发并调试底层软件。",
          tech: ["C", "STM32", "Keil"]
        }
      ]
    },
    projects: {
      title: "个人项目",
      items: [
        {
          id: 1,
          title: "JavaQuiz",
          description: "面向 Java 面试场景的问答练习平台，集成豆包 AI 接口提供专业评价。采用微服务架构与 RocketMQ 异步通信；阿里云短信登录与 JWT + Redis 令牌管理；ThreadLocal 用户上下文隔离；Redis 缓存热点题库与分布式锁。",
          tech: ["Spring Boot", "MySQL", "Redis", "RocketMQ", "AI"],
          github: "https://github.com/huangxinxinyu/JavaQuiz",
          demo: "#"
        },
        {
          id: 2,
          title: "电商平台",
          description: "可拓展微服务电商系统，采用 DDD 架构设计。\n\n- 秒杀防超卖：Redis 分布式锁 + Lua 脚本原子扣减库存，结合数据库唯一索引兜底\n- 一人一单：用户维度乐观锁 + Redis 去重双重校验\n- 流量分流：网关限流，异步 MQ 削峰处理\n- 服务通信：Dubbo RPC 调用，服务降级与熔断保护\n- 高可用：订单超时回调 + 支付幂等性处理，RocketMQ 事务消息确保最终一致性",
          tech: ["Spring Boot", "Redis", "RocketMQ", "Dubbo", "MySQL", "DDD"],
          github: "https://github.com/huangxinxinyu/eCommerce",
          demo: "#"
        },
        {
          id: 3,
          title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
          description: "一篇讨论 LLM 驱动机器人攻击、防御手段和挑战的综述。",
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
    ui: {
      themeToggle: "切换主题",
      langToggle: "EN"
    }
  }
};
