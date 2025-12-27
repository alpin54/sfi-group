'use client';

// -- libraries
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/HeroBanner/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';

const HeroBanner = (props) => {
  const { data } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    autoHeight: true,
    lazyLoad: false
  };

  const renderButtons = (val) => {
    const primaryExists = val?.button_url && val?.button_text;
    const secondaryExists = val?.button_secondary_url && val?.button_secondary_text;

    if (!primaryExists && !secondaryExists) return null;

    return (
      <div className={style.btn} role='group' aria-label='hero actions'>
        {secondaryExists && (
          <Button href={val.button_secondary_url} variant='outlined' aria-label={val.button_secondary_text}>
            {val.button_secondary_text}
          </Button>
        )}

        {primaryExists && (
          <Button href={val.button_url} variant='primary' aria-label={val.button_text}>
            {val.button_text}
          </Button>
        )}
      </div>
    );
  };

  const renderItem = (val, idx) => (
    <div key={`hero-banner-item-${idx}`} className={style.item}>
      <Link href={val.url} className={style.link} aria-label={val.title} target='_self' rel='follow' tabIndex='-1' />

      <div className={style.content}>
        <div className={style.head}>
          <h2 className={style.title}>{val.title}</h2>
          {val.subtitle && <h4 className={style.subtitle}>{val.subtitle}</h4>}
        </div>

        <div className={style.img}>
          <Image
            src={val.image_desktop}
            alt={val.title}
            className={style.imgDesktop}
            width={1200}
            height={600}
            priority={idx === 0}
          />
          <Image
            src={val.image_mobile}
            alt={val.title}
            className={style.imgMobile}
            width={600}
            height={300}
            priority={idx === 0}
          />
        </div>

        <div className={style.text}>
          <p className={style.desc}>{val.description}</p>
          {renderButtons(val)}
        </div>
      </div>
    </div>
  );

  return (
    <section className={style.banner} id='hero-banner'>
      <div className='container-fluid'>
        {data && data?.list.length > 1 ? (
          <Slider {...settings} className={style.slider}>
            {data?.list.map((val, idx) => renderItem(val, idx))}
          </Slider>
        ) : (
          <div className={style.list}>{data?.list.map((val, idx) => renderItem(val, idx))}</div>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
