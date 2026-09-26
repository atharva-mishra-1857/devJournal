import { createContext, useContext, useState, useEffect } from 'react'

const USERS = [
  { id: 'atharva', name: 'Atharva', color: 'purple', emoji: '👨‍💻' },
  { id: 'her', name: 'Saniya', color: 'pink', emoji: '👩‍💻' },
]

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('dj_active_user')
    if (saved) setActiveUser(JSON.parse(saved))
  }, [])

  const selectUser = (user) => {
    setActiveUser(user)
    localStorage.setItem('dj_active_user', JSON.stringify(user))
  }

  return (
    <UserContext.Provider value={{ activeUser, selectUser, USERS }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)