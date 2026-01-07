'use client';

// -- libraries
import { useState } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/Checkout/CheckoutSection/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';

// -- components
import CheckoutAddress from '@components/Checkout/CheckoutAddress/views';
import CheckoutShipping from '@components/Checkout/CheckoutShipping/views';
import CheckoutSummary from '@components/Checkout/CheckoutSummary/views';

const Checkout = (props) => {
  const { data } = props;

  const [isAddressActive, setIsAddressActive] = useState(false);
  const [isShippingActive, setIsShippingActive] = useState(false);
  const isPaymentDisabled = !(isAddressActive && isShippingActive);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

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
              <CheckoutAddress onActiveChange={setIsAddressActive} onSubmitSuccess={() => setIsSuccessOpen(true)} />
              {/* shipping */}
              <CheckoutShipping data={data.shipments} onActiveChange={setIsShippingActive} />
            </div>
            <div className={style.right}>
              {/* summary */}
              <CheckoutSummary data={data} paymentDisabled={isPaymentDisabled} />
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
          <Button href='/order/detail' level='primary'>
            View Order Details
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default Checkout;
