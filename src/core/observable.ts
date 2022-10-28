export type Listener<T> = (value: T, id: string) => void

export interface Observable<T> {
  notify: (value: T, id: string) => void
  subscribe: (listener: Listener<T>) => void
  unsubscribe: (listener: Listener<T>) => void
}

export const createObservable = <T>(): Observable<T> => {
  const observers: Listener<T>[] = []

  return Object.freeze({
    notify: (value: T, id: string) => observers.forEach((observer) => observer(value, id)),
    subscribe: (listener: Listener<T>) => observers.push(listener),
    unsubscribe: (listener: Listener<T>) => {
      ;[...observers].forEach((observer, index) => {
        if (observer === listener) {
          observers.splice(index, 1)
        }
      })
    },
  })
}
