import { describe, expect, it, vi } from 'vitest'

import { createObservable } from './observable'

describe('createObservable', () => {
  it('returns a frozen observable with notify/subscribe/unsubscribe', () => {
    const obs = createObservable<number>()
    expect(typeof obs.notify).toBe('function')
    expect(typeof obs.subscribe).toBe('function')
    expect(typeof obs.unsubscribe).toBe('function')
    expect(Object.isFrozen(obs)).toBe(true)
  })

  it('notify forwards the value and id to every subscribed listener', () => {
    const obs = createObservable<string>()
    const a = vi.fn()
    const b = vi.fn()
    obs.subscribe(a)
    obs.subscribe(b)
    obs.notify('payload', 'event-1')
    expect(a).toHaveBeenCalledWith('payload', 'event-1')
    expect(b).toHaveBeenCalledWith('payload', 'event-1')
  })

  it('does nothing when notify is called with no subscribers', () => {
    const obs = createObservable<number>()
    expect(() => obs.notify(1, 'x')).not.toThrow()
  })

  it('unsubscribe stops a specific listener from receiving future notifications', () => {
    const obs = createObservable<number>()
    const keep = vi.fn()
    const drop = vi.fn()
    obs.subscribe(keep)
    obs.subscribe(drop)
    obs.unsubscribe(drop)
    obs.notify(42, 'event')
    expect(keep).toHaveBeenCalledWith(42, 'event')
    expect(drop).not.toHaveBeenCalled()
  })

  it('unsubscribing an unknown listener is a no-op', () => {
    const obs = createObservable<number>()
    const stranger = vi.fn()
    expect(() => obs.unsubscribe(stranger)).not.toThrow()
  })

  it('the same listener subscribed twice receives notifications twice', () => {
    const obs = createObservable<number>()
    const fn = vi.fn()
    obs.subscribe(fn)
    obs.subscribe(fn)
    obs.notify(1, 'event')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
