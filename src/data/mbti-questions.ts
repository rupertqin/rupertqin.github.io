export interface MBTIQuestion {
  id: number;
  question: {
    zh: string;
    en: string;
  };
  dimension: "EI" | "SN" | "TF" | "JP";
  direction: "positive" | "negative"; // positive means the first letter (E/S/T/J), negative means the second letter (I/N/F/P)
}

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    question: {
      zh: "你经常结交新朋友。",
      en: "You regularly make new friends.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 2,
    question: {
      zh: "复杂和新颖的想法比简单直接的想法更让你感兴趣。",
      en: "Complex and novel ideas excite you more than simple and straightforward ones.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 3,
    question: {
      zh: "你通常更容易被情感共鸣说服，而不是事实论据。",
      en: "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 4,
    question: {
      zh: "你的生活和工作空间总是保持整洁有序。",
      en: "Your living and working spaces are clean and organized.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 5,
    question: {
      zh: "在社交场合中，你更喜欢深度的一对一交流，而不是大型聚会。",
      en: "In social situations, you prefer deep one-on-one conversations over large gatherings.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 6,
    question: {
      zh: "你更信任具体的经验和事实，而不是抽象的理论。",
      en: "You trust concrete experiences and facts more than abstract theories.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 7,
    question: {
      zh: "在做决定时，你倾向于依据逻辑分析，而不是个人价值观。",
      en: "When making decisions, you tend to rely on logical analysis rather than personal values.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 8,
    question: {
      zh: "你更喜欢保持选择的开放性，而不是过早做出决定。",
      en: "You prefer keeping your options open rather than deciding too early.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 9,
    question: {
      zh: "你经常主动与陌生人交谈。",
      en: "You often initiate conversations with strangers.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 10,
    question: {
      zh: "你更喜欢关注大局和未来可能性，而不是眼前的细节。",
      en: "You prefer focusing on the big picture and future possibilities rather than immediate details.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 11,
    question: {
      zh: "你通常把和谐的人际关系看得比任务完成更重要。",
      en: "You usually value harmonious relationships more than task completion.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 12,
    question: {
      zh: "你更喜欢提前制定详细的计划，而不是临时决定。",
      en: "You prefer making detailed plans in advance rather than deciding on the fly.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 13,
    question: {
      zh: "你在独处时感到最有活力。",
      en: "You feel most energized when spending time alone.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 14,
    question: {
      zh: "你更喜欢处理已知的事实和细节，而不是探索未知的可能性。",
      en: "You prefer dealing with known facts and details rather than exploring unknown possibilities.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 15,
    question: {
      zh: "你通常直言不讳地表达批评，即使可能伤害他人感情。",
      en: "You usually express criticism directly, even if it might hurt someone's feelings.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 16,
    question: {
      zh: "你喜欢在截止日期前灵活调整，而不是严格遵守时间表。",
      en: "You like to adjust flexibly before deadlines rather than strictly following a schedule.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 17,
    question: {
      zh: "你经常在社交活动后感到需要独处来恢复精力。",
      en: "You often need alone time to recharge after social activities.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 18,
    question: {
      zh: "你对未来的愿景和想法比过去的经验更感兴趣。",
      en: "You are more interested in future visions and ideas than in past experiences.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 19,
    question: {
      zh: "你经常考虑决定对他人的影响，而不仅仅是效率。",
      en: "You often consider the impact of decisions on others, not just efficiency.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 20,
    question: {
      zh: "你更喜欢有条理的生活方式，而不是随性的安排。",
      en: "You prefer an organized lifestyle rather than a spontaneous arrangement.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 21,
    question: {
      zh: "你经常在谈话中思考接下来要说什么，而不是完全沉浸在当前对话中。",
      en: "You often think about what to say next in conversations rather than being fully present in the current conversation.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 22,
    question: {
      zh: "你更喜欢学习具有实际应用的知识，而不是纯理论的概念。",
      en: "You prefer learning knowledge with practical applications rather than purely theoretical concepts.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 23,
    question: {
      zh: "你认为公平和客观比同情和包容更重要。",
      en: "You believe fairness and objectivity are more important than empathy and inclusiveness.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 24,
    question: {
      zh: "你经常同时处理多个任务，而不是一次专注于一件事。",
      en: "You often handle multiple tasks simultaneously rather than focusing on one thing at a time.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 25,
    question: {
      zh: "你的社交能量来自于与他人互动。",
      en: "Your social energy comes from interacting with others.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 26,
    question: {
      zh: "你更容易被模式、联系和隐含意义所吸引，而不是具体事实。",
      en: "You are more attracted to patterns, connections, and implied meanings than to concrete facts.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 27,
    question: {
      zh: "在冲突中，你更倾向于表达感受，而不是分析问题。",
      en: "In conflicts, you tend to express feelings rather than analyze the problem.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 28,
    question: {
      zh: "你更喜欢把事情提前完成，而不是留到最后一刻。",
      en: "You prefer finishing things ahead of time rather than leaving them to the last minute.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 29,
    question: {
      zh: "你经常需要时间来消化和处理自己的情感。",
      en: "You often need time to process and digest your own emotions.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 30,
    question: {
      zh: "你更信任经过验证的方法，而不是创新但未经验证的想法。",
      en: "You trust proven methods more than innovative but untested ideas.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 31,
    question: {
      zh: "你认为理性决策比情感考量更重要。",
      en: "You believe rational decision-making is more important than emotional considerations.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 32,
    question: {
      zh: "你更喜欢灵活和自发的计划，而不是严格的日程安排。",
      en: "You prefer flexible and spontaneous plans rather than a strict schedule.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 33,
    question: {
      zh: "你在人群中感到舒适和充满活力。",
      en: "You feel comfortable and energized in crowds.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 34,
    question: {
      zh: "你经常思考事物背后的含义和可能性。",
      en: "You often think about the meaning and possibilities behind things.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 35,
    question: {
      zh: "你经常优先考虑他人的感受，即使这意味着牺牲效率。",
      en: "You often prioritize others' feelings even if it means sacrificing efficiency.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 36,
    question: {
      zh: "你更喜欢有明确规则和结构的环境，而不是灵活多变的环境。",
      en: "You prefer an environment with clear rules and structure rather than a flexible and changeable one.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 37,
    question: {
      zh: "你经常反思自己的内心世界和想法。",
      en: "You often reflect on your inner world and thoughts.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 38,
    question: {
      zh: "你更喜欢关注现实和当下的实际情况，而不是抽象概念。",
      en: "You prefer focusing on reality and current practical situations rather than abstract concepts.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 39,
    question: {
      zh: "你通常基于原则和逻辑做出决定，而不是个人情感。",
      en: "You usually make decisions based on principles and logic rather than personal feelings.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 40,
    question: {
      zh: "你喜欢在最后期限前保持开放的选择，而不是过早锁定计划。",
      en: "You like to keep options open until the deadline rather than locking in plans too early.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 41,
    question: {
      zh: "你经常主动组织社交活动或聚会。",
      en: "You often take the initiative to organize social events or gatherings.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 42,
    question: {
      zh: "你对哲学或理论性话题比日常琐事更感兴趣。",
      en: "You are more interested in philosophical or theoretical topics than in daily trivialities.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 43,
    question: {
      zh: "你经常试图帮助他人解决情感问题，而不是提供逻辑分析。",
      en: "You often try to help others with their emotional problems rather than providing logical analysis.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 44,
    question: {
      zh: "你更喜欢按照既定的流程工作，而不是不断调整方法。",
      en: "You prefer working according to established processes rather than constantly adjusting methods.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 45,
    question: {
      zh: "你经常需要安静的环境来集中注意力。",
      en: "You often need a quiet environment to concentrate.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 46,
    question: {
      zh: "你更擅长记住具体的细节和事实，而不是抽象的概念。",
      en: "You are better at remembering specific details and facts rather than abstract concepts.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 47,
    question: {
      zh: "你认为诚实和直接比委婉和体贴更重要。",
      en: "You believe honesty and directness are more important than tact and consideration.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 48,
    question: {
      zh: "你更喜欢在项目中保持灵活性，而不是严格遵循计划。",
      en: "You prefer to maintain flexibility in projects rather than strictly following a plan.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 49,
    question: {
      zh: "你在团队讨论中经常是那个提出想法的人。",
      en: "You are often the one who comes up with ideas in team discussions.",
    },
    dimension: "EI",
    direction: "positive", // E倾向
  },
  {
    id: 50,
    question: {
      zh: "你经常看到多种可能性和角度，而不是单一的解释。",
      en: "You often see multiple possibilities and angles rather than a single interpretation.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 51,
    question: {
      zh: "你经常努力创造和谐的氛围，即使这意味着妥协自己的观点。",
      en: "You often strive to create a harmonious atmosphere even if it means compromising your own views.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 52,
    question: {
      zh: "你更喜欢快速做出决定，而不是长时间权衡所有选项。",
      en: "You prefer making decisions quickly rather than weighing all options for a long time.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
  {
    id: 53,
    question: {
      zh: "你经常在内心中反复思考对话或事件。",
      en: "You often replay conversations or events in your mind.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 54,
    question: {
      zh: "你更喜欢处理具体的、可操作的信息，而不是抽象的理论。",
      en: "You prefer dealing with concrete, actionable information rather than abstract theories.",
    },
    dimension: "SN",
    direction: "positive", // S倾向
  },
  {
    id: 55,
    question: {
      zh: "你通常在做决定时优先考虑效率和逻辑，而不是人际关系。",
      en: "You usually prioritize efficiency and logic over relationships when making decisions.",
    },
    dimension: "TF",
    direction: "positive", // T倾向
  },
  {
    id: 56,
    question: {
      zh: "你喜欢收集信息直到最后一刻，而不是提前做出决定。",
      en: "You like to gather information until the last moment rather than deciding in advance.",
    },
    dimension: "JP",
    direction: "negative", // P倾向
  },
  {
    id: 57,
    question: {
      zh: "你经常在社交场合中感到被忽视或不知所措。",
      en: "You often feel overlooked or overwhelmed in social situations.",
    },
    dimension: "EI",
    direction: "negative", // I倾向
  },
  {
    id: 58,
    question: {
      zh: "你对创新和变革比维持现状更感兴趣。",
      en: "You are more interested in innovation and change than in maintaining the status quo.",
    },
    dimension: "SN",
    direction: "negative", // N倾向
  },
  {
    id: 59,
    question: {
      zh: "你经常表达感激和赞赏，以维护良好的人际关系。",
      en: "You often express gratitude and appreciation to maintain good interpersonal relationships.",
    },
    dimension: "TF",
    direction: "negative", // F倾向
  },
  {
    id: 60,
    question: {
      zh: "你更喜欢把事情安排得井井有条，而不是随意处理。",
      en: "You prefer to arrange things in an orderly manner rather than handling them casually.",
    },
    dimension: "JP",
    direction: "positive", // J倾向
  },
];
