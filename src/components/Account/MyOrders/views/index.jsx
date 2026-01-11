'use client';

// -- libraries
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// -- styles
import style from '@components/Account/MyOrders/styles/style.module.scss';

// -- assets
import ImageNotFound from '@assets/image/dummy/order-not-found.svg';
import PointLogo from '@assets/image/icon/reward/point-logo.png';

// -- utils
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Empty from '@elements/Empty/views';
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';
import ModalReviewView from 'components/Account/MyOrders/views/modalReview.jsx';

// Tab labels
const tabs = ['All', 'To Pay', 'Shipped', 'Delivered', 'Cancelled'];

const MyOrdersView = (props) => {
  const { data } = props;
  const [selectedTab, setSelectedTab] = useState('All');
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  const statusAlias = {
    PENDING: 'To Pay',
    PROCESSING: 'Shipped',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    RETURNED: 'Cancelled'
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return style.statusPending;
      case 'SHIPPED':
        return style.statusShipped;
      case 'DELIVERED':
        return style.statusDelivered;
      case 'CANCELLED':
      case 'RETURNED':
        return style.statusCancelled;
      case 'PROCESSING':
        return style.statusProcessing;
      default:
        return '';
    }
  };

  // Filter orders by tab dengan fallback aman
  const filteredOrders =
    selectedTab === 'All' ? data || [] : (data || []).filter((order) => statusAlias[order?.status] === selectedTab);

  const handleShowReviewModal = (order) => {
    setReviewModal(true);
    setSelectedOrder(order);
  };

  const handleCloseReviewModal = () => {
    setReviewModal(false);
    setSelectedOrder(null);
  };

  // -- togle expand order details

  return (
    <>
      <div className={style.order}>
        {/* Tabs */}
        <div className={style.orderTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${style.orderTabsItem} ${selectedTab === tab ? style.active : ''}`}
              onClick={() => setSelectedTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className={style.orderList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, idx) => (
              <div className={style.orderCard} key={idx}>
                <Link className={style.orderLink} href={`/account/orders/${order.order_code}`}></Link>

                {/* Header */}
                <div className={style.orderHeader}>
                  <div className={style.orderHeaderLeft}>
                    <span className={`${style.status} ${getStatusClass(order.status)}`}>
                      {statusAlias[order.status] || order.status}
                    </span>
                    {order.status === 'PENDING' && order.countdown ? (
                      <>
                        <span className={style.countdown}>{order.countdown}</span>
                      </>
                    ) : null}
                  </div>
                  <div className={style.orderHeaderRight}>
                    <span className={style.orderCode}>
                      <SystemIcon name='handbag-off' />
                      <span>{order.order_code}</span>
                    </span>
                    <span className={style.orderCreated}>{order.created_at}</span>
                  </div>
                </div>

                {/* Items */}
                <div className={style.product}>
                  <div className={style.productWrapper}>
                    {order.items.map((item, itemIdx) => {
                      const isHidden = itemIdx > 0 && !expandedOrders[order.id];

                      return (
                        <div
                          key={item.id + '-' + itemIdx}
                          className={style.productItem}
                          style={{ display: isHidden ? 'none' : 'flex' }}>
                          <div className={style.productImg}>
                            <Image
                              className={style.productImgEl}
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={104}
                            />
                          </div>
                          <div className={style.productText}>
                            <p className={style.productName}>{item.name}</p>
                            <div className={style.productVariant}>
                              <p className={style.productDesc}>
                                <span>Variant:</span>
                                <span>{item.variant.material_name}</span>
                              </p>
                              <p className={style.productDesc}>
                                <span>Quantity:</span>
                                <span>{item.qty}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={style.productSummary}>
                    {order.items.length > 1 && (
                      <p className={style.moreProducts}>+ {order.items.length - 1} More Products</p>
                    )}
                    <div className={style.productWrapp}>
                      {((order.points_earned ?? 0) > 0 || (order.points_earned_total ?? 0) > 0) && (
                        <div className={style.points}>
                          {(order.points_earned ?? 0) > 0 && (
                            <>
                              <p className={style.pointsText}>Points Earned: </p>
                              <div className={style.pointsIcon}>
                                <Image src={PointLogo} alt='Points' width={14} height={14} />
                                <span className={style.pointsCount}> +{order.points_earned}</span>
                              </div>
                            </>
                          )}
                          {(order.points_earned_total ?? 0) > 0 && (
                            <p className={style.pointsTextMobile}>
                              You&apos;ve Earned <span>{Currency.formatRp(order.points_earned_total)} </span> Voucher
                            </p>
                          )}
                        </div>
                      )}

                      <p className={style.price}>
                        Order Total: <span>{Currency.formatRp(order.total_amount)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.productActions}>
                  {order.status === 'PENDING' ? (
                    <>
                      <Button variant='outlined'>Change Payment</Button>
                      <Button>Pay Now</Button>
                    </>
                  ) : order.status === 'SHIPPED' ? (
                    <>
                      <Button variant='outlined' disabled>
                        Received
                      </Button>
                      <Button>Details</Button>
                    </>
                  ) : order.status === 'DELIVERED' ? (
                    <>
                      <Button variant='outlined' onClick={() => handleShowReviewModal(order)}>
                        Review for 8 points
                      </Button>
                      <Button>Details</Button>
                    </>
                  ) : (
                    <Button>Details</Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={style.orderEmpty}>
              <Empty
                image={ImageNotFound}
                size='large'
                title='Oops, there are no transactions here yet.'
                description='Check back again later!'
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        open={reviewModal}
        onClose={handleCloseReviewModal}
        title='Review Product'
        size='medium'
        variant='fullscreen'>
        {selectedOrder && <ModalReviewView data={selectedOrder} />}
      </Modal>
    </>
  );
};

export default MyOrdersView;
