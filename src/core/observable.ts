export type Listener = (eventId: string) => void

export interface Observable {
  notify: (eventId: string) => void
  subscribe: (func: Listener) => void
  unsubscribe: (func: Listener) => void
}

export const createObservable = (): Observable => {
  const observers: Listener[] = []

  return Object.freeze({
    notify: (eventId: string) => observers.forEach((observer) => observer(eventId)),
    subscribe: (func: Listener) => observers.push(func),
    unsubscribe: (func: Listener) => {
      ;[...observers].forEach((observer, index) => {
        if (observer === func) {
          observers.splice(index, 1)
        }
      })
    },
  })
}
