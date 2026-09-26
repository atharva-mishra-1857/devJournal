import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/usercontext'

export default function SelectUser() {
  const { USERS, selectUser } = useUser()
  const navigate = useNavigate()

  const handleSelect = (user) => {
    selectUser(user)
    navigate('/')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Who are you?</h1>
        <p className="text-gray-500 text-sm">Pick your profile to continue</p>
      </div>

      <div className="flex gap-4">
        {USERS.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelect(user)}
            className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all hover:scale-105
              ${user.id === 'atharva'
                ? 'border-purple-700 bg-purple-600/10 hover:border-purple-500 hover:bg-purple-600/20'
                : 'border-pink-700 bg-pink-600/10 hover:border-pink-500 hover:bg-pink-600/20'
              }`}
          >
            <span className="text-6xl">{user.emoji}</span>
            <span className="text-xl font-semibold text-white">{user.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}