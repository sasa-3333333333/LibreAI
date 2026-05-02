import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { GoogleBook, GoogleBooksResponse } from '../types/googleBooks'
import type { BooksListItem } from '../types/BooksListItem'

export const useBookRegistration = (userId: string | undefined) => {
    const [books, setBooks] = useState<BooksListItem[]>([])
    const [searchResults, setSearchResults] = useState<GoogleBook[]>([])
    const [loading, setLoading] = useState(false)

    const fetchBooks = async () => {
        if (!userId) return

        setLoading(true)
        const { data, error } = await supabase
            .from('user_books')
            .select(`
        id,
        created_at,
        rating,
        books (
          title,
          author,
          category,
          description
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false }) // 新しい順に並べる

        if (error) {
            console.error('Error fetching books:', error)
        } else {
            // Supabaseの型定義上、booksは配列や単体で返る可能性があるためキャスト
            setBooks(data as unknown as BooksListItem[])
        }
        setLoading(false)
    }

    const searchBooks = async (query: string) => {
        if (!query) return
        setLoading(true)

        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`)
            const data: GoogleBooksResponse = await res.json()
            setSearchResults(data.items || [])
        } catch (err) {
            console.error("検索エラー:", err)
        } finally {
            setLoading(false)
        }
    }

    const registerBook = async (book: GoogleBook) => {
        const info = book.volumeInfo

        const { data: bookData, error: bookError } = await supabase
            .from('books')
            .upsert({
                google_books_id: book.id,
                title: info.title,
                author: info.authors?.join(', ') || '著者不明',
                description: info.description,
                category: info.categories?.[0]
            }, { onConflict: 'google_books_id' })
            .select()
            .single()

        if (bookError || !bookData) {
            console.error("Master registration error:", bookError)
            return alert("マスター登録失敗")
        }

        const { error: userBookError } = await supabase
            .from('user_books')
            .insert({
                user_id: userId,
                book_id: bookData.id
            })

        if (userBookError) {
            console.error("User books insertion error:", userBookError)
            alert("本棚への追加に失敗しました。（既に登録済みかもしれません。）")
        } else {
            alert(`「${info.title}」を本棚に追加しました！`)
            setSearchResults([])
            fetchBooks();
        }
    }

    const updateRating = async (userBooksId: string, newRating: number) => {
        const { error } = await supabase
            .from('user_books')
            .update({ rating: newRating })
            .eq('id', userBooksId)

        if (error) {
            console.error('評価の更新に失敗:', error);
            alert('評価を保存できませんでした');
        } else {
            fetchBooks();
        }
    };

    const handleDelete = async (id: string | undefined, title: string) => {
        const ok = window.confirm(`${title}を本棚から削除してもよろしいですか？`);
        if (!ok) return;

        const { error } = await supabase
            .from('user_books')
            .delete()
            .eq('id', id);

        if (error) {
            alert("削除に失敗しました...");
            console.error(error);
        } else {
            fetchBooks();
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [userId])

    return { books, searchResults, loading, searchBooks, registerBook, updateRating, handleDelete, refresh: fetchBooks, }
}