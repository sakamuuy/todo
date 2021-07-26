export interface Project {
  id: string,
  title: string,
  updatedAt: string
}

export interface Todo {
  id: string,
  name: string,
  startDay?: string,
  startTime?: string,
  endDay?: string,
  endTime?: string
}