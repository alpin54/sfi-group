'use client';

import { useEffect, useState } from 'react';

// -- libraries
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';

// -- components
import ProductItem from '@components/Product/ProductItem/views';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/Category/CategoryItem/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Button from '@elements/Button/views';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }
    }
  ]
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}

const CategoryItem = (props) => {
  const { data } = props;

  const isMobile = useMediaQuery('(max-width: 767.98px)');

  return (
    <div className={style.categorySection}>
      <div className='container'>
        <div className={style.categorySectionWrapp}>
          {/* Loop per kategori */}
          {data.map((category) => (
            <div key={category.id} className={style.categorySectionItem}>
              <div className={style.categoryCard}>
                <h3 className={style.categoryCardTitle}>{category.title}</h3>
                {category.button && (
                  <div className={style.categoryCardBtn}>
                    <Button href={category.button.href} rounded>
                      {category.button.label}
                    </Button>
                  </div>
                )}
              </div>
              <div className={style.categorySectionSlider}>
                {/* Jika mobile, render list biasa */}
                {isMobile ? (
                  <div className={style.categorySectionList}>
                    {category.list.map((item, idx) => (
                      <div key={idx} className={style.categorySectionProductItem}>
                        <ProductItem {...item} />
                      </div>
                    ))}
                  </div>
                ) : category.list.length > 3 ? (
                  <Slider {...sliderSettings} className={style.categorySectionProductSlider}>
                    {category.list.map((item, idx) => (
                      <div key={idx} className={style.categorySectionProductItem}>
                        <ProductItem {...item} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className={style.categorySectionList}>
                    {category.list.map((item, idx) => (
                      <div key={idx} className={style.categorySectionProductItem}>
                        <ProductItem {...item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={style.categoryCardBtnMobile}>
                <Button href={category.button.href} rounded>
                  {category.button.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
