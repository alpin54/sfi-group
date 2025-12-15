/**
 * React hook untuk mengaktifkan/menonaktifkan scroll pada <body>
 *
 * Usage:
 * const { enableScroll, disableScroll } = useScrollable();
 * disableScroll(); // Menambah class 'rm-scroll' ke body
 * enableScroll();  // Menghapus class 'rm-scroll' dari body
 */

// -- libraries
import { useCallback } from 'react';

const useScrollable = () => {
  // Fungsi untuk mengaktifkan scroll (menghapus class)
  const enableScroll = useCallback(() => {
    document.body.classList.remove('rm-scroll');
  }, []);

  // Fungsi untuk menonaktifkan scroll (menambah class)
  const disableScroll = useCallback(() => {
    document.body.classList.add('rm-scroll');
  }, []);

  return {
    enableScroll,
    disableScroll
  };
};

export default useScrollable;
