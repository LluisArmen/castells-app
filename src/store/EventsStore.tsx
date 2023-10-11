import { create } from 'zustand'

interface EventState {
  event2: any,
}

const useEventStore = create<EventState>((set) => ({
  event2: '',
}))

export default useEventStore
