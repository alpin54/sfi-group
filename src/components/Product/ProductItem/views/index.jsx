import Image from 'next/image';
import Link from 'next/link';

import style from '@components/Product/ProductItem/styles/style.module.scss';

import SystemIcon from '@components/Elements/SystemIcon/views';

const ProductItem = (props) => {
  const {
    id,
    images,
    name,
    description,
    url,
    price,
    oldPrice,
    rating,
    reviewCount,
    promotions = [],
    favorite = false
  } = props;

  const parseToNumber = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return null;
    const digits = String(val).replace(/[^\d]/g, '');
    const n = Number(digits);
    return Number.isFinite(n) ? n : null;
  };
  const formatCurrency = (val) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
        val
      );
    }
    const parsed = parseToNumber(val);
    if (parsed !== null) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(
        parsed
      );
    }
    return val ?? '';
  };

  const priceNum = parseToNumber(price);
  const oldPriceNum = parseToNumber(oldPrice);
  const hasDiscount = oldPriceNum && priceNum && oldPriceNum > priceNum;
  const discountPercent = hasDiscount ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100) : 0;

  return (
    <div className={style.card}>
      <Link href={url} className={style.link} aria-label={name} />
      <div className={style.cardImage}>
        <Image src={images} alt={name} width={200} height={200} className={style.cardImageEl} />
        {promotions.length > 0 && (
          <div className={style.badgeWrap}>
            {promotions.map((promo) => (
              <span
                key={promo.id}
                className={`${style.badge} ${style[`badge-${promo.title.toLowerCase().replace(/\s+/g, '-')}`]}`}>
                {promo.title}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={style.details}>
        <div className={style.meta}>
          <div className={style.metaLeft}>
            <SystemIcon name='star-on' className={style.iconStar} />
            {rating != null && (
              <span className={style.rating}>
                {rating} · {reviewCount ?? 0}
              </span>
            )}
          </div>

          <button
            type='button'
            className={`${style.button} ${favorite ? style.favorited : ''}`}
            aria-label={favorite ? 'Remove from wishlist' : 'Add to wishlist'}>
            <SystemIcon name={favorite ? 'heart-on' : 'heart-off'} className={style.iconLove} />
          </button>
        </div>
        <h6 className={style.name}>{name}</h6>
        <div className={style.bottom}>
          <div className={style.priceWrap}>
            <p className={style.price}>{formatCurrency(price)}</p>

            {hasDiscount && (
              <p className={style.priceOld} aria-label='Original price'>
                {formatCurrency(oldPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
