// -- libraries
import { useEffect } from 'react';

const useBrowserCheck = () => {
  useEffect(() => {
    let browserClass = 'dekstop-browser';
    const htmlElement = document.documentElement;
    const ua = navigator.userAgent;

    if (/Android/i.test(ua)) {
      browserClass = 'android-browser';
    } else if (/BlackBerry/i.test(ua)) {
      browserClass = 'blackberry-browser';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      browserClass = 'ios-browser';
    } else if (/IEMobile/i.test(ua)) {
      browserClass = 'windows-phone-browser';
    }

    htmlElement.classList.add(browserClass);

    // Optional: clean up jika perlu (hapus class saat unmount)
    return () => {
      htmlElement.classList.remove(browserClass);
    };
  }, []);
};

export default useBrowserCheck;
