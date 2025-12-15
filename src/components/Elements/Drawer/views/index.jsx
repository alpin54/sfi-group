// -- libraries
import { useEffect, useRef } from 'react';

// -- styles
import style from '@elements/Drawer/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

let openDrawerCount = 0;
const Drawer = (props) => {
  const { open, onClose, title = null, variant = 'default', children } = props;
  const drawerRef = useRef(null);
  const { enableScroll, disableScroll } = useScrollable();
  let variantStyle = '';
  if (variant === 'auth') variantStyle = style.auth;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      openDrawerCount += 1;
      disableScroll();
    }

    return () => {
      if (open) {
        openDrawerCount -= 1;
        if (openDrawerCount <= 0) {
          enableScroll();
        }
      }
    };
  }, [open, disableScroll, enableScroll]);

  // Focus modal on open
  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [open]);

  // Keyboard Esc to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Overlay click to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${style.drawer} ${open ? style.drawerOpen : ''} ${variantStyle}`}
      role='dialog'
      aria-modal='true'
      aria-labelledby='drawer-title'
      tabIndex={-1}
      ref={drawerRef}>
      <div className={style.inner}>
        <div className={style.head}>
          {title && <h6 className={style.title}>{title}</h6>}
          <button className={style.close} onClick={onClose} aria-label='Close Drawer' type='button'>
            <SystemIcon name='close' />
          </button>
        </div>
        <div className={style.body}>{children}</div>
      </div>
      <div className={style.overlay} onClick={handleOverlayClick} />
    </div>
  );
};

export default Drawer;
