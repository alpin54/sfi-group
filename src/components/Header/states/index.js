// --- zustand
import { create } from 'zustand';

const useStateHeader = create((set) => ({
  menu: '',
  setMenu: (val) => set({ menu: val }),
  openAuth: '',
  setOpenAuth: (val) => set({ openAuth: val })
}));

export default useStateHeader;
