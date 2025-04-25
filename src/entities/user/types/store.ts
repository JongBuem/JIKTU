import { User } from "../types";

export interface UserState {
  currentUser: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
