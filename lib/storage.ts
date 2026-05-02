const KEYS = {
  completedDays: 'da90_completed_days',
  completedTasks: 'da90_completed_tasks',
  completionDates: 'da90_completion_dates',
  certificates: 'da90_certificates',
  startDate: 'da90_start_date',
}

export function getCompletedDays(): Set<number> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(KEYS.completedDays)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function setDayComplete(day: number, complete: boolean): void {
  const days = getCompletedDays()
  complete ? days.add(day) : days.delete(day)
  localStorage.setItem(KEYS.completedDays, JSON.stringify([...days]))
  if (complete) {
    const dates = getCompletionDates()
    dates[day] = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    localStorage.setItem(KEYS.completionDates, JSON.stringify(dates))
  }
}

export function getCompletionDates(): Record<number, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(KEYS.completionDates)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getCompletedTasks(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(KEYS.completedTasks)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function setTaskComplete(dayId: number, taskId: string, complete: boolean): void {
  const tasks = getCompletedTasks()
  tasks[`${dayId}-${taskId}`] = complete
  localStorage.setItem(KEYS.completedTasks, JSON.stringify(tasks))
}

export function getCertificates(): boolean[] {
  if (typeof window === 'undefined') return Array(11).fill(false)
  try {
    const raw = localStorage.getItem(KEYS.certificates)
    return raw ? JSON.parse(raw) : Array(11).fill(false)
  } catch {
    return Array(11).fill(false)
  }
}

export function setCertificate(index: number, value: boolean): void {
  const certs = getCertificates()
  certs[index] = value
  localStorage.setItem(KEYS.certificates, JSON.stringify(certs))
}

export function getStartDate(): string {
  if (typeof window === 'undefined') return ''
  let date = localStorage.getItem(KEYS.startDate)
  if (!date) {
    date = new Date().toISOString()
    localStorage.setItem(KEYS.startDate, date)
  }
  return date
}

export function getCurrentDay(totalDays = 90): number {
  const completed = getCompletedDays()
  for (let i = 1; i <= totalDays; i++) {
    if (!completed.has(i)) return i
  }
  return totalDays
}

export function calculateStreak(): { current: number; longest: number } {
  const completed = getCompletedDays()
  let current = 0,
    longest = 0,
    streak = 0
  for (let i = 1; i <= 90; i++) {
    if (completed.has(i)) {
      streak++
      longest = Math.max(longest, streak)
      current = streak
    } else {
      if (i <= getCurrentDay()) current = streak
      streak = 0
    }
  }
  return { current, longest }
}

export function resetAllProgress(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}
