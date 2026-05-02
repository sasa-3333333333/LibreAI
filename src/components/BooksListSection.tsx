import React, { useState } from 'react';
import type { BooksListItem } from '../types/BooksListItem';
import type { BooksListSectionProps } from '../types/bookSystem';
import StarRatingSection from './StarRatingSection';


const BooksListSection: React.FC<BooksListSectionProps> = ({ books, loading, updateRating, handleDelete, refresh }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (loading) return <div className="p-4 text-center">読み込み中...</div>;

    if (loading) return <div className="p-4 text-center">読み込み中...</div>;

    if (books.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                本棚に本がありません。お気に入りの本を探して追加してみましょう！
                <br />
                <button onClick={() => refresh()} className="mt-4 text-blue-500 hover:underline">
                    更新
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => refresh()}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full shadow-sm transition"
                >
                    🔄 更新
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((item: BooksListItem) => {
                    const isExpanded = expandedId === item.id;

                    return (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <div className="p-5">
                                <h3
                                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                    className="flex justify-between items-start text-lg font-bold text-gray-800 leading-tight cursor-pointer hover:text-blue-600 transition-colors group"
                                >
                                    <span className="line-clamp-2 flex-grow pr-2">{item.books.title}</span>
                                    <span>{isExpanded ? '▲' : '▼'}</span>
                                </h3>

                                <div className="flex flex-col items-center border-b border-gray-50 pb-4 mb-4">
                                    <p className="text-[10px] text-gray-400">クリックで評価を確定</p>
                                    <StarRatingSection
                                        currentRating={item.rating || 0}
                                        onSelect={(num: number) => {
                                            updateRating(item.id, num);
                                        }}
                                    />
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
                                        <p className="text-sm text-gray-500">
                                            {item.books.author}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {item.books.category || 'Reference'}
                                        </p>

                                        <p className="text-sm text-gray-600 leading-relaxed pt-2">
                                            {item.books.description || '説明はありません'}
                                        </p>

                                        <div className="flex justify-end gap-x-4 pt-2">
                                            <button
                                                onClick={() => handleDelete(item.id, item.books.title)}
                                                className="text-xs text-gray-400 hover:text-gray-600"
                                            >
                                                削除する
                                            </button>
                                            <button
                                                onClick={() => setExpandedId(null)}
                                                className="text-xs text-gray-400 hover:text-gray-600"
                                            >
                                                閉じる
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BooksListSection;