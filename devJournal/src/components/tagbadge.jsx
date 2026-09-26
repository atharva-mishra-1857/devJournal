export default function TagBadge({ tag, color = 'purple' }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-mono bg-gray-800 border border-gray-700
      ${color === 'pink' ? 'text-pink-300' : 'text-purple-300'}`}>
      {tag}
    </span>
  )
}