export interface User {
  uid: string;
  name: string;
}

export interface Project {
  id: string,
  title: string,
  updatedAt: string
}

interface TodoBase {
  id: string,
  name: string,
  index: number,
  startDay?: string,
  startTime?: string,
  endDay?: string,
  endTime?: string
}
export interface UnsubscribedTodo extends TodoBase {
  isSubscribed: false
}

export interface SubscribedTodo extends TodoBase {
  isSubscribed: true
}

export type Todo = SubscribedTodo | UnsubscribedTodo
