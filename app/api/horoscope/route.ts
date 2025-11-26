// app/api/horoscope/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sign, date } = await request.json();

    // 1. 初始化 Gemini 客戶端
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 2. 設計 Prompt (提示詞)，要求 AI 回傳乾淨的 JSON
    const prompt = `
      你是一個專業的星座占星師。
      請針對 "${sign}" 在日期 "${date}" 的運勢進行簡短分析。
      
      請嚴格按照以下 JSON 格式回傳，不要有任何 Markdown 標記或額外文字：
      {
        "score": (給一個 1 到 5 的整數分數),
        "advice": (一段 50 字以內的繁體中文建議，語氣要神秘且優雅)
      }
    `;

    // 3. 呼叫 AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 清理可能出現的 markdown 符號 (```json ... ```)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // 4. 解析並回傳
    const data = JSON.parse(text);
    return NextResponse.json(data);

  } catch (error) {
    console.error("=============== AI API ERROR ===============");
    console.error("API Key 讀取狀態:", process.env.GEMINI_API_KEY ? "已讀取 (長度: " + process.env.GEMINI_API_KEY.length + ")" : "未讀取 (Undefined)");
    console.error("詳細錯誤訊息:", error);
    console.error("============================================");
    return NextResponse.json({ 
      score: 3, 
      advice: "星象混沌，宇宙能量正在重組，請靜心等待..." 
    });
  }
}