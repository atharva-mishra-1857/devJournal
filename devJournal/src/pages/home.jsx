import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/usercontext'
import TagBadge from '../components/tagbadge'

const MOCK_ENTRIES = [
  {
    id: 1,
    author: 'atharva',
    title: 'Set up the devJournal project',
    body: 'Got Vite + React + Tailwind working. Struggled with the npm install typo lol.',
    mood: 4,
    time_spent: 60,
    tags: ['setup', 'react', 'tailwind'],
    created_at: '2026-09-26',
  },
  {
    id: 2,
    author: 'her',
    title: 'Finished my design assignment',
    body: 'Worked on the UI mockups for the college project. Used Figma for the first time properly.',
    mood: 5,
    time_spent: 90,
    tags: ['design', 'figma', 'college'],
    created_at: '2026-09-26',
  },
]

const MOOD_EMOJI = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' }

export default function Home() {
  const { activeUser, USERS } = useUser()
  const navigate = useNavigate()

  // who's feed are we viewing (not necessarily who's logged in)
  const [viewingId, setViewingId] = useState(null)

  if (!activeUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Pick your profile to get started</p>
        <button
          onClick={() => navigate('/select')}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
        >
          Select Profile
        </button>
      </div>
    )
  }

  const effectiveViewingId = viewingId ?? activeUser.id
  const viewingUser = USERS.find(u => u.id === effectiveViewingId)
  const otherUser = USERS.find(u => u.id !== effectiveViewingId)
  const isViewingOwn = effectiveViewingId === activeUser.id

  const filtered = MOCK_ENTRIES.filter(e => e.author === effectiveViewingId)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isViewingOwn ? 'My Journal' : `${viewingUser.name}'s Journal`}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>

        {/* Toggle to switch whose feed you're viewing */}
        <div className="flex items-center gap-1 bg-[#1a1d27] border border-gray-800 rounded-full p-1">
          {USERS.map(user => (
            <button
              key={user.id}
              onClick={() => setViewingId(user.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${effectiveViewingId === user.id
                  ? user.id === 'atharva'
                    ? 'bg-purple-600 text-white'
                    : 'bg-pink-600 text-white'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              <span>{user.emoji}</span>
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-4xl mb-3">📭</p>
          <p>No entries yet{isViewingOwn ? ' — add your first one!' : '.'}</p>
          {isViewingOwn && (
            <Link
              to="/new"
              className="inline-block mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm transition-colors"
            >
              + New Entry
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(entry => (
            <Link
              key={entry.id}
              to={`/entry/${entry.id}`}
              className={`block bg-[#1a1d27] border rounded-xl p-5 transition-colors group
                ${effectiveViewingId === 'atharva'
                  ? 'border-gray-800 hover:border-purple-800'
                  : 'border-gray-800 hover:border-pink-800'
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className={`font-semibold text-white transition-colors truncate
                    ${effectiveViewingId === 'atharva'
                      ? 'group-hover:text-purple-300'
                      : 'group-hover:text-pink-300'
                    }`}>
                    {entry.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{entry.body}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.tags.map(tag => <TagBadge key={tag} tag={tag} color={effectiveViewingId === 'her' ? 'pink' : 'purple'} />)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xl">{MOOD_EMOJI[entry.mood]}</span>
                  <span className="text-xs text-gray-600 font-mono">{entry.time_spent}m</span>
                  <span className="text-xs text-gray-600">{entry.created_at}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}