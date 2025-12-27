// -- libraries
import Image from 'next/image';

// -- assets
import pointLogo from '@assets/image/logo/point-logo-primary.png';

// -- styles
import style from '@components/Account/MyProfile/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import Button from '@components/Elements/Button/views';
import Modal from '@elements/Modal/views';

// -- components
import HistoryPointsModal from '@components/Account/MyProfile/views/historyPointsModal';

const MemberProfile = (props) => {
  const {
    data,
    showModal,
    showModalHistory,
    setShowModalHistory,
    renderModalContent,
    renderCard,
    saving,
    parentLoading,
    handleCancel,
    handleSave,
    editRow
  } = props;

  return (
    <>
      {data.points_balance && (
        <div className={style.summary}>
          <div className={`${style.card} ${style.cardSummary}`}>
            <div className={style.cardBox}>
              <div className={style.cardHeader}>
                <div className={style.cardLabel}>Point Balance</div>
              </div>
              <div className={style.cardContent}>
                <div className={style.cardSummaryText}>
                  <div className={style.cardSummaryValue}>
                    <Image className={style.cardSummaryImg} src={pointLogo} width={24} height={24} alt='logo' />
                    <p className={style.cardSummaryTitle}>
                      {data.points_balance.total} <span>{Currency.formatRp(data.points_balance.value)}</span>
                    </p>
                  </div>
                </div>
                <div className={style.cardSummaryAction}>
                  <Button
                    variant='ghost'
                    size='small'
                    icon='caret-right'
                    aria-label='Point Balance'
                    onClick={() => setShowModalHistory(true)}>
                    History
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.info}>
        {renderCard('name', data.name)}
        {renderCard('phone', data.phone)}
        {renderCard('email', data.email)}
        {renderCard('date_of_birth', data.date_of_birth)}
        {renderCard('gender', data.gender)}
        {renderCard('password', data.updated_at)}
      </div>
      <div className={style.offer}>
        <h3 className={style.offerTitle}>Grow with Us Join as an Official Dealer</h3>
        <Button color='white' href='/sign-in?role=partner'>
          Become a Partner
        </Button>
      </div>
      {/* Edit Modal */}
      <Modal open={showModal} onClose={handleCancel} title={false}>
        <div className={style.modal}>
          {renderModalContent()}
          <div className={style.modalActions}>
            <Button variant='outlined' onClick={handleCancel} disabled={saving || parentLoading}>
              Cancel
            </Button>
            <Button onClick={() => handleSave(editRow)} disabled={saving || parentLoading}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>
      {/* History Points Modal */}
      <Modal
        open={showModalHistory}
        onClose={() => setShowModalHistory(false)}
        title='History Points'
        variant='fullscreen'>
        <HistoryPointsModal data={data.points_history} summary={data.points_balance} />
      </Modal>
    </>
  );
};

export default MemberProfile;
