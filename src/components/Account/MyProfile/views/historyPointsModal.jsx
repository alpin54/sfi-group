// -- libraries
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// -- styles
import style from '@components/Account/MyProfile/styles/style.module.scss';

// -- assets
import pointLogo from '@assets/image/logo/point-logo-primary.png';
import pointLogoWhite from '@assets/image/logo/point-logo-grey.png';

// -- utils
import Currency from '@utils/currency';
import formatDate from '@utils/formatDate';

const HistoryPointsModal = (props) => {
  const { data = [], summary = {} } = props;
  const [activeTab, setActiveTab] = useState(0);
  const tab = data[activeTab] || { name: data[activeTab], list: [] };
  const tabVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 }
  };

  return (
    <div className={style.modal}>
      {/* Highlight/ summary */}
      <div className={`${style.card} ${style.cardSummary}`}>
        <div className={style.cardBox}>
          <div className={style.cardContent}>
            <div className={style.cardSummaryCol}>
              <Image src={pointLogo} width={24} height={24} alt='history' className={style.cardSummaryImg} />
              <p className={style.cardSummaryTitle}>
                {summary.total} <span>{Currency.formatRp(summary.value)}</span>
              </p>
            </div>
            <div className={style.cardSummaryCol}>
              <Image src={pointLogoWhite} width={16} height={16} alt='history' className={style.cardSummaryImgSmall} />
              <p className={style.cardSummaryDesc}>10 expire 1 Jan 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={style.modalTabs}>
        <div className={style.modalTabsControl}>
          {data.map((item, idx) => (
            <button
              className={`${style.modalTabsControlBtn} ${activeTab === idx ? style.activeTab : ''}`}
              key={item.id}
              onClick={() => setActiveTab(idx)}
              type='button'>
              {item.name}
              {activeTab === idx && (
                <motion.div
                  layoutId='tab-underline'
                  className={style.tabUnderline}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content with framer-motion transition */}
        <div className={style.modalTabsContent}>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.2 }}
              className={style.modalTabsPanel}>
              {tab.list && tab.list.length ? (
                tab.list.map((d, i) => (
                  <div className={style.modalTabsRow} key={d.id}>
                    <div className={style.modalTabsDetail}>
                      <p className={style.modalTabsTitle}>
                        {d.order ? (
                          <>
                            {d.order?.quantity ?? '-'} Item
                            {d.order?.order_code && <span> ・ {d.order.order_code.replace('ORD', 'ODR')}</span>}
                          </>
                        ) : (
                          d.name || '-'
                        )}
                      </p>
                      <p className={style.modalTabsDesc}>{formatDate(d.date)}</p>
                    </div>
                    <div className={style.modalTabsValue}>
                      <Image className={style.modalTabsIcon} src={pointLogo} alt='logo' width={16} height={16} />
                      <p className={style.modalTabsPointsChange}>{d.point}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className={style.modalTabsEmpty}>No history</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HistoryPointsModal;
