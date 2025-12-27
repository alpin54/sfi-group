// -- libraries
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// -- styles
import style from '@components/Account/MyProfile/styles/style.module.scss';

// -- assets
import pointLogo from '@assets/image/logo/logo-voucher-primary.png';

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
            <div className={style.cardSummaryText}>
              <div className={style.cardSummaryValue}>
                <Image src={pointLogo} width={24} height={24} alt='history' className={style.cardSummaryImg} />
                <p className={style.cardSummaryTitle}>{summary.total}</p>
              </div>
              <p className={style.cardSummaryDesc}>Valid Until {formatDate(summary.valid_until)}</p>
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
                      {tab.id === 2 && d.used && (
                        <ul className={style.modalTabsUsed}>
                          <li>{d.used.quantity} Item</li>
                          <li>{d.used.order_code}</li>
                          <li>{formatDate(d.used.created_at)}</li>
                        </ul>
                      )}
                      {tab.id === 3 && d.valid_until && (
                        <p className={style.modalTabsExpired}>Expired on {formatDate(d.valid_until)}</p>
                      )}
                      {tab.id === 4 && d.note && <p className={style.modalTabsNote}>{d.note}</p>}
                      <p className={style.modalTabsTitle}>{d.name}</p>
                      <p className={style.modalTabsDesc}>Min. Spend {Currency.formatRp(d.total)}</p>
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
