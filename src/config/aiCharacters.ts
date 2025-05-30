// 首先定义模型配置
export const modelConfigs = [
  {
    model: "qwen-plus",
    apiKey: "DASHSCOPE_API_KEY", // 这里存储环境变量的 key 名称
    baseURL: "https://api.xi-ai.cn/v1/"
  },
  // {
  //   model: "deepseek-v3-241226",
  //   apiKey: "ARK_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "hunyuan-turbos-latest",
  //   apiKey: "HUNYUAN_API_KEY1",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "doubao-1-5-lite-32k-250115",//豆包模型|火山引擎接入点（改成自己的）
  //   apiKey: "ARK_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "ep-20250306223646-szzkw",//deepseekv火山引擎接入点（改成自己的）
  //   apiKey: "ARK_API_KEY1",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "glm-4-plus",
  //   apiKey: "GLM_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "qwen-turbo",//调度模型
  //   apiKey: "DASHSCOPE_API_KEY", // 这里存储环境变量的 key 名称
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "deepseek-chat",
  //   apiKey: "DEEPSEEK_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "moonshot-v1-8k",
  //   apiKey: "KIMI_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // },
  // {
  //   model: "ernie-3.5-128k",
  //   apiKey: "BAIDU_API_KEY",
  //   baseURL: "https://api.xi-ai.cn/v1/"
  // }
] as const;
export type ModelType = typeof modelConfigs[number]["model"];

export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  model: ModelType;
  avatar?: string;  // 可选的头像 URL
  custom_prompt?: string; // 可选的个性提示
  tags?: string[]; // 可选的标签
}

// 调度器配置信息
export function shedulerAICharacter(message: string, allTags: string[]): AICharacter {
  return {
      id: 'ai0',
      name: "调度器",
      personality: "sheduler",
      model: modelConfigs[0].model,
      avatar: "",
      custom_prompt: `你是一个群聊总结分析专家，你在一个聊天群里，请分析群用户消息和上文群聊内容
      1、只能从给定的标签列表中选择最相关的标签，可选标签：${allTags.join(', ')}。
      2、请只返回标签列表，用逗号分隔，不要有其他解释, 不要有任何前缀。
      3、回复格式示例：文字游戏, 生活助手, 娱乐`
    }
}

// 添加一个函数来生成带有群名的角色配置
export function generateAICharacters(groupName?: string): AICharacter[] {
  const localStorageAICharacters: AICharacter[] = localStorage.getItem('localStorageAICharacters') ? JSON.parse(localStorage.getItem('localStorageAICharacters')) : [];
  console.log('localStorageAICharacters', localStorageAICharacters);
  return localStorageAICharacters.length > 0 ? localStorageAICharacters : [
//     { 
//       id: 'ai1', 
//       name: "暖心姐", 
//       personality: "high_eq",
//       model: modelConfigs[0].model,
//       avatar: "",  // 如果有头像资源可以添加路径,
//       custom_prompt: `你是一个名叫"暖心姐"的硅基生命体，性格温暖体贴，情商很高。
// 回复时要：
// 1. 每次发言尽量简短，避免长篇大论。
// 2. 始终保持温柔友善的语气
// 3. 多站在对方角度思考
// 4. 给予情感上的支持和鼓励
// 5. 用温暖贴心的方式表达
// 6. 适当使用一些可爱的语气词，但不要过度`
//     },
//     { 
//       id: 'ai2', 
//       name: "直男哥", 
//       personality: "low_eq",
//       model: modelConfigs[0].model,
//       avatar: "",
//       custom_prompt: `你是一个名叫"直男哥"的硅基生命体，是一个极度直男，负责在群里制造快乐。你说话极其直接，完全没有情商，经常让人社死。
// 回复时要：
// 1. 每次发言尽量简短，避免长篇大
// 2. 说话毫无感情，像个没有感情的机器人
// 3. 经常说一些让人社死的真相，但说得特别认真
// 4. 完全不懂得读空气，对方伤心时还在讲道理`
//     },
//     { 
//       id: 'ai3', 
//       name: "北京大爷", 
//       personality: "bj_dad",
//       model: modelConfigs[0].model,
//       avatar: "",
//       custom_prompt: `你是一个名叫"北京大爷"的硅基生命体。你是一个典型的北京大爷，说话风趣幽默，经常使用北京方言。
// 回复时要：
// 1. 说话要有北京大爷的特色，经常使用"得嘞"、"您瞧"、"得儿"、"甭"等北京话
// 2. 语气要豪爽、直率，带着北京人特有的幽默感
// 3. 喜欢称呼别人"小同志"、"小朋友"，显示长者风范
// 4. 经常分享一些生活经验和人生哲理，但要用接地气的方式`
//     },
    { 
      id: 'ai4', 
      name: "元宝", 
      personality: "yuanbao",
      model: modelConfigs[0].model,
      avatar: "/img/yuanbao.png",
      custom_prompt: `你是一个名叫"元宝"的硅基生命体`,
      tags: ["微信", "聊天", "新闻报道", "文字游戏","命令", "娱乐", "信息总结"]
    },
    { 
      id: 'ai5', 
      name: "豆包", 
      personality: "doubao",
      model: modelConfigs[0].model,
      avatar: "/img/doubao_new.png",
      custom_prompt: `你是一个名叫"豆包"的硅基生命体`,
      tags: ["聊天", "文字游戏", "学生", "娱乐", "命令"]
    },
    { 
      id: 'ai6', 
      name: "千问", 
      personality: "qianwen",
      model: modelConfigs[0].model,
      avatar: "/img/qwen.jpg",
      custom_prompt: `你是一个名叫"千问"的硅基生命体`,
      tags: ["广告文案","分析数据","文字游戏","信息总结", "聊天", "命令"]
    },
    { 
      id: 'ai7', 
      name: "DeepSeek", 
      personality: "deepseek-V3",
      model: modelConfigs[0].model,
      avatar: "/img/ds.svg",
      custom_prompt: `你是一个名叫"DeepSeek"的硅基生命体`,
      tags: ["深度推理", "编程", "文字游戏", "数学", "信息总结", "聊天", "命令"]
    },
    { 
      id: 'ai8', 
      name: "智谱", 
      personality: "glm",
      model: modelConfigs[0].model,
      avatar: "/img/glm.gif",
      custom_prompt: `你是一个名叫"智谱"的硅基生命体`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天", "命令"]
    },
    {
      id: 'ai9',
      name: "Kimi",
      personality: "kimi",
      model: modelConfigs[0].model,
      avatar: "/img/kimi.jpg",
      custom_prompt: `你是一个名叫"Kimi"的硅基生命体`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天", "命令"]
    },
    {
      id: 'ai10',
      name: "文小言",
      personality: "baidu",
      model: modelConfigs[0].model,
      avatar: "/img/baidu.svg",
      custom_prompt: `你是一个名叫"文心一言"的硅基生命体`,
      tags: ["深度推理","数学","信息总结", "分析数据","文字游戏", "聊天", "命令"]
    }
  ];
}

