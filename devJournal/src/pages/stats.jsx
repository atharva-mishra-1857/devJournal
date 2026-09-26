export default function Stats() {
  const totalMinutes = 105
  const totalEntries = 2
  const currentStreak = 1

  const weekData = [
    { day: 'Mon', mins: 0 },
    { day: 'Tue', mins: 0 },
    { day: 'Wed', mins: 0 },
    { day: 'Thu', mins: 0 },
    { day: 'Fri', mins: 0 },
    { day: 'Sat', mins: 60 },
    { day: 'Sun', mins: 45 },
  ]
  const maxMins = Math.max(...weekData.map(d => d.mins), 1)

  const tagCounts = { react: 1, tailwind: 1, setup: 1, 'react-router': 1, ui: 1 }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Stats</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Entries', value: totalEntries, icon: '📝' },
          { label: 'Hours Coded', value: `${(totalMinutes / 60).toFixed(1)}h`, icon: '⏱' },
          { label: 'Day Streak', value: `${currentStreak} 🔥`, icon: '📅' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-[#1a1d27] border border-gray-800 rounded-xl p-5">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-gray-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-[#1a1d27] border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 mb-5 uppercase tracking-wider">
          This Week
        </h2>
        <div className="flex items-end gap-2 h-32">
          {weekData.map(({ day, mins }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                <div
                  className="w-full bg-purple-600/80 rounded-t-md transition-all"
                  style={{ height: `${(mins / maxMins) * 100}%`, minHeight: mins > 0 ? '4px' : '0' }}
                />
              </div>
              <span className="text-xs text-gray-600">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tag cloud */}
      <div className="bg-[#1a1d27] border border-gray-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Top Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full font-mono text-sm bg-gray-800 text-purple-300 border border-gray-700"
            >
              {tag} <span className="text-gray-600 text-xs">×{count}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}