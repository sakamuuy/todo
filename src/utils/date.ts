let d: Date | null

export const getToday = (gapDays = 0) => {
  if (!d) d = new Date()

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (gapDays !== 0) {
    d.setDate(d.getDate() + gapDays)
  }

  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    day: weeks[d.getDay()],
  }
}
