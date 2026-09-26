import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/usercontext'

const MOOD_OPTIONS = [
  { value: 1, emoji: '😞', label: 'Rough' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
]

export default function NewEntry() {
  const navigate = useNavigate()
  const { activeUser } = useUser()
  const [form, setForm] = useState({
    title: '',
    body: '',
    mood: 3,
    time_spent: '',
    tags: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Entry to save:', { ...form, author: activeUser?.id })
    navigate('/')
  }

  const accentColor = activeUser?.id === 'her' ? 'pink' : 'purple'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl">{activeUser?.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold text-white">New Entry</h1>
          <p className="text-gray-500 text-sm">Posting as {activeUser?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Title</label>
          <input
            type="text"
            placeholder="What did you do today?"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className={`w-full bg-[#1a1d27] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors
              ${accentColor === 'pink' ? 'focus:border-pink-600' : 'focus:border-purple-600'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">What happened?</label>
          <textarea
            placeholder="Write what you worked on, struggled with, or learned..."
            value={form.body}
            onChange={e => setForm({ ...form, body: e.target.value })}
            rows={7}
            className={`w-full bg-[#1a1d27] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors font-mono text-sm resize-none
              ${accentColor === 'pink' ? 'focus:border-pink-600' : 'focus:border-purple-600'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">How was the session?</label>
          <div className="flex gap-2">
            {MOOD_OPTIONS.map(({ value, emoji, label }) => (
              <button
                type="button"
                key={value}
                onClick={() => setForm({ ...form, mood: value })}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg border transition-colors text-xs
                  ${form.mood === value
                    ? accentColor === 'pink'
                      ? 'border-pink-600 bg-pink-600/10 text-pink-300'
                      : 'border-purple-600 bg-purple-600/10 text-purple-300'
                    : 'border-gray-700 bg-[#1a1d27] text-gray-500 hover:border-gray-600'
                  }`}
              >
                <span className="text-xl">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Time spent (minutes)</label>
          <input
            type="number"
            placeholder="e.g. 90"
            value={form.time_spent}
            onChange={e => setForm({ ...form, time_spent: e.target.value })}
            className={`w-full bg-[#1a1d27] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors
              ${accentColor === 'pink' ? 'focus:border-pink-600' : 'focus:border-purple-600'}`}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Tags</label>
          <input
            type="text"
            placeholder="design, college, coding (comma separated)"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
            className={`w-full bg-[#1a1d27] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-colors font-mono text-sm
              ${accentColor === 'pink' ? 'focus:border-pink-600' : 'focus:border-purple-600'}`}
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white font-semibold py-3 rounded-lg transition-colors mt-2
            ${accentColor === 'pink'
              ? 'bg-pink-600 hover:bg-pink-500'
              : 'bg-purple-600 hover:bg-purple-500'
            }`}
        >
          Save Entry
        </button>
      </form>
    </div>
  )
}