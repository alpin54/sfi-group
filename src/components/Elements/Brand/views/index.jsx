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
      <div className={style.brandInfo}>
        <div className={style.brandLogo} style={color ? { backgroundColor: color } : undefined}>
          <Image src={image} alt={name} />
        </div>
        <div className={style.brandText}>
          <h3 className={style.brandName}>{name}</h3>
          {slug ? (
            <Link href={`/brand/${slug}`} className={style.brandDesc}>
              <SystemIcon name='storefront' />
              <span>View All Products</span>
              <SystemIcon name='caret-right' />
            </Link>
          ) : (
            <p className={style.brandDesc}>{description}</p>
          )}
        </div>
      </div>
      <div className={style.brandStats}>
        <div className={style.brandStat}>
          <SystemIcon name='package' className={style.brandIcon} />
          <span>{totalProduct} Product</span>
        </div>
        <div className={style.brandStat}>
          <SystemIcon name='chart-bar' className={style.brandIcon} />
          <span>{sold} Sold</span>
        </div>
        <div className={style.brandStat}>
          <SystemIcon name='star-on' className={style.brandIcon} />
          <span>{rating} Rating</span>
        </div>
        <div className={style.brandStat}>
          <SystemIcon name='chats-circle' className={style.brandIcon} />
          <span>{review} Review</span>
        </div>
      </div>
    </div>
  );
};

export default Brand;
