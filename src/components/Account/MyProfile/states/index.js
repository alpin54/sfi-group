// --- zustand
import { create } from 'zustand';

const useStateUser = create((set) => ({
  user: '',
  setUser: (val) => set({ user: val })
}));

export default useStateUser;
