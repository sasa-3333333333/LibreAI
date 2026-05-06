import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const AuthSection = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signUp, loading, error } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ログインフォーム</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
              メールアドレス
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
              パスワード
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => signIn(email, password)}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '処理中...' : 'ログイン'}
            </button>
            <button
              onClick={() => signUp(email, password)}
              disabled={loading}
              className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-xl border border-blue-600 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthSection;