// -- libraries
import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';

// -- assets
import LogoImage from '@assets/image/logo/logo-primary.png';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/Auth/AuthSection/styles/style.module.scss';
import Link from 'next/link';

const AuthSection = (props) => {
  const { images, title, description, children } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    autoHeight: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
  };

  return (
    <div className={style.auth}>
      <div className='container-fluid'>
        <div className={style.authInner}>
          {images && images.length > 0 && (
            <div className={style.authSlider}>
              <Slider className={style.authSliderList} {...settings}>
                {images.map((item, index) => (
                  <Image
                    key={index}
                    className={style.authSliderImg}
                    src={item.image}
                    alt={item.alt}
                    width={752}
                    height={880}
                  />
                ))}
              </Slider>
              {/* Counter */}
              <div className={style.authSliderCounter}>
                <p>
                  {(currentSlide + 1).toString().padStart(2, '0')} <span>/</span>{' '}
                  {images.length.toString().padStart(2, '0')}
                </p>
              </div>
            </div>
          )}
          <div className={style.authContent}>
            <div className={style.logo}>
              <Link href='/' className={style.logoLink}>
                <Image className={style.logoImg} src={LogoImage} alt='logo' width={144} height={64} />
              </Link>
            </div>
            <div className={style.authHeader}>
              <h1 className={style.title}>{title}</h1>
              <p className={style.desc}>{description}</p>
            </div>
            <div className={style.authBody}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
