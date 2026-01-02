// --- zustand
import { create } from 'zustand';

const useStateHeader = create((set) => ({
  menu: '',
  setMenu: (val) => set({ menu: val }),
  openAuth: '',
  setOpenAuth: (val) => set({ openAuth: val }),
  totalCart: 0,
  setTotalCart: (val) => set({ totalCart: val })
}));

export default useStateHeader;
