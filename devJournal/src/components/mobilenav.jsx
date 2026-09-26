import { Link, useLocation } from 'react-router-dom'

export default function MobileNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-[#0f1117]/90 backdrop-blur-sm border-t border-gray-800 flex items-center justify-around h-14 z-50">
      <Link to="/" className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${pathname === '/' ? 'text-purple-400' : 'text-gray-500'}`}>
        <span className="text-lg">📓</span>
        Journal
      </Link>
      <Link to="/new" className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${pathname === '/new' ? 'text-purple-400' : 'text-gray-500'}`}>
        <span className="text-lg">✏️</span>
        New
      </Link>
      <Link to="/stats" className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${pathname === '/stats' ? 'text-purple-400' : 'text-gray-500'}`}>
        <span className="text-lg">📊</span>
        Stats
      </Link>
    </nav>
  )
}