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
        "Currently, I'm engaged in Embedded AI research with my advisor, which has been a fascinating journey into the future of robotics. Outside of tech, I'm usually at the gym, or diving into my music and film collections, with a special love for Neo-Soul and Funk."
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
          period: "Jul 2024 — Aug 2024",
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
          title: "Crypto Inheritance & Custody System",
          description: "A secure platform designed to help users custody their cryptocurrency assets and manage them for inheritance purposes.",
          tech: ["React", "Django", "AWS", "MySQL"],
          github: "#",
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
    description: "我专注于构建稳健的后端系统，并探索嵌入式AI的前沿。我热衷于将复杂的需求转化为优雅、高性能的解决方案。",
    nav: {
      about: "关于",
      experience: "经历",
      projects: "项目"
    },
    about: {
      title: "关于我",
      content: [
        "你好，欢迎来到Yuniverse。我叫新宇，一开始我想做的就是新宇宇宙，但后面觉得Yuniverse更简洁，而且发音也是一样的。有点像社交网络里贾老板说的'drop the the, just Facebook'。",
        "我做过各种各样的尝试，目前觉得还是后端适合我。设计简洁的API，确保系统的每个环节能够优雅稳健的运行让我有很大成就感。",
        "我专注于理解需求，并解决问题。我时常也会有一些有创意的想法，但这都是为了构建能解决用户问题的产品。",
        "现在在和导师做嵌入式AI领域的研究，能学到机器人的发展还是挺酷的。",
        "平时健身听音乐看电影比较多。我后面可能会加入我的音乐电影收藏部分。我喜欢听Neo-Soul,Funk,黑人音乐比较多。" ,
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
          period: "2024.7 — 2024.8",
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
          tech: ["Springboot", "Mysql", "AI", "Redis"],
          github: "#",
          demo: "#"
        },
        {
          id: 2,
          title: "虚拟币继承保存系统",
          description: "一个帮助用户托管虚拟币并用于继承目的的安全平台。",
          tech: ["React", "Django", "AWS", "Mysql"],
          github: "#",
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
