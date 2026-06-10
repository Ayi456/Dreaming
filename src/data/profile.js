export const profile = {
  brand: "NAME.GARDEN",
  identity: "产品工程师 / 创意实践者",
  email: "hello@example.com",
  stats: {
    seeds: 12,
    growth: 64
  },
  mascot: {
    frames: {
      idle: "./static/mascot2-idle-cutout.png",
      wave: "./static/mascot2-wave-cutout.png",
      happy: "./static/mascot2-happy-cutout.png"
    }
  },
  projects: [
    {
      id: "morning-board",
      number: "01",
      title: "晨光任务板",
      category: "Product UI",
      summary: "把混乱任务整理成一个轻量的个人工作流界面。",
      problem: "待办太碎，优先级和每日节奏经常断开。",
      approach: "设计任务池、今日焦点和复盘记录三层结构。",
      result: "用户能在 30 秒内完成一天的工作排布。"
    },
    {
      id: "idea-catcher",
      number: "02",
      title: "灵感采集器",
      category: "Creative Tool",
      summary: "一个把碎片想法保存、分类、再次唤醒的小工具。",
      problem: "灵感记录容易堆积，真正需要时很难找回。",
      approach: "用标签、颜色和随机回访机制提升再次使用率。",
      result: "让收藏从仓库变成可以探索的个人材料库。"
    },
    {
      id: "brand-microsite",
      number: "03",
      title: "品牌微站实验",
      category: "Web System",
      summary: "把一个模糊品牌概念变成可发布的单页体验。",
      problem: "品牌有调性，但没有清晰的信息层级和行动路径。",
      approach: "重组首屏、价值表达、案例和联系路径。",
      result: "形成一套能快速复制到更多页面的视觉语言。"
    },
    {
      id: "ai-workflow",
      number: "04",
      title: "AI 工作流面板",
      category: "Workflow",
      summary: "把重复的研究、生成和整理流程做成可控界面。",
      problem: "多个工具切换会让上下文散掉，输出质量不稳定。",
      approach: "把输入、版本、参考和结果放进同一个流程面板。",
      result: "降低重复操作，让创作过程更可回放。"
    }
  ],
  gallery: [
    {
      id: "sprout-ui",
      title: "Sprout UI",
      type: "界面实验",
      description: "一组关于生长、展开和轻量反馈的互动界面草图。",
      visual: "visual-a"
    },
    {
      id: "flow-map",
      title: "Flow Map",
      type: "产品流程",
      description: "把复杂路径压缩成一张可以讨论的产品流图。",
      visual: "visual-b"
    },
    {
      id: "mini-brand",
      title: "Mini Brand",
      type: "品牌微站",
      description: "从一句定位扩展成一套可落地的视觉语言。",
      visual: "visual-c"
    },
    {
      id: "agent-desk",
      title: "Agent Desk",
      type: "AI 工具",
      description: "让 AI 辅助流程变得可见、可控、可复盘。",
      visual: "visual-d"
    }
  ],
  abilities: [
    {
      title: "产品判断",
      description: "把目标、用户路径和最小可行范围拆清楚，让页面先解决真实问题。",
      tags: ["用户路径", "信息架构", "功能取舍"]
    },
    {
      title: "前端工程",
      description: "用稳定结构、清晰状态和细致响应式，把概念变成可用界面。",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "视觉表达",
      description: "让排版、色彩、节奏和动效共同工作，而不是只给界面加装饰。",
      tags: ["页面节奏", "动效层级", "品牌质感"]
    },
    {
      title: "工作流设计",
      description: "把重复流程变成工具，把经验变成系统，让创意更稳定地产出。",
      tags: ["AI 辅助", "自动化", "迭代复盘"]
    }
  ]
};
