'use client';
// -- libraries
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// -- styles
import style from '@components/Account/MyOrders/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Button from '@elements/Button/views';
import Input from '@elements/Input/views';
import UploadFile from '@elements/UploadFile/views';

// Define fixed slots: 4 images + 1 video
const UPLOAD_SLOTS = ['image', 'image', 'image', 'image', 'video'];

const ModalReviewView = ({ data = {}, onCancel, onSubmit }) => {
  const items = data.items || [];
  const [openIndex, setOpenIndex] = useState(0);

  // per-item review state
  const [reviews, setReviews] = useState(
    items.map(() => ({
      rating: 5,
      comment: '',
      // files: fixed array same length as UPLOAD_SLOTS, each slot holds {id,file,previewUrl,type} or null
      files: UPLOAD_SLOTS.map(() => null)
    }))
  );

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleRating = (index, value) => {
    setReviews((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], rating: value };
      return next;
    });
  };

  const handleComment = (index, value) => {
    setReviews((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], comment: value };
      return next;
    });
  };

  const handleSlotFile = (itemIdx, slotIdx, fileObj) => {
    setReviews((prev) => {
      const next = [...prev];
      const curFiles = next[itemIdx].files.slice();
      curFiles[slotIdx] = fileObj; // fileObj or null
      next[itemIdx] = { ...next[itemIdx], files: curFiles };
      return next;
    });
  };

  const removeSlotFile = (itemIdx, slotIdx) => {
    // when removing, revoke previewUrl to avoid memory leak (UploadFile already revokes on its cleanup,
    // but we also safely revoke here if present)
    setReviews((prev) => {
      const next = [...prev];
      const curFiles = next[itemIdx].files.slice();
      const target = curFiles[slotIdx];
      if (target && target.previewUrl) {
        try {
          URL.revokeObjectURL(target.previewUrl);
        } catch (e) {}
      }
      curFiles[slotIdx] = null;
      next[itemIdx] = { ...next[itemIdx], files: curFiles };
      return next;
    });
  };

  const resetAll = () => {
    setReviews(items.map(() => ({ rating: 5, comment: '', files: UPLOAD_SLOTS.map(() => null) })));
    setOpenIndex(null);
    if (typeof onCancel === 'function') onCancel();
  };

  const submitHandler = async () => {
    // build payload: each item -> files array (only files present)
    const payload = items.map((item, idx) => {
      const r = reviews[idx];
      // flatten present files to array of File objects
      const files = r.files.filter(Boolean).map((f) => f.file);
      return {
        item_id: item.id,
        rating: r.rating,
        comment: r.comment,
        files // caller may handle File objects
      };
    });
    if (typeof onSubmit === 'function') {
      await onSubmit(payload);
    }
  };

  return (
    <div className={style.review}>
      <div className={style.orderHeader}>
        <div className={style.orderHeaderLeft}>
          <span className={`${style.status} ${style.statusDelivered}`}>Delivered</span>
          {data.countdown ? <span className={style.countdown}>{data.countdown}</span> : null}
        </div>
        <div className={style.orderHeaderRight}>
          <span className={style.orderCode}>
            <SystemIcon name='handbag-off' />
            <span>{data.order_code}</span>
          </span>
          <span className={style.orderCreated}>{data.created_at}</span>
        </div>
      </div>

      <div className={style.accordion}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const ariaId = `review-accordion-${idx}`;
          const r = reviews[idx] || { rating: 5, comment: '', files: UPLOAD_SLOTS.map(() => null) };

          return (
            <div key={`${item.id}-${idx}`} className={`${style.accordionItem} ${isOpen ? style.openAccordion : ''}`}>
              <div
                className={style.accordionHead}
                role='button'
                tabIndex={0}
                onClick={() => handleToggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleToggle(idx);
                }}
                aria-expanded={isOpen}
                aria-controls={ariaId}>
                <h6 className={style.accordionTitle}>Review Product {idx + 1}</h6>
                <div className={style.accordionToggle}>
                  <SystemIcon name='caret-down' />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={ariaId}
                    key={ariaId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className={style.accordionBody}>
                    <div className={style.productItem}>
                      <div className={style.productImg} aria-hidden>
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
                            <span>{item.variant?.material_name || '-'}</span>
                          </p>
                          <p className={style.productDesc}>
                            <span>Quantity:</span>
                            <span>
                              x{item.qty} - {Currency.formatRp(item.price)}
                            </span>
                          </p>
                          <p className={style.price}>{Currency.formatRp(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className={style.reviewRow}>
                      <p className={style.reviewLabel}>Rate your experience!</p>
                      <div className={style.reviewStar} role='radiogroup' aria-label={`Rating for ${item.name}`}>
                        {[1, 2, 3, 4, 5].map((s) => {
                          const isActive = s <= r.rating;
                          return (
                            <button
                              key={s}
                              type='button'
                              aria-checked={r.rating === s}
                              role='radio'
                              className={`${style.reviewStarBtn} ${isActive ? style.activeStar : ''}`}
                              onClick={() => handleRating(idx, s)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleRating(idx, s);
                              }}>
                              <SystemIcon name={isActive ? 'star-on' : 'star-off'} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className={style.reviewRow}>
                      <p className={style.reviewLabel}>Share your experience!</p>
                      <Input
                        variant='textarea'
                        value={r.comment}
                        placeholder='Write your review...'
                        onChange={(e) => handleComment(idx, e.target.value)}
                        rows={4}
                      />
                    </div>

                    {/* Uploads - fixed tiles */}
                    <div className={style.reviewRow}>
                      <p className={style.reviewLabel}>Upload your photo or video!</p>

                      <div className={style.reviewUploadList}>
                        {UPLOAD_SLOTS.map((slotType, slotIdx) => {
                          const slotValue = r.files[slotIdx];
                          const accept = slotType === 'video' ? 'video/*' : 'image/*';
                          const placeholderLabel = slotType === 'video' ? 'Video' : 'Photo';

                          return (
                            <div className={style.reviewUploadItem} key={slotIdx}>
                              <UploadFile
                                value={slotValue}
                                accept={accept}
                                placeholderLabel={placeholderLabel}
                                ariaLabel={`${placeholderLabel} upload ${slotIdx + 1}`}
                                onChange={(fileObj) => {
                                  if (fileObj) {
                                    handleSlotFile(idx, slotIdx, fileObj);
                                  } else {
                                    removeSlotFile(idx, slotIdx);
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className={style.reviewFooter}>
        <Button type='button' variant='outlined' onClick={resetAll}>
          Cancel
        </Button>
        <Button type='submit' onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ModalReviewView;
