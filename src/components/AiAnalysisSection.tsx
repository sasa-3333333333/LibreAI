import type React from "react";
import type { BooksListItem } from "../types/BooksListItem";
import { useAiAnalysis } from "../hooks/useAiAnalysis";
import ReactMarkdown from "react-markdown";

interface AiAnalysisSectionProps {
    books: BooksListItem[];
}

const AiAnalysisSection: React.FC<AiAnalysisSectionProps> = ({ books }) => {
    const { analysis, loading, analyzeBooksList } = useAiAnalysis(books);

    return (
        <div>
            <button
                onClick={analyzeBooksList}
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-semibold transition duration-150F${loading
                        ? 'bg-blue-600 border-none disabled:opacity-50 disabled:cursor-not-allowed' // 分析中（枠なし・青背景・白文字）
                        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'} F`}
            >
                {loading ? "分析中..." : "AI分析を開始する"}
            </button>
            {analysis && (
                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm md:text-base">
                        <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AiAnalysisSection;