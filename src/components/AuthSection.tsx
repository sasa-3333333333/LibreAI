import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const AuthSection = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signUp, loading, error } = useAuth()

  return (
    <div className="auth-container">
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signIn(email, password)} disabled={loading}>
        ログイン
      </button>
      <button onClick={() => signUp(email, password)} disabled={loading}>
        新規登録
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default AuthSection;