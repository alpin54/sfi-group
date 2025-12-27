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
  const { images, title, subTitle, description, children } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
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
      <div className={style.authInner}>
        {images && images.length > 0 && (
          <div className={style.authSlider}>
            <Slider className={style.authSliderList} {...settings}>
              {images.map((item, index) => (
                <div key={index} className={style.authSlide}>
                  <div className={style.authSliderMedia}>
                    <Image
                      className={style.authSliderImg}
                      src={item.image}
                      alt={item.alt || `slide-${index}`}
                      width={752}
                      height={880}
                      priority={index === 0}
                    />

                    {/* Overlay title & description berasal dari setiap item image */}
                    {(item.title || item.description) && (
                      <div className={style.slideOverlay}>
                        {item.title && <h3 className={style.slideTitle}>{item.title}</h3>}
                        {item.description && <p className={style.slideDesc}>{item.description}</p>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className={style.authContent}>
          <div className={style.logo}>
            <Link href='/' className={style.logoLink}>
              <Image className={style.logoImg} src={LogoImage} alt='logo' width={144} height={64} />
            </Link>
          </div>
          <div className={style.authHeader}>
            <h3 className={style.title}>{title}</h3>
            {subTitle && <h4 className={style.subTitle}>{subTitle}</h4>}
            {description && <div className={style.desc} dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
          <div className={style.authBody}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
