// app/zodiacInfo.ts

export interface ZodiacInfo {
  personality: string;
  pros: string;
  cons: string;
  match: string; // 愛情觀/適配
  career: string;
}

export const ZODIAC_INFO: Record<string, ZodiacInfo> = {
  "牡羊座 (Aries)": {
    personality: "充滿活力、冒險精神，是天生的領袖。但有時過於衝動，缺乏耐心。",
    pros: "熱情、勇敢、行動力強、不畏艱難。",
    cons: "衝動、自我中心、情緒化、缺乏耐性。",
    match: "獅子座、射手座 (火象星座共鳴最強)",
    career: "適合需要競爭與挑戰的工作，如創業者、業務、運動員。"
  },
  "金牛座 (Taurus)": {
    personality: "沈穩踏實，重視物質安全感與感官享受。性格固執但非常可靠。",
    pros: "有耐心、藝術感強、理財能力佳、忠誠。",
    cons: "固執、佔有慾強、懶散、缺乏彈性。",
    match: "處女座、摩羯座 (追求穩定的好夥伴)",
    career: "金融業、藝術設計、餐飲業、園藝。"
  },
  // ... 為了節省篇幅，其他星座我先用通用模板，你可以隨時回來修改文字 ...
  "雙子座 (Gemini)": {
    personality: "機智靈活，好奇心強，喜歡吸收新資訊，但容易三心二意。",
    pros: "適應力強、幽默、溝通能力佳。",
    cons: "善變、神經質、缺乏專注力。",
    match: "天秤座、水瓶座",
    career: "媒體、記者、行銷、公關。"
  },
  "巨蟹座 (Cancer)": {
    personality: "情感豐富，重視家庭與安全感，有很強的防衛心。",
    pros: "體貼、記憶力好、保護欲強。",
    cons: "情緒化、過度敏感、沈溺過去。",
    match: "天蠍座、雙魚座",
    career: "教育、醫療、社會工作、餐飲。"
  },
  "獅子座 (Leo)": {
    personality: "自信開朗，喜歡成為焦點，有王者風範，但有時過於自大。",
    pros: "熱情、大方、領導力強、有創造力。",
    cons: "自大、愛面子、專橫、奢侈。",
    match: "牡羊座、射手座",
    career: "演藝人員、管理階層、政治家。"
  },
  "處女座 (Virgo)": {
    personality: "追求完美，注重細節，邏輯分析能力強，但容易過度挑惕。",
    pros: "勤奮、精確、負責、謙虛。",
    cons: "吹毛求疵、焦慮、過度批判。",
    match: "金牛座、摩羯座",
    career: "會計、編輯、醫療人員、秘書。"
  },
  "天秤座 (Libra)": {
    personality: "愛好和平，追求平衡與美感，社交能力強，但容易猶豫不決。",
    pros: "優雅、公正、社交手腕高、美感佳。",
    cons: "優柔寡斷、依賴心強、好逸惡勞。",
    match: "雙子座、水瓶座",
    career: "外交官、律師、美容時尚、藝術。"
  },
  "天蠍座 (Scorpio)": {
    personality: "神秘深沈，愛恨分明，意志力驚人，直覺敏銳。",
    pros: "洞察力強、深情、意志堅定。",
    cons: "嫉妒心強、報復心重、控制欲強。",
    match: "巨蟹座、雙魚座",
    career: "偵探、心理學家、外科醫生、研究員。"
  },
  "射手座 (Sagittarius)": {
    personality: "愛好自由，樂觀直率，喜歡探索未知，不喜受拘束。",
    pros: "樂觀、誠實、好學、哲學思考。",
    cons: "粗心、說話直衝、缺乏責任感。",
    match: "牡羊座、獅子座",
    career: "旅遊業、教授、翻譯、導遊。"
  },
  "摩羯座 (Capricorn)": {
    personality: "務實保守，重視權威與秩序，有強烈的企圖心與耐力。",
    pros: "負責、自律、謹慎、組織力強。",
    cons: "悲觀、嚴肅、冷漠、功利主義。",
    match: "金牛座、處女座",
    career: "公務員、行政主管、建築師、工程師。"
  },
  "水瓶座 (Aquarius)": {
    personality: "獨立博愛，思想前衛，喜歡打破傳統，重視精神自由。",
    pros: "創意、人道主義、理性、客觀。",
    cons: "叛逆、冷酷、固執、難以捉摸。",
    match: "雙子座、天秤座",
    career: "科技業、發明家、太空科學、占星學。"
  },
  "雙魚座 (Pisces)": {
    personality: "浪漫多情，想像力豐富，富有同情心，容易陷入幻想。",
    pros: "慈悲、直覺強、藝術天份、溫柔。",
    cons: "不切實際、意志薄弱、情緒化。",
    match: "巨蟹座、天蠍座",
    career: "藝術家、詩人、慈善家、社工。"
  }
};

// 輔助函數
export const getZodiacInfo = (name: string): ZodiacInfo => {
  return ZODIAC_INFO[name] || {
    personality: "數據載入中...",
    pros: "未知",
    cons: "未知",
    match: "未知",
    career: "未知"
  };
};