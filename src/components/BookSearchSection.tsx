import React, { useState } from "react";
import type { BookSearchSectionProps } from "../types/bookSystem";
import type { GoogleBook } from "../types/googleBooks";

const BookSearchSection: React.FC<BookSearchSectionProps> = ({ searchResults, loading, searchBooks, registerBook }) => {
    const [query, setQuery] = useState('')

    return (
        <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>本を検索して追加</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    searchBooks(query);
                    setQuery('');
                }}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="タイトルや著者名を入力"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? '検索中...' : '検索'}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                {searchResults.map((book: GoogleBook) => (
                    <div key={book.id} style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                        <p><strong>{book.volumeInfo.title}</strong></p>
                        <button onClick={() => registerBook(book)}>本棚に追加</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BookSearchSection;