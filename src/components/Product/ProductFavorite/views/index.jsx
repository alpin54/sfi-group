'use client';

// -- libraries
import { useEffect, useState } from 'react';

// -- style
import style from '@components/Product/ProductFavorite/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- elements
import Input from '@elements/Input/views';
import Pagination from '@components/Elements/Pagination/views';
import Button from '@elements/Button/views';
import Empty from '@elements/Empty/views';

// -- assets
import EmptyImage from '@assets/image/illustration/empty-1.svg';

// -- components
import ProductItem from '@components/Product/ProductItem/views';

const ProductFavorite = (props) => {
  const { data } = props;
  const { enableScroll, disableScroll } = useScrollable();
  const [isDesktop, setIsDesktop] = useState(false);
  const BREAKPOINT = 992;

  const totalProduct = data?.meta?.total ?? 0;
  const productList = Array.isArray(data?.data) ? data.data : [];

  // Responsive layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsDesktop(window.innerWidth > BREAKPOINT);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile scroll lock (optional, depend on modal usage, you can remove if not used)
  useEffect(() => {
    enableScroll();
    // or remove this effect entirely if not needed
    // return () => disableScroll();
  }, [enableScroll, disableScroll]);

  // Empty utama (wishlist kosong total)
  const isEmptyAllProduct = totalProduct === 0;
  // Empty search (wishlist ada, tapi tidak ketemu dalam search/filter)
  const isEmptyByFilter = totalProduct > 0 && productList.length === 0;

  return (
    <section className={style.promo}>
      <div className='container'>
        {isEmptyAllProduct ? (
          <div className={style.emptyLargeWrap}>
            <Empty
              image={EmptyImage}
              title='No favorites yet'
              description='Your wishlist is empty. Explore products and add them to your favorites.'
              button={
                <Button href='/shop' icon='star' variant='primary'>
                  Browse Products
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className={style.head}>
              <h3 className={style.title}>{data.title}</h3>
              <h4 className={style.subtitle}>{data.subtitle}</h4>
              <div className={style.filterSearch}>
                <Input name='search' icon='search' placeholder='Let’s find something cool . . .' />
              </div>
            </div>
            <div className={style.body}>
              <div className={style.list}>
                {productList.length > 0
                  ? productList.map((item, idx) => (
                      <div className={style.item} key={item.id ?? idx}>
                        <ProductItem {...item} />
                      </div>
                    ))
                  : isEmptyByFilter && (
                      <Empty
                        title='Oops, we didn’t find any favorites.'
                        description='Try a different search term or reset your search.'
                      />
                    )}
              </div>
            </div>
            <div className={style.foot}>
              <Pagination totalPage={2} currentPage={1} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductFavorite;
