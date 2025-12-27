'use client';

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
    },
    {
      breakpoint: 320,
      settings: { slidesToShow: 1 }
    }
  ]
};

const CategoryItem = (props) => {
  const { data } = props;

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
                    <Button href={category.button.href}>{category.button.label}</Button>
                  </div>
                )}
              </div>
              <div className={style.categorySectionSlider}>
                {category.list.length > 3 ? (
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
                <Button href={category.button.href}>{category.button.label}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
