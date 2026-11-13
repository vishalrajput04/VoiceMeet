import { useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('lingua-user') || 'null'))
  const [token, setToken] = useState(() => localStorage.getItem('lingua-token'))
  const value = useMemo(() => ({ user, setUser, token, setToken }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
