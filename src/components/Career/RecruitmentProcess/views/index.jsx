'use client';

// -- libraries
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// -- styles
import style from '@components/Career/RecruitmentProcess/styles/style.module.scss';

// -- components
import SystemIcon from '@components/Elements/SystemIcon/views';

const RecruitmentProcess = (props) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 991.98px)');
    const handle = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);

    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle);
      else mq.removeListener(handle);
    };
  }, []);

  const toggleIndex = (i) => {
    setActiveIndex((prev) => (prev === i ? -1 : i));
  };

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const imageVariants = {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.3 }
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.6, 1]
      }
    }
  };

  const accordionContentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2, ease: 'easeOut' }
      }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.25, delay: 0.1, ease: 'easeIn' }
      }
    }
  };

  const accordionImageVariants = {
    collapsed: {
      opacity: 0,
      y: 10
    },
    expanded: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.3,
        delay: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const tabVariants = {
    inactive: {
      scale: 1
    },
    active: {
      scale: 1.01,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className={style.recruitment}>
      <div className='container'>
        <div className={style.recruitmentWrapp}>
          {/* DESKTOP:  left tabs + right image */}
          {!isMobile && (
            <>
              <div className={style.list}>
                {data.map((item, idx) => (
                  <motion.button
                    key={item.title + idx}
                    className={`${style.listItem} ${activeIndex === idx ? style.active : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    type='button'
                    aria-pressed={activeIndex === idx}
                    variants={tabVariants}
                    initial='inactive'
                    animate={activeIndex === idx ? 'active' : 'inactive'}
                    whileTap={{ scale: 0.99 }}>
                    {' '}
                    {/* 👈 Reduced from 0.98 */}
                    <span className={style.title}>{item.title}</span>
                    <motion.span
                      className={style.chev}
                      aria-hidden
                      animate={{
                        x: activeIndex === idx ? 3 : 0,
                        opacity: activeIndex === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
                      {' '}
                      <SystemIcon name='caret-right' width={16} height={16} />
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              <div className={style.content}>
                <div className={style.imageWrapp}>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={activeIndex}
                      variants={imageVariants}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      className={style.imageContainer}>
                      <Image
                        src={data[activeIndex]?.image ?? data[0]?.image}
                        alt={data[activeIndex]?.title ?? 'recruitment image'}
                        className={style.desktopImage}
                      />
                    </motion.div>
                  </AnimatePresence>
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
                      <span className={style.accordionIconWrapper}>
                        {/* Icon saat CLOSED */}
                        <motion.span
                          className={style.accordionIcon}
                          aria-hidden
                          animate={{
                            y: open ? -20 : 0, // 👈 Slide up saat open
                            opacity: open ? 0 : 1 // 👈 Fade out
                          }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
                          <SystemIcon name='caret-down' width={20} height={20} />
                        </motion.span>

                        {/* Icon saat OPEN */}
                        <motion.span
                          className={style.accordionIcon}
                          aria-hidden
                          animate={{
                            y: open ? 0 : 20, // 👈 Slide from below saat open
                            opacity: open ? 1 : 0 // 👈 Fade in
                          }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
                          <SystemIcon name='caret-up' width={20} height={20} />
                        </motion.span>
                      </span>
                    </button>

                    <motion.div
                      className={style.accordionPanel}
                      variants={accordionContentVariants}
                      initial='collapsed'
                      animate={open ? 'expanded' : 'collapsed'}>
                      <motion.div className={style.panelInner} variants={accordionImageVariants}>
                        <Image src={item.image} alt={item.title} className={style.accordionImage} />
                      </motion.div>
                    </motion.div>
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
