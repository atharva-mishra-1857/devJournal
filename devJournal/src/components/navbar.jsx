import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/usercontext'

const links = [
  { to: '/', label: 'Journal' },
  { to: '/stats', label: 'Stats' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { activeUser } = useUser()
  const navigate = useNavigate()

  return (
    <nav className="border-b border-gray-800 bg-[#0f1117] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">

        <span className="font-mono font-bold tracking-tight text-lg text-purple-400">
          dev.journal
        </span>

        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                ${pathname === to
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/new"
            className="px-4 py-1.5 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white ml-2 transition-colors"
          >
            + New Entry
          </Link>
        </div>

        {/* Profile switcher */}
        <button
          onClick={() => navigate('/select')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors
            ${activeUser?.id === 'atharva'
              ? 'border-purple-700 bg-purple-600/10 text-purple-300 hover:bg-purple-600/20'
              : activeUser?.id === 'her'
                ? 'border-pink-700 bg-pink-600/10 text-pink-300 hover:bg-pink-600/20'
                : 'border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
        >
          <span>{activeUser?.emoji ?? '👤'}</span>
          <span>{activeUser?.name ?? 'Select Profile'}</span>
        </button>

      </div>
    </nav>
  )
}