import { create } from 'zustand'
import { Role, AppUser, defaultUser } from '../models/User'

interface UserState {
  user: AppUser,
  setUser: (newUser: AppUser) => void,
  setRole: (newRole: Role) => void,
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (newUser: AppUser) =>
    set((state) => ({
      user: newUser
    })),
  setRole: (newRole: Role) => 
    set((state) => ({
      user: {
        ...state.user,
        role: newRole,
      },
    }
  )),
}))

export default useUserStore