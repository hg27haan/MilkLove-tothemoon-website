import { parseNewsDate, parseScheduleDate, sortByDateDesc } from './dateParse'

export const HOME_NEWS_LIMIT = 6
export const HOME_SCHEDULE_LIMIT = 4

export function getHomeNews(news = []) {
  return sortByDateDesc(news, item => parseNewsDate(item.date)).slice(0, HOME_NEWS_LIMIT)
}

export function getHomeSchedule(schedule = []) {
  return sortByDateDesc(schedule, item => parseScheduleDate(item.date)).slice(0, HOME_SCHEDULE_LIMIT)
}
