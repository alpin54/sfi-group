import { useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/ResetPassword/ModalSuccess/styles/style.module.scss';

// assets
import ImgSuccess from '@assets/image/dummy/success.svg';

// -- elements
import Button from '@components/Elements/Button/views';

const SuccessModal = ({
  open,
  onClose,
  title = '',
  description = '',
  buttonText = 'OK',
  onButtonClick = null,
  icon = null
}) => {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev.overflow || '';
      document.body.style.paddingRight = prev.paddingRight || '';
    };
  }, [open]);

  if (!open) return null;

  const handleCta = () => {
    try {
      onButtonClick && onButtonClick();
    } catch (err) {
      console.error('SuccesModal onButtonClick error', err);
    }
    onClose && onClose();
  };

  return (
    <div className={style.overlay} role='dialog' aria-modal='true' aria-labelledby='alert-modal-title'>
      <div className={style.backdrop} onClick={onClose} aria-hidden='true' />

      <div className={style.panel} role='document' aria-live='assertive'>
        <div className={style.body}>
          <div className={style.iconWrap}>
            <Image src={ImgSuccess} alt='Success Icon' width={64} height={64} className={style.icon} />
          </div>

          {title ? (
            <h4 id='alert-modal-title' className={style.title}>
              {title}
            </h4>
          ) : null}

          {description ? <p className={style.description}>{description}</p> : null}
        </div>

        <div className={style.footer}>
          <Button variant='primary' size='md' onClick={handleCta} aria-label={buttonText} className={style.ctaBtn}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
