"use client";

import React, { useState, useEffect, useMemo } from 'react';
// 引入我們之前做的 3D 組件和新的資料檔
import ConstellationScene from './components/ConstellationScene';
import { getZodiacInfo } from './zodiacInfo';

// 1. 星座選單資料
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

// 修改 app/page.tsx 中的 DailyAIAnalysis 組件

const DailyAIAnalysis = ({ signName }: { signName: string }) => {
  const [analysis, setAnalysis] = useState({ score: 0, advice: "正在連結宇宙數據庫..." });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setAnalysis({ score: 0, advice: "正在連結宇宙數據庫..." }); // 重置狀態

      try {
        const today = new Date().toLocaleDateString();
        
        // 呼叫我們剛剛寫好的後端 API
        const res = await fetch('/api/horoscope', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sign: signName, date: today }),
        });

        if (!res.ok) throw new Error('Network error');
        
        const data = await res.json();
        setAnalysis(data);
      } catch (error) {
        console.error(error);
        setAnalysis({ score: 3, advice: "連線訊號受干擾，請稍後再試。" });
      } finally {
        setLoading(false);
      }
    };

    // 稍微延遲 500ms 避免切換太快一直呼叫 API (防抖動概念)
    const timer = setTimeout(() => {
      fetchAnalysis();
    }, 500);

    return () => clearTimeout(timer);
  }, [signName]);

  return (
    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/30 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-cyan-300 font-bold tracking-wider flex items-center gap-2">
          {/* loading 時顯示旋轉動畫，完成時顯示綠燈 */}
          {loading ? (
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"/>
          ) : (
            <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"/>
          )}
          REAL-TIME AI ORACLE
        </h4>
        <span className="text-xs text-cyan-500/60 font-mono">
          GEMINI-2.5-FLASH
        </span>
      </div>
      
      <div className="flex items-center gap-1 mb-2">
        {loading ? (
          // Loading 骨架屏 (Skeleton)
          <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
        ) : (
          <>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-xl transition-all duration-500 ${star <= analysis.score ? 'text-yellow-400 scale-110' : 'text-gray-600'}`}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-300">({analysis.score}/5)</span>
          </>
        )}
      </div>

      <div className="text-sm text-gray-200 leading-relaxed font-light border-t border-white/10 pt-2 mt-2 min-h-[3em]">
        {loading ? (
          <span className="animate-pulse text-cyan-200/50">Analyzing star alignment...</span>
        ) : (
          <>
            <span className="text-cyan-400 font-medium">Oracle: </span>
            {analysis.advice}
          </>
        )}
      </div>
    </div>
  );
};

// --- 下拉式資訊面板組件 ---
const InfoPanel = ({ signName }: { signName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = getZodiacInfo(signName);

  return (
    <div className="w-full max-w-2xl mt-6 transition-all duration-500 ease-in-out pointer-events-auto">
      {/* 按鈕區域 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-6 py-4 rounded-xl backdrop-blur-md transition-all duration-300
          border border-white/10 hover:border-cyan-400/50 hover:bg-white/5
          ${isOpen ? 'bg-white/10 border-cyan-500/50 rounded-b-none' : 'bg-black/40'}
        `}
      >
        <span className="text-lg font-medium tracking-widest text-cyan-100">
          CONSTELLATION DATA
        </span>
        <span className={`transform transition-transform duration-300 text-cyan-400 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* 展開內容區域 */}
      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out bg-black/60 backdrop-blur-xl border-x border-b border-white/10 rounded-b-xl
        ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 space-y-6 text-sm text-gray-300">
          
          {/* AI 分析區塊 */}
          <DailyAIAnalysis signName={signName} />

          {/* 個性 */}
          <div>
            <h5 className="text-cyan-400 font-bold mb-1 uppercase tracking-wider">Personality (個性)</h5>
            <p className="leading-relaxed">{info.personality}</p>
          </div>

          {/* 優缺點 (兩欄佈局) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-400 font-bold mb-1 uppercase tracking-wider">Pros (優點)</h5>
              <p className="leading-relaxed">{info.pros}</p>
            </div>
            <div>
              <h5 className="text-red-400 font-bold mb-1 uppercase tracking-wider">Cons (缺點)</h5>
              <p className="leading-relaxed">{info.cons}</p>
            </div>
          </div>

          {/* 愛情與事業 */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
             <div>
              <h5 className="text-pink-400 font-bold mb-1 uppercase tracking-wider">Love & Match</h5>
              <p className="leading-relaxed">{info.match}</p>
            </div>
             <div>
              <h5 className="text-blue-400 font-bold mb-1 uppercase tracking-wider">Career</h5>
              <p className="leading-relaxed">{info.career}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- 主頁面組件 ---
export default function CosmicPage() {
  const [activeSign, setActiveSign] = useState(zodiacSigns[0]);

  return (
    <main className="relative flex h-screen w-full bg-black overflow-hidden text-white">
      
      {/* 左側選單 (維持不變) */}
      <aside className="w-[30%] h-full border-r border-white/10 bg-black/20 backdrop-blur-sm flex flex-col z-20">
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
        
        {/* 3D 場景層 */}
        <div className="absolute inset-0 z-0 bg-black/40">
          <ConstellationScene activeSignName={activeSign.name} />
        </div>

        {/* UI 資訊層 (浮在 3D 之上) */}
        {/* pointer-events-none 讓這層大範圍可穿透，但在 InfoPanel 上要設回 auto */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 px-10 pointer-events-none overflow-y-auto custom-scrollbar">
          
          {/* 星座標題區 (稍微往上移一點，留空間給選單) */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center pointer-events-auto mt-20">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-black/60 text-cyan-300 text-sm tracking-[0.2em] backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              System: ONLINE
            </div>
            <h2 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-900 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              {activeSign.name.split(' ')[0]}
            </h2>
            <p className="text-xl text-cyan-200/80 font-light tracking-wide mb-8">
              {activeSign.date}
            </p>

            {/* 新增：下拉式資訊面板 */}
            <InfoPanel signName={activeSign.name} />
          </div>
          
        </div>
      </section>
    </main>
  );
}