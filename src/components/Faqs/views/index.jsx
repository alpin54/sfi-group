'use client';

// -- libraries
import { useState } from 'react';
import Image from 'next/image';

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
              {data.empty?.description || 'Looks like there are no frequently asked questions yet. Check back later!'}
            </p>
          </div>
        ) : (
          <div className={style.faqsWrapp}>
            <ul className={style.faqsList}>
              {data.list.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <li key={item.id || idx} className={`${style.faqsItem} ${isOpen ? style.active : ''}`}>
                    <div
                      className={style.faqsItemHead}
                      role='button'
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => handleToggle(idx)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle(idx)}>
                      <div className={style.faqsItemContent}>
                        <h6 className={style.faqsItemTitle}>{item.title}</h6>

                        <div className={style.faqsItemBody + (isOpen ? ' ' + style.open : '')}>
                          <div className={style.faqsItemDetails + (isOpen ? ' ' + style.show : '')}>
                            {isOpen && <p className={style.faqsItemDesc}>{item.description}</p>}
                          </div>
                        </div>
                      </div>

                      <button
                        className={style.faqsItemToggle}
                        aria-label={isOpen ? 'Close detail' : 'Open detail'}
                        type='button'
                        tabIndex={-1}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(idx);
                        }}>
                        <span className={isOpen ? style.iconHidden : style.iconVisible}>
                          <SystemIcon name='add' />
                        </span>
                        <span className={isOpen ? style.iconVisible : style.iconHidden}>
                          <SystemIcon name='mines' />
                        </span>
                      </button>
                    </div>
                  </li>
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
