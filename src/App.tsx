import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { useAuth } from './hooks/useAuth'
import type { Session } from '@supabase/supabase-js'
import BookSearchSection from './components/BookSearchSection'
import AuthSection from './components/AuthSection'
import BooksListSection from './components/BooksListSection'
import { useBookRegistration } from './hooks/useBookRegistration'
import AiAnalysisSection from './components/AiAnalysisSection'

const App = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [view, setView] = useState<'list' | 'ai'>('list');
    const { signOut } = useAuth();
    const { books, searchResults, loading, searchBooks, registerBook, updateRating, handleDelete, refresh } = useBookRegistration(session?.user.id);


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return <AuthSection />
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>本棚</h1>
                <button onClick={signOut}>サインアウト</button>
            </header>

            <nav className="flex gap-4 mb-6 border-b">
                <button onClick={() => setView('list')} className={view === 'list' ? 'border-b-2 border-blue-500' : ''}>本棚リスト</button>
                <button onClick={() => setView('ai')} className={view === 'ai' ? 'border-b-2 border-blue-500' : ''}>AIレコメンド</button>
            </nav>

            <main>
                {view === 'list' ?
                    <>
                        <BookSearchSection searchResults={searchResults} loading={loading} searchBooks={searchBooks} registerBook={registerBook} />
                        <BooksListSection books={books} loading={loading} updateRating={updateRating} handleDelete={handleDelete} refresh={refresh} />
                    </>
                    :
                    <AiAnalysisSection books={books} />
                }
            </main>
        </div>
    )
}

export default App