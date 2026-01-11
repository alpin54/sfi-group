'use client';

// -- libraries
import { useEffect, useState } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/Checkout/CheckoutSection/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- components
import CheckoutAddressGuest from '@components/Checkout/CheckoutAddressGuest/views';
import CheckoutAddressMember from '@components/Checkout/CheckoutAddressMember/views';
import CheckoutShipping from '@components/Checkout/CheckoutShipping/views';
import CheckoutSummary from '@components/Checkout/CheckoutSummary/views';

const Checkout = (props) => {
  const { data } = props;

  const profile = String(data?.profile ?? '').toLowerCase();
  const isGuest = profile === 'guest';
  const isMember = profile === 'member';
  const isDealer = profile === 'dealer';
  const isMemberOrDealer = isMember || isDealer;
  const requireAddress = isGuest;

  const [memberAddress, setMemberAddress] = useState(null);

  const [isAddressActive, setIsAddressActive] = useState(false);
  const [isShippingActive, setIsShippingActive] = useState(false);
  const isPaymentDisabled = !((requireAddress ? isAddressActive : true) && isShippingActive);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const { enableScroll, disableScroll } = useScrollable();

  // Lock body scroll when shipping fullscreen panel is open (mobile)
  useEffect(() => {
    if (showShipping) disableScroll();
    else enableScroll();

    return () => enableScroll();
  }, [showShipping, enableScroll, disableScroll]);

  return (
    <section className={style.checkout}>
      <div className='container'>
        <div className={style.inner}>
          {/* head */}
          <div className={style.head}>
            <h1 className={style.title}>{data.title}</h1>
            <h4 className={style.subtitle}>{data.subtitle}</h4>
          </div>
          {/* body */}
          <div className={style.body}>
            <div className={style.left}>
              {/* address */}
              {isGuest && <CheckoutAddressGuest onActiveChange={setIsAddressActive} />}
              {isMemberOrDealer && <CheckoutAddressMember onSubmitSuccess={setMemberAddress} />}

              {/* shipping */}
              <CheckoutShipping
                data={data.shipments}
                onActiveChange={setIsShippingActive}
                onSelectShipping={setSelectedShipping}
                profile={profile}
                hasAddress={isMemberOrDealer ? !!memberAddress : true}
                show={showShipping}
                onClose={() => setShowShipping(false)}
              />
            </div>
            <div className={style.right}>
              {/* summary */}
              <CheckoutSummary
                data={data}
                paymentDisabled={isPaymentDisabled}
                selectedShipping={selectedShipping}
                onShowShipping={() => setShowShipping(true)}
                onPayment={() => setIsSuccessOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* success modal */}
      <Modal open={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} variant='success' closeIcon='show'>
        <div className={style.modal}>
          <div className={style.modalImg}>
            <Image
              className={style.modalImgEl}
              src={data.success.image}
              alt={data.success.title}
              width={256}
              height={144}
            />
          </div>
          <h4 className={style.modalTitle}>{data.success.title} &#127881;</h4>
          <p className={style.modalDescription}>{data.success.description}</p>
          <Button href='/order/detail' size='medium' level='primary'>
            View Order Details
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default Checkout;
