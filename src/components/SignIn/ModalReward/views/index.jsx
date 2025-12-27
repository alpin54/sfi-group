// -- libraries
import { useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/SignIn/ModalReward/styles/style.module.scss';

// -- elements
import SystemIcon from '@components/Elements/SystemIcon/views';
import Button from '@components/Elements/Button/views';

const RewardModal = ({ open, onClose, title = '', items = [], cta = null }) => {
  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // lock body scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    };
    // prevent page scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev.overflow || '';
      document.body.style.paddingRight = prev.paddingRight || '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={style.overlay} role='dialog' aria-modal='true' aria-labelledby='reward-modal-title'>
      <div className={style.backdrop} onClick={onClose} aria-hidden='true' />
      <div className={style.panel} role='document' aria-live='polite'>
        <div className={style.header}>
          <h6 id='reward-modal-title' className={style.title}>
            {title}
          </h6>
          <button className={style.closeBtn} onClick={onClose} aria-label='Close'>
            <SystemIcon name='close' className={style.closeIcon} />
          </button>
        </div>

        <div className={style.body}>
          <ul className={style.itemList}>
            {items && items.length > 0 ? (
              items.map((it) => (
                <li key={it.id || it.title} className={style.item}>
                  <div className={style.itemMedia}>
                    {it.icon ? (
                      <Image src={it.icon} alt={it.title || 'icon'} width={36} height={36} />
                    ) : (
                      <div className={style.itemIconPlaceholder} aria-hidden='true' />
                    )}
                  </div>
                  <div className={style.itemContent}>
                    <h6 className={style.itemTitle}>{it.title}</h6>
                    {it.description && <p className={style.itemDesc}>{it.description}</p>}
                  </div>
                </li>
              ))
            ) : (
              <li className={style.empty}>No reward data</li>
            )}
          </ul>
        </div>

        <div className={style.footer}>
          <Button
            className={style.ctaBtn}
            variant='primary'
            size='md'
            rounded={false}
            onClick={() => {
              onClose && onClose();
              cta && cta.onClick && cta.onClick();
            }}
            aria-label={cta ? cta.label : 'Call to action'}>
            <span> {cta ? cta.label : 'Call to action'}</span>
            <SystemIcon name='caret-right' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
