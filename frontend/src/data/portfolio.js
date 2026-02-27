export const portfolioData = {
  en: {
    name: "Xinyu Huang",
    title: "Bachelor of Engineering Honours (Software) at the University of Sydney",
    description: "I am a software engineer focused on building robust backend systems and exploring the frontiers of Embedded AI. I thrive on transforming complex requirements into elegant, high-performance solutions.",
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects"
    },
    about: {
      title: "About Me",
      content: [
        "Hello and welcome to Yuniverse. My name is Xinyu, and this space is my digital universe. The name is a nod to 'The Social Network'—simpler, cleaner, and it just sounds right.",
        "After exploring various fields, I've found my passion in backend development. I get a great sense of accomplishment from designing clean APIs and ensuring every component of a system runs elegantly and robustly.",
        "I believe that truly effective solutions are born from a deep understanding of user needs. This principle guides my work, where I often blend creative thinking with engineering discipline to build products that solve real-world problems.",
        "I did my thesis in Embedded AI research with my advisor. Learning how robotics work is pretty cool. ",
        "Outside of tech, I'm usually at the gym, or listening to music and watching movies. I'll probably add my music and movie collection to this page in the future. I listen to Neo-Soul and Funk a lot.",
      ]
    },
    experience: {
      title: "Experience",
      items: [
        {
          id: 1,
          title: "Backend Developer Intern",
          company: "Software Engineering Lab, Zhejiang University",
          period: "Dec 2023 — Jan 2024",
          description: "Contributed to the development of dynamic database query functionalities for graph-based systems.",
          tech: ["Python", "Neo4j", "Cypher"]
        },
        {
          id: 2,
          title: "Embedded Software Intern",
          company: "Bose",
          period: "Jul 2025 — Aug 2025",
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
          title: "AI Interviewer",
          description: "A web application to help software engineers prepare for technical interviews. It uses an AI-driven chat to simulate interview scenarios, focusing on core CS concepts and technical knowledge.",
          tech: ["Spring Boot", "MySQL", "AI", "Redis"],
          github: "#",
          demo: "#"
        },
          {
              id: 2,
              title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
              description: "A survey discussed a comprehensive taxonomy of attack vectors and defense mechanisms for LLM controlled robotics。",
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
      wechat: "#" // This will be handled by the click event
    },
    ui: {
      themeToggle: "Toggle Theme",
      langToggle: "中文",
    }
  },
  zh: {
    name: "黄新宇",
    title: "悉尼大学荣誉工程学士 (软件工程)",
    description: "我得先找到一个后端实习，然后开始我的职业生涯",
    nav: {
      about: "关于",
      experience: "经历",
      projects: "项目"
    },
    about: {
      title: "关于我",
      content: [
        "你好，欢迎来到Yuniverse。我叫新宇，一开始我想做的就是新宇宇宙，但后面觉得Yuniverse更简洁，而且发音也是一样的。有点像社交网络里贾老板说的'drop the the, just Facebook'。",
        "我做过各种各样的尝试，目前觉得还是后端适合我。设计API，确保系统的每个环节能够健壮的运行，拓展系统让我有很大成就感。",
        "我专注于理解需求，并解决问题。我时常也会有一些有创意的想法，但这都是为了构建能解决用户问题的产品。",
        "毕业设计和导师做嵌入式AI领域的研究，主要是关于Embodied AI的攻防，能学到机器人的发展还是挺酷的。",
        "平时健身听音乐看电影比较多。我后面可能会加入我的音乐电影收藏部分。我喜欢听Neo-Soul,Funk,有律动的音乐比较多。" ,
        "早年玩英雄联盟，星际争霸，现在打云顶，多个赛季澳服大师，我宁愿去玩王者模拟战也不打金铲铲。"
      ]
    },
    experience: {
      title: "工作经历",
      items: [
        {
          id: 1,
          title: "后端开发实习",
          company: "浙江大学软件工程实验室",
          period: "2023.12 — 2024.1",
          description: "负责动态数据库查询功能的开发。",
          tech: ["Python", "Neo4j", "Cypher"]
        },
        {
          id: 2,
          title: "嵌入式软件开发实习",
          company: "Bose",
          period: "2025.7 — 2025.8",
          description: "为音频设备在资源受限的微控制器上开发和调试底层软件。",
          tech: ["C", "STM32", "Keil"]
        }
      ]
    },
    projects: {
      title: "个人项目",
      items: [
        {
          id: 1,
          title: "AI面试官",
          description: "一个协助程序员面试的网站。用AI对话模拟面试进程，类似Leetcode，但专注于核心计算机知识与八股文。",
          tech: ["Springboot", "Mysql", "AI", "Redis", "RocketMQ"],
          github: "#",
          demo: "#"
        },
        {
          id: 2,
          title: "Trust in LLM-controlled Robotics: a Survey of Security Threats, Defenses and Challenges",
          description: "一篇讨论对LLM驱动的机器人的攻击、防御手段和挑战的综述。",
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
      wechat: "#" // This will be handled by the click event
    },
    ui: {
      themeToggle: "主题切换",
      langToggle: "EN",
    }
  }
};
