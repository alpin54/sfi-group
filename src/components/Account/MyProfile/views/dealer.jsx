// -- libraries
import Image from 'next/image';

// -- assets
import pointLogo from '@assets/image/logo/logo-voucher-primary.png';

// -- styles
import style from '@components/Account/MyProfile/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';
import formatDate from '@utils/formatDate';

// -- elements
import Button from '@components/Elements/Button/views';
import Modal from '@elements/Modal/views';
import SystemIcon from '@components/Elements/SystemIcon/views';

// -- components
import VoucherModal from '@components/Account/MyProfile/views/voucherModal';

const MemberProfile = (props) => {
  const {
    data,
    showModal,
    showModalVoucher,
    setShowModalVoucher,
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
      <div className={style.alert}>
        <div className={style.alertBox}>
          <div className={style.alertInfo}>
            <p className={style.alertTitle}>
              <SystemIcon name='warning-octagon' />
              <span>Your dealer application is under review</span>
            </p>
            <p className={style.alertNote}>Please allow 1–2 business days.</p>
          </div>
          <div className={style.alertBtn}>
            <Button color='white' size='small' href='mailto:support@example.com'>
              Contact Admin
            </Button>
          </div>
        </div>
      </div>
      {data.voucher && (
        <div className={style.summary}>
          <div className={`${style.card} ${style.cardSummary}`}>
            <div className={style.cardBox}>
              <div className={style.cardHeader}>
                <div className={style.cardLabel}>Voucher</div>
              </div>
              <div className={style.cardContent}>
                <div className={style.cardSummaryText}>
                  <div className={style.cardSummaryValue}>
                    <Image className={style.cardSummaryImg} src={pointLogo} width={24} height={24} alt='logo' />
                    <p className={style.cardSummaryTitle}>{data.voucher.total}</p>
                  </div>
                  <p className={style.cardSummaryDesc}>Valid Until {formatDate(data.voucher.valid_until)}</p>
                </div>
                <div className={style.cardSummaryAction}>
                  <Button
                    variant='ghost'
                    size='small'
                    icon='caret-right'
                    aria-label='Voucher'
                    onClick={() => setShowModalVoucher(true)}>
                    My Vouchers
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.info}>
        {renderCard('dealer', data.dealer_name)}
        {renderCard('identity', data.dealer_identity)}
        {renderCard('tax', data.dealer_tax)}
        {renderCard('name', data.name)}
        {renderCard('phone', data.phone)}
        {renderCard('email', data.email)}
        {renderCard('date_of_birth', data.date_of_birth)}
        {renderCard('gender', data.gender)}
        {renderCard('password', data.updated_at)}
        {renderCard('address', data.address)}
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
        open={showModalVoucher}
        onClose={() => setShowModalVoucher(false)}
        title='My Vouchers'
        variant='fullscreen'>
        <VoucherModal data={data.voucher.items} summary={data.voucher} />
      </Modal>
    </>
  );
};

export default MemberProfile;
