// app/constellationData.ts
// 這是根據真實星座形狀模擬的 3D 座標數據

export interface StarData {
  position: [number, number, number]; // [x, y, z]
  size: number;
}

export interface ConstellationData {
  name: string;
  stars: StarData[];
  connections: [number, number][]; // [startIndex, endIndex]
}

export const CONSTELLATION_DATA: Record<string, ConstellationData> = {
  "牡羊座 (Aries)": {
    name: "Aries",
    stars: [
      { position: [-3, 1, 0], size: 0.4 },   // Hamal
      { position: [-1, 0, 0.5], size: 0.3 }, // Sheratan
      { position: [0.5, -0.5, -0.5], size: 0.25 }, // Mesarthim
      { position: [2, -1, 0], size: 0.2 },   // 41 Ari
    ],
    connections: [[0, 1], [1, 2], [2, 3]]
  },
  "金牛座 (Taurus)": {
    name: "Taurus",
    stars: [
      { position: [0, 0, 0.5], size: 0.5 },  // 0: Aldebaran (畢宿五 - 紅巨星)
      { position: [-1, -1, 0], size: 0.25 }, // 1: Hyades cluster part
      { position: [-1.5, -2, -0.5], size: 0.25 }, // 2
      { position: [1, -0.5, 0], size: 0.25 }, // 3
      { position: [3, 3, 1], size: 0.35 },   // 4: Elnath (角)
      { position: [-3, 2, -1], size: 0.3 },  // 5: Tianguan (角)
      { position: [1.5, -1.5, 0], size: 0.2 }, // 6
      { position: [-2, -0.5, 0], size: 0.2 }, // 7
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 6], [0, 7], [0, 4], [0, 5]]
  },
  "雙子座 (Gemini)": {
    name: "Gemini",
    stars: [
      { position: [-2, 4, 0], size: 0.45 }, // 0: Castor
      { position: [2, 4, 0.5], size: 0.45 }, // 1: Pollux
      { position: [-2.5, 2, -0.5], size: 0.25 }, // 2
      { position: [-3, 0, 0], size: 0.25 }, // 3
      { position: [-4, -2, 0.5], size: 0.3 }, // 4: Alhena
      { position: [2.5, 2, -0.5], size: 0.25 }, // 5
      { position: [3, 0, 0], size: 0.25 }, // 6
      { position: [4, -2, 0.5], size: 0.25 }, // 7
      { position: [-1.5, -3, -1], size: 0.2 }, // 8 (feet)
      { position: [3.5, -3, -1], size: 0.2 }, // 9 (feet)
    ],
    connections: [[0, 2], [2, 3], [3, 4], [4, 8], [1, 5], [5, 6], [6, 7], [7, 9], [0, 1]]
  },
  "巨蟹座 (Cancer)": {
    name: "Cancer",
    stars: [
      { position: [0, 1, 0], size: 0.3 },  // 0
      { position: [-1.5, -0.5, 0.5], size: 0.3 }, // 1
      { position: [1.5, -0.5, -0.5], size: 0.3 }, // 2
      { position: [0, -2, 0], size: 0.4 }, // 3: Acubens
      { position: [-2, 3, 0], size: 0.2 }, // 4
    ],
    connections: [[0, 1], [0, 2], [0, 3], [0, 4]]
  },
  "獅子座 (Leo)": {
    name: "Leo",
    stars: [
      { position: [2, 1, 0.5], size: 0.5 },   // 0: Regulus (軒轅十四)
      { position: [2.5, 2.5, 0], size: 0.3 }, // 1
      { position: [1.5, 3.5, -0.5], size: 0.3 }, // 2
      { position: [0, 4, 0], size: 0.3 },     // 3
      { position: [-0.5, 2.5, 0.5], size: 0.3 }, // 4
      { position: [-3, 1.5, -1], size: 0.35 }, // 5: Denebola
      { position: [-2, 0, 0], size: 0.3 },    // 6
      { position: [0, 0, 0], size: 0.3 },     // 7
      { position: [-1, -1.5, 0], size: 0.2 }, // 8
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 7], [0, 7], [7, 6], [6, 5], [6, 8]]
  },
  "處女座 (Virgo)": {
    name: "Virgo",
    stars: [
      { position: [0, -3, 1], size: 0.5 },    // 0: Spica (角宿一)
      { position: [1, -1, 0], size: 0.3 },    // 1
      { position: [0, 0, 0], size: 0.35 },    // 2: Porrima
      { position: [-1, 1, -0.5], size: 0.3 }, // 3
      { position: [-2, 2, 0], size: 0.3 },    // 4
      { position: [-3, 0.5, 0.5], size: 0.3 },// 5
      { position: [2, 1, 0], size: 0.3 },     // 6
      { position: [1.5, 3, -1], size: 0.3 },  // 7: Vindemiatrix
      { position: [4, 2, 0], size: 0.2 },     // 8
      { position: [-1.5, -2, 0], size: 0.25 },// 9
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [2, 6], [6, 7], [6, 8], [2, 9]]
  },
  "天秤座 (Libra)": {
    name: "Libra",
    stars: [
      { position: [0, 2, 0], size: 0.4 },    // 0: Zubeneschamali
      { position: [2, -1, 0.5], size: 0.4 }, // 1: Zubenelgenubi
      { position: [-2, -0.5, -0.5], size: 0.35 }, // 2
      { position: [0, -3, 0], size: 0.3 },   // 3
      { position: [1, 3, 0], size: 0.2 },    // 4
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 3], [0, 4]]
  },
  "天蠍座 (Scorpio)": {
    name: "Scorpio",
    stars: [
      { position: [1, 2, 1], size: 0.5 },    // 0: Antares (心宿二 - 紅超巨星)
      { position: [1.5, 3, 0], size: 0.3 },  // 1
      { position: [0.5, 3.5, -0.5], size: 0.3 }, // 2
      { position: [0, 1, 0.5], size: 0.3 },  // 3
      { position: [-1, 0, 0], size: 0.3 },   // 4
      { position: [-2, -1, 0], size: 0.3 },  // 5
      { position: [-2.5, -2.5, -0.5], size: 0.3 }, // 6
      { position: [-1.5, -3.5, 0], size: 0.3 }, // 7
      { position: [0, -3, 0.5], size: 0.3 }, // 8
      { position: [1, -2, 0], size: 0.4 },   // 9: Shaula (尾巴)
      { position: [2, -1.5, 0], size: 0.25 }, // 10
    ],
    connections: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]]
  },
  "射手座 (Sagittarius)": {
    name: "Sagittarius",
    stars: [
      { position: [1, 1, 0], size: 0.4 },    // 0: Kaus Australis (茶壺底)
      { position: [3, 1.5, 0.5], size: 0.35 }, // 1
      { position: [2, 3, 0], size: 0.3 },    // 2: Nunki (茶壺蓋)
      { position: [0, 2.5, -0.5], size: 0.3 }, // 3
      { position: [-1.5, 1, 0], size: 0.3 }, // 4: Media (茶壺嘴)
      { position: [-2.5, 2, 0], size: 0.25 }, // 5
      { position: [0, -1, 0], size: 0.25 },  // 6
      { position: [2, -1, 0], size: 0.25 },  // 7
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [0, 6], [1, 7]]
  },
  "摩羯座 (Capricorn)": {
    name: "Capricorn",
    stars: [
      { position: [-3, 2, 0], size: 0.35 },  // 0: Algedi
      { position: [-3, 1, 0], size: 0.35 },  // 1
      { position: [-1, -2, 0.5], size: 0.3 }, // 2
      { position: [2, -2, -0.5], size: 0.3 }, // 3
      { position: [4, 0, 0], size: 0.4 },    // 4: Deneb Algedi (尾巴)
      { position: [2, 1.5, 0], size: 0.3 },  // 5
      { position: [0, 0, 0], size: 0.25 },   // 6 (Center helper)
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [5, 6], [2, 6]]
  },
  "水瓶座 (Aquarius)": {
    name: "Aquarius",
    stars: [
      { position: [0, 4, 0], size: 0.4 },    // 0: Sadalmelik
      { position: [-2, 3, 0.5], size: 0.35 }, // 1: Sadalsuud
      { position: [1, 3, -0.5], size: 0.3 }, // 2
      { position: [-1, 1, 0], size: 0.3 },   // 3
      { position: [0, 0, 0], size: 0.3 },    // 4
      { position: [0.5, -1.5, 0.5], size: 0.3 }, // 5
      { position: [2, -2, 0], size: 0.3 },   // 6: Skat
      { position: [-0.5, -1.5, -0.5], size: 0.25 }, // 7 (Water flow 1)
      { position: [-1.5, -2.5, 0], size: 0.25 }, // 8 (Water flow 2)
      { position: [-1, -3.5, 0], size: 0.25 }, // 9
    ],
    connections: [[0, 1], [0, 2], [1, 3], [3, 4], [4, 5], [5, 6], [4, 7], [7, 8], [8, 9]]
  },
  "雙魚座 (Pisces)": {
    name: "Pisces",
    stars: [
      { position: [2, 3, 0], size: 0.3 },    // 0: Left Fish Head
      { position: [1, 2, 0.5], size: 0.25 }, // 1
      { position: [0, 1, 0], size: 0.25 },   // 2
      { position: [0, -1, 0], size: 0.25 },  // 3: Alrescha (繩結)
      { position: [-1, 0, -0.5], size: 0.25 }, // 4
      { position: [-2, 1, 0], size: 0.25 },  // 5
      { position: [-3, 1.5, 0], size: 0.25 }, // 6
      { position: [-4, 2, 0.5], size: 0.3 }, // 7: Right Fish Head (Circlet)
      { position: [-4.5, 1.5, 0], size: 0.25 }, // 8
      { position: [-3.5, 1, 0], size: 0.25 }, // 9
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 7]]
  }
};

// 輔助函數：取得星座資料，若無則回傳空
export const getConstellationData = (name: string) => {
  // 處理名稱匹配，因為 UI 傳進來的可能是 "牡羊座 (Aries)"，我們直接用 Key 匹配
  if (CONSTELLATION_DATA[name]) return CONSTELLATION_DATA[name];
  
  // 如果找不到 (防呆)，回傳牡羊座當作預設，避免當機
  console.warn(`Constellation data for ${name} not found, using fallback.`);
  return CONSTELLATION_DATA["牡羊座 (Aries)"];
};