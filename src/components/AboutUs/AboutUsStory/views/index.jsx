'use client';

// -- library
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/AboutUs/AboutUsStory/styles/style.module.scss';

const AboutUsStory = (props) => {
  const { data } = props;
  const sliderRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    // autoplay: true,
    // autoplaySpeed: 4000,
    arrows: false,
    fade: false,
    swipeToSlide: true,
    adaptiveHeight: false,
    // pauseOnHover: true,
    autoHeight: true,
    lazyLoad: false
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderItem = (val, idx) => (
    <div key={`about-us-story-item-${idx}`} className={style.item}>
      <div className={style.content}>
        <h2
          className={style.year}
          onClick={() => {
            if (sliderRef.current && typeof sliderRef.current.slickGoTo === 'function') {
              sliderRef.current.slickGoTo(idx);
            }
          }}>
          {val.year}
        </h2>
        <h4 className={style.name}>{val.title}</h4>
        <div className={style.description} dangerouslySetInnerHTML={{ __html: val.description }} />
      </div>
    </div>
  );

  return (
    <section className={style.story}>
      <div className={style.inner}>
        <div className='container'>
          {data && data?.list.length > 1 ? (
            <div className={style.list}>
              <Slider ref={sliderRef} {...settings} className={style.slider}>
                {data?.list.map((val, idx) => renderItem(val, idx))}
              </Slider>
            </div>
          ) : (
            <div className={`${style.list} ${style.listSingle}`}>
              {data?.list.map((val, idx) => renderItem(val, idx))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUsStory;
