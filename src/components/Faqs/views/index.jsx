'use client';

// -- libraries
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// -- styles
import style from '@components/Faqs/styles/style.module.scss';

// -- components
import SystemIcon from '@elements/SystemIcon/views';

const Faqs = (props) => {
  const { data } = props;
  const [openIndex, setOpenIndex] = useState(data?.list?.length ? 0 : null);

  // Dropdown handler
  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // 🎯 Framer Motion Variants
  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2, ease: 'easeOut' }
      }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.25, delay: 0.2, ease: 'easeIn' }
      }
    }
  };

  const detailsVariants = {
    collapsed: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        delay: 0.25,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className={style.faqs}>
      <div className='container'>
        <div className={style.faqsHeader}>
          <h2 className={style.faqsTitle}>{data.title}</h2>
          <p className={style.faqsDesc}>{data.description}</p>
        </div>

        {/* CONTENT */}
        {data.list.length === 0 ? (
          <div className={style.faqsEmpty}>
            <Image
              src={data.empty.img}
              alt='No FAQs Available'
              width={150}
              height={150}
              className={style.faqsEmptyImg}
            />
            <h5 className={style.faqsEmptyTitle}>{data.empty?.title || 'No FAQs Available'}</h5>
            <p className={style.faqsEmptyDesc}>
              {data.empty?.description || 'Looks like there are no frequently asked questions yet.  Check back later! '}
            </p>
          </div>
        ) : (
          <div className={style.faqsWrapp}>
            <ul className={style.faqsList}>
              {data.list.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <motion.li
                    key={item.id || idx}
                    className={`${style.faqsItem} ${isOpen ? style.active : ''}`}
                    initial={false}>
                    <div
                      className={style.faqsItemHead}
                      role='button'
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => handleToggle(idx)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle(idx)}>
                      <div className={style.faqsItemContent}>
                        <h6 className={style.faqsItemTitle}>{item.title}</h6>

                        {/* Animated Body */}
                        <motion.div
                          className={style.faqsItemBody}
                          variants={contentVariants}
                          initial='collapsed'
                          animate={isOpen ? 'expanded' : 'collapsed'}>
                          {/* Content */}
                          <motion.div className={style.faqsItemDetails} variants={detailsVariants}>
                            <p className={style.faqsItemDesc}>{item.description}</p>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Animated Toggle Button */}
                      <button
                        className={style.faqsItemToggle}
                        aria-label={isOpen ? 'Close detail' : 'Open detail'}
                        type='button'
                        tabIndex={-1}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(idx);
                        }}>
                        <span className={style.faqsItemIconWrapper}>
                          <motion.span
                            className={style.faqsItemIcon}
                            animate={
                              isOpen ? { opacity: 0, rotate: 90, scale: 0.8 } : { opacity: 1, rotate: 0, scale: 1 }
                            }
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                            <SystemIcon name='add' />
                          </motion.span>
                          <motion.span
                            className={style.faqsItemIcon}
                            animate={
                              isOpen ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -90, scale: 0.8 }
                            }
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                            <SystemIcon name='mines' />
                          </motion.span>
                        </span>
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Faqs;
