'use client';

// -- libraries
import { useEffect, useRef, useState } from 'react';

// -- hooks
import useBrowserCheck from '@hooks/useBrowserCheck';
import useScrollable from '@hooks/useScrollable';

// -- states
import useStateHeader from '@components/Header/states';

const RESIZE_DEBOUNCE = 200;

const MainSite = (props) => {
  const { children, variant = 'default' } = props;
  const rtimeRef = useRef();
  const timeoutRef = useRef(false);
  const lastWindowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
  const resizeTimerRef = useRef();
  const { enableScroll } = useScrollable();
  const { menu } = useStateHeader();

  // client-only state to avoid reading window during server render and causing hydration mismatch
  const [noPadding, setNoPadding] = useState(false);

  // Check browser compatibility
  useBrowserCheck();

  // compute padding class after mount (client-side) to avoid SSR/client mismatch
  // useEffect(() => {
  //   const pathIncludesShop = typeof window !== 'undefined' && window.location.pathname.includes('shop');
  //   setNoPadding(menu === 'category' || pathIncludesShop);
  // }, [menu]);

  useEffect(() => {
    // Main effect, runs on mount and after resize ends
    const handleEffect = () => {
      document.querySelectorAll('.main-site').forEach((el) => {
        el.classList.remove('main-site--hide');
      });
      enableScroll();
    };

    // run effect when mount
    handleEffect();
    document.body.classList.remove('hold-transition');

    // Handle resize end
    const handleResizeEnd = () => {
      if (new Date() - rtimeRef.current < RESIZE_DEBOUNCE) {
        resizeTimerRef.current = setTimeout(handleResizeEnd, RESIZE_DEBOUNCE);
      } else {
        timeoutRef.current = false;
        document.body.classList.remove('hold-transition');
        lastWindowWidthRef.current = window.innerWidth;
        handleEffect();
      }
    };

    // Handle resize
    const onResize = () => {
      rtimeRef.current = new Date();
      if (!timeoutRef.current) {
        if (lastWindowWidthRef.current !== window.innerWidth) {
          timeoutRef.current = true;
          document.body.classList.add('hold-transition');
          resizeTimerRef.current = setTimeout(handleResizeEnd, RESIZE_DEBOUNCE);
        }
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [enableScroll]);

  return (
    <div
      className={`main-site main-site--hide ${variant === 'auth' ? 'main-site--auth' : ''} ${noPadding ? 'main-site--no-padding' : ''}`}>
      {children}
    </div>
  );
};

export default MainSite;
