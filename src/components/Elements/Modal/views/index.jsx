// -- libraries
import { useEffect, useRef } from 'react';

// -- styles
import style from '@elements/Modal/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const Modal = (props) => {
  const { open, onClose, size = 'small', variant = 'default', title, children, closeIcon = 'show' } = props;
  const modalRef = useRef(null);
  const { enableScroll, disableScroll } = useScrollable();
  let sizeStyle = '';
  let variantStyle = '';
  if (size === 'small') sizeStyle = style.small;
  if (size === 'medium') sizeStyle = style.medium;
  if (size === 'large') sizeStyle = style.large;
  if (variant === 'chart') variantStyle = style.chart;
  if (variant === 'success') variantStyle = style.success;
  if (variant === 'error') variantStyle = style.error;
  if (variant === 'warning') variantStyle = style.warning;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [open, disableScroll, enableScroll]);

  // Focus modal on open
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
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

  // if (!open) return null;

  return (
    <div
      className={`${style.modal} ${open ? style.modalOpen : ''} ${sizeStyle} ${variantStyle}`}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      tabIndex={-1}
      ref={modalRef}>
      <div className={style.inner}>
        <div className={style.head}>
          <h6 id='modal-title' className={style.title}>
            {title}
          </h6>
          {closeIcon === 'show' && (
            <button className={style.close} onClick={onClose} aria-label='Close modal' type='button'>
              <SystemIcon name='close' />
            </button>
          )}
        </div>
        <div className={style.body}>{children}</div>
      </div>
      <div className={style.overlay} onClick={handleOverlayClick} />
    </div>
  );
};

export default Modal;
