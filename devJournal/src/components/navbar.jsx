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
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14 gap-2">
  <span className="font-mono font-bold tracking-tight text-base text-purple-400 shrink-0">
    dev.journal
  </span>

  {/* Hide nav links on mobile */}
  <div className="hidden sm:flex items-center gap-1">
    {links.map(({ to, label }) => (
      <Link
        key={to}
        to={to}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
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
      className="px-4 py-1.5 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white ml-2 transition-all duration-200"
    >
      + New Entry
    </Link>
  </div>

  {/* Mobile: just show + and profile */}
  <div className="flex sm:hidden items-center gap-2">
    <Link
      to="/new"
      className="px-3 py-1.5 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200"
    >
      +
    </Link>
  </div>

  <button
    onClick={() => navigate('/select')}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 shrink-0
      ${activeUser?.id === 'atharva'
        ? 'border-purple-700 bg-purple-600/10 text-purple-300 hover:bg-purple-600/20'
        : activeUser?.id === 'her'
          ? 'border-pink-700 bg-pink-600/10 text-pink-300 hover:bg-pink-600/20'
          : 'border-gray-700 text-gray-400 hover:border-gray-600'
      }`}
  >
    <span>{activeUser?.emoji ?? '👤'}</span>
    <span className="hidden sm:inline">{activeUser?.name ?? 'Select'}</span>
  </button>
</div>
    </nav>
  )
}