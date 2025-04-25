import { create } from "zustand";
import { UserState } from "../types";

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
  clearUser: () => set({ currentUser: null }),
}));
