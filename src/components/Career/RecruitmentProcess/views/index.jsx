'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from '@components/Career/RecruitmentProcess/styles/style.module.scss';
import SystemIcon from '@components/Elements/SystemIcon/views';

// Props: data = [{ title: string, image: string | importedImage }]
const RecruitmentProcess = (props) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    // breakpoint: less than 992px -> mobile/accordion
    const mq = window.matchMedia('(max-width: 991.98px)');
    const handle = (e) => setIsMobile(e.matches);
    // initialize
    setIsMobile(mq.matches);

    // add listener
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle);
      else mq.removeListener(handle);
    };
  }, []);

  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [activeIndex]);

  // handle accordion toggle on mobile: clicking same open will close (-1)
  const toggleIndex = (i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i));
  };

  // Guard: if no data
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section className={style.recruitment}>
      <div className='container'>
        <div className={style.recruitmentWrapp}>
          {/* DESKTOP: left tabs + right image */}
          {!isMobile && (
            <>
              <div className={style.list}>
                {data.map((item, idx) => (
                  <button
                    key={item.title + idx}
                    className={`${style.listItem} ${activeIndex === idx ? style.active : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    type='button'
                    aria-pressed={activeIndex === idx}>
                    <span className={style.title}>{item.title}</span>
                    <span className={style.chev} aria-hidden>
                      {/* simple chevron */}
                      <SystemIcon name='caret-right' width={16} height={16} />
                    </span>
                  </button>
                ))}
              </div>

              <div className={style.content}>
                <div className={style.imageWrapp}>
                  <Image
                    key={animateKey}
                    src={data[activeIndex]?.image ?? data[0]?.image}
                    alt={data[activeIndex]?.title ?? 'recruitment image'}
                    className={`${style.desktopImage} ${style.slideIn}`}
                  />
                </div>
              </div>
            </>
          )}

          {/* MOBILE: accordion */}
          {isMobile && (
            <div className={style.accordion}>
              {data.map((item, idx) => {
                const open = activeIndex === idx;
                return (
                  <div key={item.title + idx} className={`${style.accordionItem} ${open ? style.open : ''}`}>
                    <button
                      type='button'
                      className={style.accordionHeader}
                      onClick={() => toggleIndex(idx)}
                      aria-expanded={open}>
                      <span className={style.accordionTitle}>{item.title}</span>
                      <span className={style.accordionIcon} aria-hidden>
                        <SystemIcon name='caret-down' width={20} height={20} />
                      </span>
                    </button>

                    <div className={style.accordionPanel} style={{ maxHeight: open ? '800px' : 0 }}>
                      <div className={`${style.panelInner} ${open ? style.show : ''}`}>
                        <Image src={item.image} alt={item.title} className={style.accordionImage} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentProcess;
