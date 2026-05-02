import { createClient } from '@supabase/supabase-js'

// 環境変数から情報を取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log(supabaseUrl, supabaseAnonKey);
// 環境変数が設定されていない場合にエラーを投げる（開発時のミス防止）
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('SupabaseのURLまたはAnon Keyが環境変数に設定されていません。')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)