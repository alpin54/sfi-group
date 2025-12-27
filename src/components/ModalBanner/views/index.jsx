'use client';

// -- libraries
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/ModalBanner/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';
import SystemIcon from '@components/Elements/SystemIcon/views';

const ModalBanner = (props) => {
  const { data, openInitially = false, onClose } = props;
  const [open, setOpen] = useState(Boolean(openInitially));

  useEffect(() => {
    setOpen(Boolean(openInitially));
  }, [openInitially]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    if (typeof onClose === 'function') onClose();
  };

  if (!open) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    lazyLoad: false
  };

  const renderSlide = (item, idx) => (
    <div className={style.slide} key={item.id ?? idx}>
      <Link href={item.url} className={style.coverLink} aria-label={item.title} onClick={closeModal} />
      <div className={style.inner}>
        <div className={style.left}>
          {item.image && (
            <div className={style.imageWrap}>
              <Image
                src={item.image}
                alt={item.title}
                width={420}
                height={240}
                priority={idx === 0}
                className={style.image}
              />
            </div>
          )}
        </div>

        <div className={style.right}>
          <h4 className={style.title}>{item.title}</h4>
          {item.subtitle && <h6 className={style.subtitle}>{item.subtitle}</h6>}
          {item.description && <p className={style.desc}>{item.description}</p>}
          {item.button_text && (
            <div className={style.actionBtn}>
              <Button href={item.button_url} variant='primary' aria-label={item.button_text} onClick={closeModal}>
                {item.button_text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={style.modalRoot} role='dialog' aria-modal='true' aria-label='Promotional Banner'>
      <div className={style.backdrop} onClick={closeModal} data-testid='backdrop' />
      <div className={style.modal}>
        <button className={style.close} onClick={closeModal} aria-label='Close modal'>
          <SystemIcon name='close' className={style.closeIcon} />
        </button>

        <div className={style.content}>
          {data && Array.isArray(data.list) && data.list.length > 1 ? (
            <Slider {...settings} className={style.slider}>
              {data.list.map((it, i) => renderSlide(it, i))}
            </Slider>
          ) : (
            <div className={style.single}>{data.list && data.list.map((it, i) => renderSlide(it, i))}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalBanner;
