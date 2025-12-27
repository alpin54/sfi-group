'use client';

// -- libraries
import { useEffect, useState } from 'react';
import Image from 'next/image';

// -- style
import style from '@components/Product/ProductBrand/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- elements
import Input from '@elements/Input/views';
import Select from '@elements/Select/views';
import Pagination from '@components/Elements/Pagination/views';
import SystemIcon from '@elements/SystemIcon/views';
import Button from '@elements/Button/views';
import Empty from '@elements/Empty/views';
import Brand from '@elements/Brand/views';

// -- assets
import EmptyImage from '@assets/image/illustration/empty-1.svg';

// -- components
import ProductItem from '@components/Product/ProductItem/views';

const ProductBrand = (props) => {
  const { data, brandOptions, sortOptions, colorOptions, filters, onFilterChange, slug } = props;
  const { enableScroll, disableScroll } = useScrollable();
  const [isDesktop, setIsDesktop] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [pendingFilters, setPendingFilters] = useState(filters);
  const BREAKPOINT = 992;

  const totalProduct = data?.meta?.total ?? 0;
  const productList = Array.isArray(data?.data) ? data.data : [];

  const isEmptyAllProduct = totalProduct === 0;
  const isEmptyByFilter = totalProduct > 0 && productList.length === 0;

  // Responsive layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsDesktop(window.innerWidth > BREAKPOINT);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync pendingFilters with filters
  useEffect(() => {
    setPendingFilters(filters);
  }, [filters]);

  useEffect(() => {
    if (isDesktop) setPendingFilters(filters);
  }, [isDesktop, filters]);

  // Mobile scroll lock
  useEffect(() => {
    showFilters ? disableScroll() : enableScroll();
  }, [showFilters, enableScroll, disableScroll]);

  // Close filters with ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && showFilters) setShowFilters(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showFilters]);

  // Forward filter change ke parent (widget)
  // const handleFilterChange = (key, value) => {
  //   if (isDesktop) {
  //     onFilterChange(key, value);
  //     setPendingFilters((prev) => ({ ...prev, [key]: value }));
  //   } else {
  //     setPendingFilters((prev) => ({ ...prev, [key]: value }));
  //   }
  // };

  // // Apply filter di mobile
  // const handleApplyFilter = (e) => {
  //   e.preventDefault();
  //   Object.entries(pendingFilters).forEach(([key, val]) => onFilterChange(key, val));
  //   setShowFilters(false);
  // };

  return (
    <section className={style.promo}>
      <div className='container'>
        {isEmptyAllProduct ? (
          <div className={style.emptyLargeWrap}>
            <Empty
              image={EmptyImage}
              title='No products yet'
              description='Check back soon! Products will be launching here.'
              button={
                <Button href='/shop' icon='handbag-off' variant='primary'>
                  Shop Now
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className={style.head}>
              <div className={style.store}>
                <Brand
                  image={data.store.image}
                  color={data.store.color}
                  name={data.store.name}
                  description={data.store.description}
                  totalProduct={data.store.totalProduct}
                  sold={data.store.sold}
                  rating={data.store.rating}
                  review={data.store.review}
                />
              </div>
              <div className={showFilters ? `${style.filter} ${style.showFilter}` : style.filter}>
                <button className={style.filterBtn} onClick={() => setShowFilters(!showFilters)}>
                  <SystemIcon name='funnel' />
                  <span>Filter</span>
                </button>
                <div className={style.filterSearch}>
                  <Input name='search' icon='search' placeholder='Let’s find something cool . . .' />
                </div>
                <form className={style.filterForm}>
                  <div className={style.filterHead}>
                    <h5 className={style.filterTitle}>Filter</h5>
                    <button type='button' className={style.filterClose} onClick={() => setShowFilters(false)}>
                      <SystemIcon name='close' />
                    </button>
                  </div>
                  <div className={style.filterBody}>
                    <div className={style.filterItem}>
                      <Select
                        filterKey='brand'
                        label='Brand'
                        icon='medal'
                        openInitial={showFilters ? true : false}
                        data={brandOptions}
                        value={isDesktop ? filters.brand : pendingFilters.brand}
                        // onChange={(value) => handleFilterChange('brand', value)}
                      />
                    </div>
                    <div className={style.filterItem}>
                      <Select
                        filterKey='order_by'
                        label='Sort By'
                        icon='sort-descending'
                        openInitial={showFilters ? true : false}
                        data={sortOptions}
                        value={isDesktop ? filters.order_by : pendingFilters.order_by}
                        // onChange={(value) => handleFilterChange('order_by', value)}
                      />
                    </div>
                    <div className={style.filterItem}>
                      <Select
                        filterKey='color'
                        label='Color'
                        icon='palette'
                        type='color'
                        openInitial={showFilters ? true : false}
                        data={colorOptions}
                        value={isDesktop ? filters.color : pendingFilters.color}
                        // onChange={(value) => handleFilterChange('color', value)}
                      />
                    </div>
                    <div className={style.filterItem}>
                      <Select
                        filterKey='price'
                        label='Price'
                        type='price'
                        icon='money-wavy'
                        openInitial={showFilters ? true : false}
                        value={
                          isDesktop
                            ? [filters.priceRange[0], filters.priceRange[1]]
                            : [pendingFilters.priceRange[0], pendingFilters.priceRange[1]]
                        }
                        onApply={(value) => onFilterChange('price', value)}
                        // onChange={(value) => handleFilterChange('price', value)}
                      />
                    </div>
                  </div>
                  <div className={style.filterFoot}>
                    {!isDesktop && (
                      <>
                        <Button
                          variant='outlined'
                          type='button'
                          disabled={
                            pendingFilters.data.length === 0 &&
                            pendingFilters.brand.length === 0 &&
                            pendingFilters.color.length === 0 &&
                            pendingFilters.priceRange[0] === 0 &&
                            pendingFilters.priceRange[1] === 0
                          }
                          onClick={() => setPendingFilters({ data: [], brand: [], color: [], priceRange: [0, 0] })}>
                          Clear All
                        </Button>
                        <Button type='submit'>Apply</Button>
                      </>
                    )}
                  </div>
                </form>
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
                        title='Oops, nothing matches your filters here.'
                        description='Try adjusting or resetting your filters.'
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

export default ProductBrand;
