export function parseNewsDate(dateStr) {
  if (!dateStr) return null
  const parts = String(dateStr).replace(/[.,\s]/g, '-').split('-').map(Number)
  if (parts.length < 3 || parts.some(Number.isNaN)) return null
  return new Date(parts[0], parts[1] - 1, parts[2])
}

export function parseScheduleDate(dateStr) {
  if (!dateStr) return null
  const native = Date.parse(String(dateStr).trim())
  if (!Number.isNaN(native)) return new Date(native)

  const parts = String(dateStr).replace(/[.,\s]/g, '-').split('-').map(Number)
  if (parts.length < 3 || parts.some(Number.isNaN)) return null
  if (parts[0] > 1900) return new Date(parts[0], parts[1] - 1, parts[2])
  return new Date(parts[2], parts[1] - 1, parts[0])
}

export function sortByDateDesc(items = [], getDate) {
  return [...items].sort((a, b) => {
    const dateA = getDate(a)
    const dateB = getDate(b)
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return dateB.getTime() - dateA.getTime()
  })
}
