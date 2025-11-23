"use client";
import ConstellationScene from './components/ConstellationScene';
import React, { useState, useEffect } from 'react';

// 1. 星座資料
const zodiacSigns = [
  { name: "牡羊座 (Aries)", date: "Mar 21 - Apr 19" },
  { name: "金牛座 (Taurus)", date: "Apr 20 - May 20" },
  { name: "雙子座 (Gemini)", date: "May 21 - Jun 20" },
  { name: "巨蟹座 (Cancer)", date: "Jun 21 - Jul 22" },
  { name: "獅子座 (Leo)", date: "Jul 23 - Aug 22" },
  { name: "處女座 (Virgo)", date: "Aug 23 - Sep 22" },
  { name: "天秤座 (Libra)", date: "Sep 23 - Oct 22" },
  { name: "天蠍座 (Scorpio)", date: "Oct 23 - Nov 21" },
  { name: "射手座 (Sagittarius)", date: "Nov 22 - Dec 21" },
  { name: "摩羯座 (Capricorn)", date: "Dec 22 - Jan 19" },
  { name: "水瓶座 (Aquarius)", date: "Jan 20 - Feb 18" },
  { name: "雙魚座 (Pisces)", date: "Feb 19 - Mar 20" },
];

// 2. 星星背景組件 (修正 Hydration Error 版)
const StarBackground = () => {
  // 定義狀態來儲存星星樣式，初始值為空字串
  const [stars, setStars] = useState({
    small: '',
    medium: '',
    large: ''
  });

  // 生成隨機星星的函數
  const generateStars = (count: number) => {
    let value = "";
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      value += `${x}px ${y}px #FFF, `;
    }
    return value.slice(0, -2);
  };

  // 使用 useEffect 確保只在客戶端生成星星
  useEffect(() => {
    setStars({
      small: generateStars(700),
      medium: generateStars(200),
      large: generateStars(100)
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-[1px] h-[1px] bg-transparent animate-[animStar_50s_linear_infinite]" 
        style={{ boxShadow: stars.small }} 
      />
      <div 
        className="absolute w-[2px] h-[2px] bg-transparent animate-[animStar_100s_linear_infinite]" 
        style={{ boxShadow: stars.medium }} 
      />
      <div 
        className="absolute w-[3px] h-[3px] bg-transparent animate-[animStar_150s_linear_infinite]" 
        style={{ boxShadow: stars.large }} 
      />
    </div>
  );
};

export default function CosmicPage() {
  const [activeSign, setActiveSign] = useState(zodiacSigns[0]);

  return (
    <main className="relative flex h-screen w-full bg-black overflow-hidden text-white">
      
      {/* --- 背景層 --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-90" />
        <StarBackground />
      </div>

      {/* --- 前景佈局 --- */}
      <div className="relative z-10 flex w-full h-full">
        
        {/* 左側欄位 */}
        <aside className="w-[30%] h-full border-r border-white/10 bg-black/20 backdrop-blur-sm flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
              COSMOS
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Zodiac Archive</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {zodiacSigns.map((sign, index) => (
              <div
                key={index}
                onClick={() => setActiveSign(sign)}
                className={`
                  group relative p-4 rounded-xl cursor-pointer transition-all duration-500
                  border border-white/5 hover:border-cyan-400/50
                  hover:bg-white/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
                  ${activeSign.name === sign.name ? 'bg-white/10 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : ''}
                `}
              >
                <h3 className={`text-lg font-medium transition-colors duration-300 ${activeSign.name === sign.name ? 'text-cyan-300' : 'text-gray-200 group-hover:text-white'}`}>
                  {sign.name}
                </h3>
                
                <p className="text-sm text-gray-500 group-hover:text-cyan-200/70 transition-colors">
                  {sign.date}
                </p>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 shadow-[0_0_8px_cyan] transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </aside>

        {/* 右側主顯示區 */}
        <section className="relative w-[70%] h-full overflow-hidden">
          
          {/* 3D 場景層 (絕對定位在底層) */}
          <div className="absolute inset-0 z-0 bg-black/40"> {/* 加一點黑色遮罩讓星星更明顯 */}
            <ConstellationScene activeSignName={activeSign.name} />
          </div>

          {/* UI 資訊層 (浮在 3D 之上, pointer-events-none 讓滑鼠可以穿透 UI 操作 3D) */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 pointer-events-none">
            <div className="max-w-2xl text-center pointer-events-auto"> {/* 文字區開啟 pointer-events 方便選取文字 */}
              <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-black/60 text-cyan-300 text-sm tracking-[0.2em] backdrop-blur-md">
                System: ONLINE
              </div>
              <h2 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {activeSign.name.split(' ')[0]}
              </h2>
              <p className="text-xl text-cyan-200/80 font-light tracking-wide">
                {activeSign.date}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}