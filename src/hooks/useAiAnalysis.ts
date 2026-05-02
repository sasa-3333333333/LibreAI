import { useState } from "react";
import type { BooksListItem } from "../types/BooksListItem";
import { GoogleGenAI } from "@google/genai";

export const useAiAnalysis = (books: BooksListItem[]) => {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const analyzeBooksList = async () => {
        if (books.length === 0) return
        setLoading(true)

        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

        const libraryData = books.map(item =>
            `タイトル: ${item.books.title}, カテゴリ: ${item.books.category}, 評価: ${item.rating || '未評価'}`
        ).join('\n');

        const prompt = `
            あなたは熟練の書評家であり、データサイエンティストです。
            以下の私の本棚データ（タイトルと評価）から、私の現在の興味関心の傾向を詳しく分析してください。
            その上で、私が次に読むべき本を3冊、具体的な理由とともに提案してください。
            
            回答は必ず日本語で、Markdown形式（見出し、箇条書き）を用いて読みやすく出力してください。

            【本棚データ】
            ${libraryData}
            
            【出力構成】
            1. あなたの現在の興味関心（プロフェッショナル、学術、趣味の観点から）
            2. 読書傾向の分析
            3. 次に読むべき3冊のレコメンド（理由を添えて）
        `;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            setAnalysis(response.text || "分析結果をテキストとして取得できませんでした。");
        } catch (error) {
            console.error("分析エラー:", error);
        } finally {
            setLoading(false);
        }
    };
    return { analysis, loading, analyzeBooksList }
}