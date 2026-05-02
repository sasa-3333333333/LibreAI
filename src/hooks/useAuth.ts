import { useState } from 'react'
import { supabase } from '../lib/supabase' // supabaseクライアントを定義したファイル

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else alert("確認メールを送信しました。認証を完了してください。");
    setLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) setError(error.message)
  }

  return { signUp, signIn, signOut, loading, error }
}