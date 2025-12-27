'use client';

// -- library
import Image from 'next/image';

// -- styles
import style from '@components/Category/CategoryBanner/styles/style.module.scss';

// -- utils
import reverseSlug from '@utils/reverseSlug';

// -- elements
import Button from '@components/Elements/Button/views';

const CategoryBanner = (props) => {
  const { data, category } = props;
  return (
    <section className={style.categoryBanner}>
      <div className={style.categoryBannerWrapp}>
        <div className={style.categoryBannerImg}>
          <Image
            src={data.image}
            alt='Category Banner'
            width={900}
            height={616}
            className={style.categoryBannerImgEl}
          />
        </div>
        <div className={style.categoryBannerContent}>
          <div className='container'>
            <h3 className={style.categoryBannerTitle}>{reverseSlug(category)}</h3>
            <div className={style.categoryBannerBtn}>
              <Button href={data.button.href} color='white'>
                {data.button.label}
              </Button>
              <Button href={data.buttonSecondary.href}>{data.buttonSecondary.label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
