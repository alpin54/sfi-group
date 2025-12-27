'use client';

// -- library
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// -- assets (use asset map for logos)
// import shippingLogos from '@components/Order/OrderSection/data/shipping';
// import paymentIcons from '@components/Order/OrderSection/data/payment';

// -- styles
import style from '@components/Order/OrderSection/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

// -- components
import OrderItem from '@components/Order/OrderItem/views';

// const normalizeKey = (raw) => {
//   if (!raw && raw !== 0) return '';
//   return String(raw)
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, '-')
//     .replace(/-+/g, '-')
//     .replace(/(^-|-$)/g, '');
// };

// const resolvePaymentImage = (data, paymentMap) => {
//   // Try many common places for payment method info (payments array, top-level fields, etc.)
//   const firstPayment = Array.isArray(data.payments) && data.payments.length > 0 ? data.payments[0] : null;

//   const candidates = [
//     // explicit field that some views might set
//     data.payment_method ?? data.paymentMethod ?? data.payment?.method,
//     // payments array common fields
//     firstPayment?.payment_method,
//     firstPayment?.response_payload?.payment_channel,
//     firstPayment?.response_payload?.ewallet_type,
//     firstPayment?.response_payload?.payment_method,
//     firstPayment?.payment_channel,
//     // sometimes method key included in view mapping
//     data.payment?.methodKey,
//     // raw fallback string
//     data.paymentMethod
//   ];

//   for (const raw of candidates) {
//     if (!raw && raw !== 0) continue;
//     const key = normalizeKey(raw);
//     if (!key) continue;
//     // direct match
//     if (paymentMap[key]) return paymentMap[key];
//     // try contains match (e.g. "gopay" in "GOPAY")
//     const keys = Object.keys(paymentMap);
//     for (const k of keys) {
//       if (key.includes(k) || k.includes(key)) return paymentMap[k];
//     }
//   }

//   // fallback default image path
//   return '/images/payments/default.png';
// };

// const resolveShippingImage = (shipment, shippingMap) => {
//   if (!shipment) return '/images/shipping-default.png';
//   const raw = shipment.courier ?? shipment.provider ?? shipment.code ?? shipment.name ?? shipment.service;
//   const key = normalizeKey(raw);
//   if (key && shippingMap[key]) return shippingMap[key];

//   // try contains match
//   const keys = Object.keys(shippingMap);
//   for (const k of keys) {
//     if (key.includes(k) || k.includes(key)) return shippingMap[k];
//   }

//   return '/images/shipping-default.png';
// };

const Order = (props) => {
  const { data } = props;
  const profile = String(data?.profile ?? '').toLowerCase();
  const isDealer = profile === 'dealer';
  const isMember = profile === 'member';
  const totalQty = Array.isArray(data?.list)
    ? data.list.reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0)
    : 0;
  const [copied, setCopied] = useState(false);

  // // derive payment image and shipping image (memoized)
  // const paymentImg = useMemo(() => resolvePaymentImage(data || {}, paymentIcons), [data]);
  // const shipment = data?.shipments && data.shipments.length > 0 ? data.shipments[0] : null;
  // const shippingImg = useMemo(() => resolveShippingImage(shipment, shippingLogos), [shipment]);

  const handleCopyTracking = () => {
    const text = data?.shipments?.[0]?.tracking_number;
    if (!text) return;
    const onSuccess = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(onSuccess)
        .catch(() => fallbackCopy(text, onSuccess));
    } else {
      fallbackCopy(text, onSuccess);
    }
  };

  // const fallbackCopy = (text, cb) => {
  //   try {
  //     const ta = document.createElement('textarea');
  //     ta.value = text;
  //     ta.style.position = 'fixed';
  //     ta.style.top = '-1000px';
  //     ta.style.opacity = '0';
  //     document.body.appendChild(ta);
  //     ta.select();
  //     document.execCommand('copy');
  //     document.body.removeChild(ta);
  //     cb && cb();
  //   } catch (e) {}
  // };

  return (
    <section className={style.order}>
      <div className='container'>
        <div className={style.inner}>
          {/* head */}
          <div className={style.head}>
            <h1 className={style.title}>{data.title}</h1>
            <h4 className={style.subtitle}>{data.subtitle}</h4>
          </div>
          {/* body */}
          <div className={style.body}>
            {/* meta */}
            <div className={style.meta}>
              <h6 className={style.status}>
                <span className={style.divider}>&bull;</span> {data.order_status}
              </h6>
              <div className={style.info}>
                <h6 className={style.code}>
                  <SystemIcon name='handbag-off' />
                  <span>{data.order_code}</span>
                </h6>
                <span className={style.divider}>&bull;</span>
                <h6 className={style.datetime}>{data.order_datetime}</h6>
              </div>
            </div>
            {/* list */}
            <div className={style.list}>
              {data.list.map((item, index) => (
                <OrderItem key={`order-item-${index}`} data={item} currency='IDR' />
              ))}
            </div>
            {/* order */}
            <div className={style.summary}>
              <div className={style.subtotal}>
                <div className={style.row}>
                  <h6 className={style.label}>
                    {data.subtotal.label} <span className={style.divider}>&bull;</span> {totalQty} Item
                  </h6>
                  <h6 className={style.value}>{Currency.formatRp(data.subtotal.value)}</h6>
                </div>
                <div className={style.row}>
                  <h6 className={style.label}>{data.shipping_fee.label}</h6>
                  <h6 className={style.value}>{Currency.formatRp(data.shipping_fee.value)}</h6>
                </div>
                <div className={style.row}>
                  <h6 className={style.label}>
                    {data.discount_dealer.label} <span className={style.divider}>&bull;</span>{' '}
                    {data.discount_dealer.note}
                  </h6>
                  <h6 className={style.value}>-{Currency.formatRp(data.discount_dealer.value)}</h6>
                </div>
                <div className={style.row}>
                  <h6 className={style.label}>
                    {data.discount_general.label} <span className={style.divider}>&bull;</span>{' '}
                    {data.discount_general.note}
                  </h6>
                  <h6 className={style.value}>-{Currency.formatRp(data.discount_general.value)}</h6>
                </div>
                {isMember && (
                  <div className={style.row}>
                    <h6 className={style.label}>{data.point_redemption.label}</h6>
                    <h6 className={style.value}>
                      <span className={style.point}>
                        <SystemIcon name='e-voucher-circle' /> - {data.point_redemption.point}
                      </span>
                      <span className={style.divider}>&bull;</span>-{Currency.formatRp(data.point_redemption.value)}
                    </h6>
                  </div>
                )}
              </div>
              <div className={style.total}>
                <div className={style.row}>
                  <h6 className={style.label}>{data.total_amount.label}</h6>
                  <h6 className={style.value}>{Currency.formatRp(data.total_amount.value)}</h6>
                </div>
                <div className={style.row}>
                  {isDealer && (
                    <>
                      <h6 className={style.label}>{data.voucher_earned_dealer.label}</h6>
                      <h6 className={style.value}>
                        <SystemIcon name='e-voucher' />
                        {Currency.formatRp(data?.voucher_earned_dealer.value)}
                      </h6>
                    </>
                  )}{' '}
                  {isMember && (
                    <>
                      <h6 className={style.label}>{data.voucher_earned_member.label}</h6>
                      <h6 className={style.value}>
                        <SystemIcon name='e-voucher-circle' />
                        {data?.voucher_earned_member.value}
                      </h6>
                    </>
                  )}
                </div>
              </div>
              <div className={style.payment}>
                <div className={style.paymentMethod}>
                  <div className={style.paymentLogo}>
                    <Image
                      className={style.paymentLogoEl}
                      src={data.payment_method.icon}
                      alt={data.payment_method.name}
                      width={64}
                      height={32}
                    />
                  </div>
                  <h6 className={style.paymentName}>{data.payment_method.name}</h6>
                </div>
                <h6 className={style.paymentTotal}>
                  <span>Total Payment:</span> {Currency.formatRp(data.total_amount.value)}
                </h6>
              </div>
              <div className={style.shipping}>
                <div className={style.shippingMethod}>
                  <div className={style.shippingLogo}>
                    <Image
                      className={style.shippingLogoEl}
                      src={data.shipping_detail.courier.icon}
                      alt={data.shipping_detail.courier.name}
                      width={64}
                      height={32}
                    />
                  </div>
                  <h6 className={style.shippingName}>{data.shipping_detail.courier.name}</h6>
                </div>
                <div className={style.shippingList}>
                  <div className={style.shippingItem}>
                    <h6 className={style.shippingLabel}>{data.shipping_detail.recipient.label}</h6>
                    <ul className={style.shippingProfile}>
                      <li>
                        <SystemIcon name='user-circle-dashed' />
                        {data.shipping_detail.recipient.name}
                      </li>
                      <li>
                        <SystemIcon name='phone' />
                        {data.shipping_detail.recipient.phone}
                      </li>
                    </ul>
                  </div>
                  <div className={style.shippingItem}>
                    <h6 className={style.shippingLabel}>{data.shipping_detail.delivery_address.label}</h6>
                    <div className={style.shippingBox}>
                      <SystemIcon name='map-pin-fill' />
                      <p>{data.shipping_detail.delivery_address.address}</p>
                    </div>
                  </div>
                  <div className={style.shippingItem}>
                    <h6 className={style.shippingLabel}>{data.shipping_detail.tracking_no.label}</h6>
                    <div className={style.shippingTracking}>
                      <button
                        onClick={handleCopyTracking}
                        className={`${style.shippingTrackingBtn} ${copied ? style.shippingTrackingCopied : ''}`}
                        type='button'>
                        <span>{data.shipping_detail.tracking_no.number}</span>
                        {copied && <span className={`${style.badge} ${style.badgeGreen}`}>Copied!</span>}
                        <SystemIcon name='copy'></SystemIcon>
                      </button>
                    </div>
                  </div>
                  <div className={style.shippingItem}>
                    <h6 className={style.shippingLabel}>{data.shipping_detail.order_tracking.label}</h6>
                    <div className={style.shippingTrackingRow}>
                      {data.shipping_detail.order_tracking.list.map((item, index) => (
                        <div key={`shipping-tracking-order-${index}`} className={style.shippingTrackingCol}>
                          <div className={style.shippingLeft}>
                            <h6 className={style.shippingLeftTime}>{item.time}</h6>
                            <h6 className={style.shippingLeftDate}>{item.date}</h6>
                          </div>
                          <div className={style.shippingRight}>
                            <h6 className={style.shippingRightDescription}>{item.description}</h6>
                            <div className={style.shippingRightLogo}>
                              <Image
                                className={style.shippingRightLogoEl}
                                src={item.logo}
                                alt={item.name}
                                width={60}
                                height={22}
                              />
                              <h6 className={style.shippingRightLogoName}>{item.name}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
