'use client';

// -- library
import Image from 'next/image';

// -- elements
import style from '@components/Career/CareerBanner/styles/style.module.scss';

const CareerBanner = (props) => {
  const { data } = props;
  return (
    <section className={style.CareerBanner}>
      <div className='container'>
        <div className={style.CareerBannerWrapp}>
          <Image src={data.image} alt='Career Banner' width={900} height={616} className={style.CareerBannerImg} />
        </div>
      </div>
    </section>
  );
};

export default CareerBanner;
