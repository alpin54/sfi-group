// -- libraries
import Image from 'next/image';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

// -- styles
import style from '@elements/Brand/styles/style.module.scss';
import Link from 'next/link';

const Brand = (props) => {
  const { image, color, name, slug, description, totalProduct, sold, rating, review } = props;
  return (
    <div className={style.brand}>
      <div className={style.brand__info}>
        <div className={style.brand__logo} style={color ? { backgroundColor: color } : undefined}>
          <Image src={image} alt={name} />
        </div>
        <div className={style.brand__text}>
          <h3 className={style.brand__name}>{name}</h3>
          {slug ? (
            <Link href={`/brand/${slug}`} className={style.brand__desc}>
              <SystemIcon name='storefront' />
              <span>View All Products</span>
              <SystemIcon name='caret-right' />
            </Link>
          ) : (
            <p className={style.brand__desc}>{description}</p>
          )}
        </div>
      </div>
      <div className={style.brand__stats}>
        <div className={style.brand__stat}>
          <SystemIcon name='package' className={style.brand__icon} />
          <span>{totalProduct} Product</span>
        </div>
        <div className={style.brand__stat}>
          <SystemIcon name='chart-bar' className={style.brand__icon} />
          <span>{sold} Sold</span>
        </div>
        <div className={style.brand__stat}>
          <SystemIcon name='star-on' className={style.brand__icon} />
          <span>{rating} Rating</span>
        </div>
        <div className={style.brand__stat}>
          <SystemIcon name='chats-circle' className={style.brand__icon} />
          <span>{review} Review</span>
        </div>
      </div>
    </div>
  );
};

export default Brand;
