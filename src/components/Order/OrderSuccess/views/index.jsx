// 'use client'
'use client';

// -- library
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// -- assets
import imageSuccess from '@assets/image/illustration/success.svg';

// -- styles
import style from '@components/Order/OrderSuccess/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import Button from '@elements/Button/views';

const OrderSuccess = () => {
  const [orderCode, setOrderCode] = useState('');
  const clearedRef = useRef(false);

  useEffect(() => {
    // on mount, read order_code (may be set by previous flow)
    try {
      const storedOrderCode = LocalStorage.get('order_code');
      if (storedOrderCode) {
        setOrderCode(storedOrderCode);
      }
    } catch (e) {
      // ignore
      // eslint-disable-next-line no-console
      console.error('Failed to read order_code from LocalStorage', e);
    }
  }, []);

  // When orderCode becomes available, clear persisted data once
  useEffect(() => {
    if (!orderCode) return;
    if (clearedRef.current) return;

    try {
      // mark cleared to avoid repeating
      clearedRef.current = true;

      // clear separate shipping key
      if (typeof LocalStorage.remove === 'function') {
        LocalStorage.remove('shipping');
      } else {
        LocalStorage.set('shipping', null);
      }

      // update cart: remove checked items and clear voucher & shipping inside cart
      const cartObj = LocalStorage.get('cart') || { data: [], voucher: null, address: null, shipping: null };
      const existingData = Array.isArray(cartObj.data) ? cartObj.data : [];
      const remaining = existingData.filter((item) => !(item && item.checked === true));

      const nextCart = {
        ...cartObj,
        data: remaining,
        voucher: null,
        shipping: null
      };

      LocalStorage.set('cart', nextCart);

      // remove stored order_code
      if (typeof LocalStorage.remove === 'function') {
        LocalStorage.remove('order_code');
      } else {
        LocalStorage.set('order_code', null);
      }

      // emit events so other parts of UI update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('shipping:updated'));
        window.dispatchEvent(new Event('cart:updated'));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to clear persisted cart/shipping after successful order', e);
    }
  }, [orderCode]);

  return (
    <section className={style.order}>
      <div className='container'>
        <div className={style.inner}>
          <div className={style.img}>
            <Image src={imageSuccess} alt='Pesanan berhasil diprosess' width={240} height={154} />
          </div>
          <h1 className={style.title}>Pesanan berhasil diprosess</h1>
          <p className={style.description}>
            ID Pesanan {orderCode}. Pesanan sedang diproses dan akan segera dikemas. Detail pesanan telah dikirim ke
            email.
          </p>
          <Button href={`/order/detail/${orderCode}`}>Lihat Detail</Button>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
