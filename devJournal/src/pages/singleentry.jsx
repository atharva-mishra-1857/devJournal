import { useParams, Link } from 'react-router-dom'
import TagBadge from '../components/tagbadge'

const MOCK_ENTRIES = [
  {
    id: 1,
    title: 'Set up the devJournal project',
    body: 'Got Vite + React + Tailwind working. Struggled with the npm install typo lol.\n\nLearned that Linux is case-sensitive with folder names. `devjournal` ≠ `devJournal`.',
    mood: 4,
    time_spent: 60,
    tags: ['setup', 'react', 'tailwind'],
    created_at: '2026-09-26',
  },
  {
    id: 2,
    title: 'Built the Navbar and routing',
    body: 'React Router v6 is clean. Used useLocation for active link highlighting.\n\nThe sticky navbar with border-b gives a really clean VS Code feel.',
    mood: 5,
    time_spent: 45,
    tags: ['react-router', 'ui'],
    created_at: '2026-09-26',
  },
]

const MOOD_EMOJI = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' }
const MOOD_LABEL = { 1: 'Rough', 2: 'Meh', 3: 'Okay', 4: 'Good', 5: 'Great' }

export default function SingleEntry() {
  const { id } = useParams()
  const entry = MOCK_ENTRIES.find(e => e.id === Number(id))

  if (!entry) return (
    <div className="text-center py-20 text-gray-500">
      Entry not found. <Link to="/" className="text-purple-400 hover:underline">Go back</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-sm text-gray-500 hover:text-purple-400 transition-colors mb-6 inline-block">
        ← Back to Journal
      </Link>

      <div className="bg-[#1a1d27] border border-gray-800 rounded-xl p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold text-white leading-snug">{entry.title}</h1>
          <span className="text-2xl shrink-0">{MOOD_EMOJI[entry.mood]}</span>
        </div>

        <div className="flex gap-4 mb-6 text-sm">
          <span className="text-gray-500">📅 {entry.created_at}</span>
          <span className="text-gray-500">⏱ {entry.time_spent} mins</span>
          <span className="text-gray-500">Mood: {MOOD_LABEL[entry.mood]}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {entry.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
        </div>

        <div className="text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm bg-[#0f1117] rounded-lg p-4">
          {entry.body}
        </div>
      </div>
    </div>
  )
}