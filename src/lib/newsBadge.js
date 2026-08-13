import { parseNewsDate } from './dateParse'

export function shouldShowNewBadge(item, site = {}) {
  if (item?.isNew) return true

  const auto = site.newBadgeAuto !== false
  const days = Number(site.newBadgeDays ?? 7)
  if (!auto || days <= 0) return false

  const published = parseNewsDate(item?.date)
  if (!published) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  published.setHours(0, 0, 0, 0)

  const diffMs = today.getTime() - published.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  return diffDays >= 0 && diffDays <= days
}
