'use client';

// -- libraries
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/Product/ProductDetail/styles/style.module.scss';

// -- models
// import cartModel from '@components/Cart/models';

// -- utils
import LocalStorage from '@utils/localStorage';
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Breadcrumb from '@elements/Breadcrumb/views';
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';
import Empty from '@elements/Empty/views';
import Quantity from '@components/Elements/Quantity/views';

// -- components
import ProductItem from '@components/Product/ProductItem/views';
import ProductReview from '@components/Product/ProductReview/widgets/Default';
import Brand from '@components/Elements/Brand/views';

const ProductDetail = (props) => {
  const { data } = props;
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openStatus, setOpenStatus] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const imageSliderRef = useRef(null);

  // New local states to show current price/stock based on selected variant
  const [currentPrice, setCurrentPrice] = useState(data?.price ?? 0);
  const [currentStock, setCurrentStock] = useState(data?.stock ?? 0);

  const user = LocalStorage.get('user');
  const isAuthenticated = !!(user && typeof user === 'object' && Object.keys(user).length > 0);

  // helper to create slugs from category/subcategory names
  const slugify = (str) =>
    str && typeof str === 'string'
      ? str
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
      : '';

  const getBreadcrumbItems = () => {
    const items = [];

    const category = Array.isArray(data?.categories) && data.categories.length > 0 ? data.categories[0] : null;
    const subcategory =
      Array.isArray(data?.subcategories) && data.subcategories.length > 0 ? data.subcategories[0] : null;

    if (subcategory && subcategory.name) {
      const catPart = category && (category.slug || category.name) ? slugify(category.slug || category.name) : '';
      const subPart = slugify(subcategory.slug || subcategory.name);
      const href = catPart ? `/shop/${catPart}/${subPart}` : `/shop/${subPart}`;
      // show subcategory as the visible breadcrumb text
      items.push({ text: subcategory.name, href, icon: 'caret-right' });
    } else if (category && category.name) {
      // if only category exists, show category and link to /category
      const catSlug = slugify(category.slug || category.name);
      items.push({ text: category.name, href: catSlug ? `/${catSlug}` : '/products', icon: 'caret-right' });
    } else if (data?.collections && data.collections.length > 0) {
      // fallback to collection if categories/subcategories are missing
      const coll = data.collections[0];
      const collSlug = slugify(coll.slug || coll.name || '');
      items.push({
        text: coll.name || 'Collection',
        href: collSlug ? `/${collSlug}` : '/collections',
        icon: 'caret-right'
      });
    } else {
      // final fallback
      items.push({ text: 'Products', href: '/products', icon: 'caret-right' });
    }

    // current product (no href)
    items.push({ text: data?.name || 'Product' });

    return items;
  };

  const settingsImageSlider = {
    customPaging: (i, e) => {
      return (
        <Image
          src={data?.cover[i]?.image}
          alt={`slick-thumb-${i}`}
          width={112}
          height={112}
          className='slick-thumb-image'
        />
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false
        }
      }
    ]
  };

  // Handle show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!detailRef.current || !sectionRef.current) return;

      const detailRect = detailRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      if (detailRect.top + detailRect.height < 0 && sectionRect.bottom > detailRect.height + 200) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // run on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section on scroll
  useEffect(() => {
    const handleSectionScroll = () => {
      // Dapatkan tinggi header & navbar
      const header = document.querySelector('#header');
      const navbar = document.querySelector(`.${style.navbar}`);
      const headerHeight = header ? header.offsetHeight : 0;
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const offsetSum = headerHeight + navbarHeight / 2;

      const sections = [
        { id: 'description', offset: 0 },
        { id: 'feature', offset: 0 },
        { id: 'review', offset: 0 }
      ];
      let current = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offsetSum <= 0) {
            current = sections[i].id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleSectionScroll);
    handleSectionScroll();
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, []);

  // Keep currentPrice/currentStock in sync when product data changes
  useEffect(() => {
    setCurrentPrice(data?.price ?? 0);
    setCurrentStock(data?.stock ?? 0);
    setSelectedColor(null);
    setSelectedType(null);
    setQuantity(1);
  }, [data]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const header = document.querySelector('.header');
    const navbar = document.querySelector(`.${style.navbar}`);
    const headerHeight = header ? header.offsetHeight : 0;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const offsetSum = headerHeight + navbarHeight;

    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - offsetSum;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Prevent input more than stock
  const handleQtyChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (currentStock !== undefined && currentStock !== null && typeof currentStock === 'number' && value > currentStock)
      value = currentStock;
    setQuantity(value);
  };

  // get color id
  const getColorId = () => {
    if (!data.colors) return null;
    const found = data.colors.find((c) => c.id === selectedColor?.id);
    return found ? found.id : null;
  };

  // get type id
  const getTypeId = () => {
    if (!data.type) return null;
    const found = data.type.find((s) => s.id === selectedType?.id);
    return found ? found.id : null;
  };

  // get variant id (existing helper) — unchanged
  const getVariantId = () => {
    if (!data.variants || !Array.isArray(data.variants)) return null;
    const found = data.variants.find((v) => {
      const colorMatch = !selectedColor || v.color?.id === selectedColor?.id;
      const typeMatch = !selectedType || v.type?.id === selectedType?.id;
      return colorMatch && typeMatch;
    });
    return found?.id || null;
  };

  // helper to return the selected variant object (if any)
  const getSelectedVariantObject = () => {
    if (!data.variants || !Array.isArray(data.variants)) return null;
    const found = data.variants.find((v) => {
      const colorMatch = !selectedColor || v.color?.id === selectedColor?.id;
      const typeMatch = !selectedType || v.type?.id === selectedType?.id;
      return colorMatch && typeMatch;
    });
    return found || null;
  };

  // Whenever selection changes, update price & stock based on matching variant (if found)
  useEffect(() => {
    const variant = getSelectedVariantObject();

    if (variant) {
      // prefer variant price, fallback to product price
      const vPrice = typeof variant.price === 'number' ? variant.price : (data?.price ?? 0);
      const vStock = typeof variant.stock === 'number' ? variant.stock : (data?.stock ?? 0);
      setCurrentPrice(vPrice);
      setCurrentStock(vStock);
      // ensure current quantity doesn't exceed new stock
      setQuantity((q) => Math.min(q, vStock || 1));
    } else {
      // no variant matched -> fallback to product-level
      setCurrentPrice(data?.price ?? 0);
      setCurrentStock(data?.stock ?? 0);
      setQuantity((q) => Math.min(q, data?.stock ?? q));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedType, data]);

  const getCartList = async () => {
    // Jangan panggil API cart jika user belum login
    if (!isAuthenticated) return [];
    try {
      const res = await cartModel.list();
      if (res && res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  // Helper: go to cover slide by key (key can be number or string)
  const goToCoverByKey = (key) => {
    if (!data || !Array.isArray(data.cover)) return;
    // match by converting both sides to string to be permissive
    const idx = data.cover.findIndex((c) => String(c.key) === String(key));
    if (idx === -1) {
      return;
    }
    // If slider exists, use slickGoTo
    if (imageSliderRef.current && typeof imageSliderRef.current.slickGoTo === 'function') {
      try {
        imageSliderRef.current.slickGoTo(idx);
      } catch (e) {
        // fail silently
      }
    } else {
      setCurrentSlide(idx);
    }
  };

  // handlers to select color
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    goToCoverByKey(color.id);
  };

  // handlers to select type
  const handleSelectType = (type) => {
    setSelectedType(type);
    goToCoverByKey(type.id);
  };

  // add to cart function (returns boolean success)
  const addToCart = async () => {
    if (isSubmitting) return false;
    let cartList = [];

    // Auth check
    if (!isAuthenticated) {
      cartList = LocalStorage.get('cart')?.data || [];
    } else {
      cartList = await getCartList();
    }

    // Ensure product exists
    if (!data || !data.id) {
      setMessageStatus('Product data is invalid.');
      setOpenStatus(true);
      setTimeout(() => setOpenStatus(false), 1200);
      return false;
    }

    // Basic option validations:
    const missing = [];
    if (data.type && data.type.length > 0 && !selectedType) missing.push('type');
    if (data.colors && data.colors.length > 0 && !selectedColor) missing.push('color');

    if (missing.length > 0) {
      setMessageStatus(`Please select ${missing.join(', ')}.`);
      setOpenStatus(true);
      setTimeout(() => setOpenStatus(false), 1200);
      return false;
    }

    // If the product defines explicit variants, require a matching variant
    const variant_id = getVariantId();

    if (data.variants && Array.isArray(data.variants) && data.variants.length > 0 && !variant_id) {
      setMessageStatus('Please select a valid variant.');
      setOpenStatus(true);
      setTimeout(() => setOpenStatus(false), 1200);
      return false;
    }

    // Check quantity vs stock (use currentStock which reflects variant/product)
    if (typeof currentStock === 'number' && quantity > currentStock) {
      setMessageStatus(`Maximum available stock is ${currentStock}.`);
      setOpenStatus(true);
      setTimeout(() => setOpenStatus(false), 1200);
      return false;
    }

    setIsSubmitting(true);

    try {
      // Normalisasi nilai option agar undefined dan null dianggap sama
      const norm = (v) => (v === undefined ? null : v);

      const color_id = getColorId();
      const type_id = getTypeId();

      const product_id = data.id;

      // Cari match item
      const sameItem = cartList.find(
        (item) =>
          item.product_id === product_id &&
          norm(item.variant_id) === norm(variant_id) &&
          norm(item.type_id) === norm(type_id) &&
          norm(item.color_id) === norm(color_id)
      );

      if (!isAuthenticated) {
        // Simpan di localStorage
        let updated = [];
        if (sameItem) {
          // update quantity
          updated = cartList.map((item) => {
            if (
              item.product_id === product_id &&
              norm(item.variant_id) === norm(variant_id) &&
              norm(item.type_id) === norm(type_id) &&
              norm(item.color_id) === norm(color_id)
            ) {
              return { ...item, quantity: item.quantity + quantity };
            } else {
              return item;
            }
          });
        } else {
          // tambah baru
          updated = [
            ...cartList,
            {
              product_id,
              variant_id: norm(variant_id),
              type_id: norm(type_id),
              color_id: norm(color_id),
              quantity
            }
          ];
        }
        // save to localStorage
        LocalStorage.set('cart', { data: updated });
        // success
        setMessageStatus(sameItem ? 'Cart updated!' : 'Added to cart!');
        setOpenStatus(true);
        // close status shortly
        setTimeout(() => setOpenStatus(false), 1200);
        return true;
      } else {
        // Siapkan payload
        const payload = {
          product_id,
          quantity: sameItem ? sameItem.quantity + quantity : quantity,
          ...(variant_id != null ? { variant_id } : {}),
          ...(type_id != null ? { type_id } : {}),
          ...(color_id != null ? { color_id } : {})
        };

        const method = sameItem ? 'put' : 'post';
        const response = await cartModel.submit(payload, method);

        if (response && (response.data || response.success)) {
          // success
          setMessageStatus(sameItem ? 'Cart updated!' : 'Added to cart!');
          setOpenStatus(true);

          // refresh cart state
          const cartData = await getCartList();
          LocalStorage.set('cart', cartData);

          // close status shortly
          setTimeout(() => setOpenStatus(false), 1200);
          return true;
        } else {
          setMessageStatus((response && response.message) || 'Failed to submit cart.');
          setOpenStatus(true);
          setTimeout(() => setOpenStatus(false), 1200);
          return false;
        }
      }
    } catch (e) {
      setMessageStatus(e?.message || 'Network error, failed to submit cart.');
      setOpenStatus(true);
      setTimeout(() => setOpenStatus(false), 1200);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // add to cart handler
  const handleAddToCart = async () => {
    await addToCart();
  };

  // buy now handler
  const handleBuyNow = async () => {
    await addToCart();
    router.push('/checkout');
  };

  return data ? (
    <>
      <div className={`${style.product} ${showNavbar ? style.show : ''}`} ref={sectionRef}>
        <div className='container'>
          {/* navbar */}
          <div className={style.navbar}>
            <div className='container'>
              <div className={style.navbarWrapper}>
                <p className={style.navbarName}>{data.name}</p>
                <ul className={style.navbarList}>
                  <li className={style.navbarItem}>
                    <Link
                      className={`${style.navbarLink} ${activeSection === 'description' ? style.navbarLinkActive : ''}`}
                      href='#description'
                      onClick={(e) => handleNavClick(e, 'description')}>
                      Description
                    </Link>
                  </li>
                  <li className={style.navbarItem}>
                    <Link
                      className={`${style.navbarLink} ${activeSection === 'feature' ? style.navbarLinkActive : ''}`}
                      href='#feature'
                      onClick={(e) => handleNavClick(e, 'feature')}>
                      Feature
                    </Link>
                  </li>
                  <li className={style.navbarItem}>
                    <Link
                      className={`${style.navbarLink} ${activeSection === 'review' ? style.navbarLinkActive : ''}`}
                      href='#review'
                      onClick={(e) => handleNavClick(e, 'review')}>
                      Review
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* sheet */}
          <div className={style.sheet}>
            <div className='container'>
              <div className={style.sheetWrapper}>
                <h6 className={style.price}>
                  {Currency.formatRp(currentPrice)}
                  <span>{Currency.formatRp(data.price)}</span>
                </h6>
                <Button href='#detail'>Select Variat</Button>
              </div>
            </div>
          </div>
          {/* breadcrumb */}
          <div className={style.breadcrumb}>
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          {/* detail */}
          <div className={style.detail} ref={detailRef} id='detail'>
            {/* Image Gallery */}
            <div className={style.image}>
              <div className={style.imageContent}>
                {data && data?.cover && data.cover.length > 1 ? (
                  <>
                    <Slider ref={imageSliderRef} {...settingsImageSlider} className={style.imageSlider}>
                      {data?.cover.map((val, idx) => (
                        <div key={`cover-item-${idx}`} className={style.imageItem}>
                          <Image
                            src={val.image}
                            alt={val.alt}
                            className={style.imageEl}
                            width={768}
                            height={744}
                            priority={idx === 0}
                          />
                        </div>
                      ))}
                    </Slider>
                    {/* Counter */}
                    <div className={style.imageCounter}>
                      <p>
                        <span>{(currentSlide + 1).toString()}</span>
                        <span>/</span>
                        <span>{data?.cover.length.toString()}</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <div className={style.imageSingle}>
                    {(data?.cover || []).map((val, idx) => (
                      <div key={`image-item-${idx}`} className={style.imageItem}>
                        <Image
                          src={val.image}
                          alt={val.alt}
                          className={style.imageEl}
                          width={768}
                          height={744}
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Product Info */}
            <div className={style.info}>
              <div className={style.infoHead}>
                <h2 className={style.name}>{data.name}</h2>
                <ul className={style.meta}>
                  <li className={style.metaItem}>
                    <SystemIcon name='star-on' /> {data.review.average}
                  </li>
                  <li className={style.metaItem}>{data.review.total} Review</li>
                  <li className={style.metaItem}>{data.sold} Sold</li>
                </ul>
                <h3 className={style.price}>
                  {Currency.formatRp(currentPrice)}
                  <span>{Currency.formatRp(data.price)}</span>
                </h3>
              </div>
              <div className={style.infoBody}>
                {data.type && data.type.length > 0 && (
                  <div className={style.row}>
                    {/* type */}
                    <div className={style.variant}>
                      <p className={style.label}>
                        Type: <span>{selectedType?.name}</span>
                      </p>
                      <ul className={style.variantList}>
                        {data.type.map((type) => (
                          <li className={style.variantItem} key={type.id}>
                            <button
                              className={`${style.variantBox} ${selectedType?.id === type.id ? style.variantBoxActive : ''}`}
                              onClick={() => handleSelectType(type)}>
                              <span>{type.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {data.colors && data.colors.length > 0 && (
                  <div className={style.row}>
                    {/* Color */}
                    <div className={style.color}>
                      <p className={style.label}>
                        Color: <span>{selectedColor?.name}</span>
                      </p>
                      <ul className={style.colorList}>
                        {data.colors.map((color) => (
                          <li className={style.colorItem} key={color.id}>
                            <button
                              className={`${style.colorBox} ${selectedColor?.id === color.id ? style.colorBoxActive : ''}`}
                              onClick={() => handleSelectColor(color)}
                              aria-label={color.name}>
                              <span style={{ background: color.code }}></span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {/* Quantity */}
                <div className={style.row}>
                  <p className={style.label}>Quantity</p>
                  <p className={style.stock}>
                    Stock: <span>{currentStock}</span>
                  </p>
                  <Quantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    onChange={handleQtyChange}
                    currentStock={currentStock}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className={style.infoFoot}>
                <Button variant='icon' icon='heart-off' />
                <Button variant='outlined' onClick={() => handleAddToCart()} disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add To Cart'}
                </Button>
                <Button onClick={() => () => handleBuyNow()} disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Buy Now'}
                </Button>
              </div>
            </div>
          </div>
          {/* description */}
          {data.description && (
            <div className={style.description} id='description'>
              <h4 className={style.title}>Description</h4>
              <div className={style.content} dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          )}
          {/* feature */}
          {data.feature && (
            <div className={style.feature} id='feature'>
              <h4 className={style.title}>Feature</h4>
              <div className={style.content} dangerouslySetInnerHTML={{ __html: data.feature }} />
            </div>
          )}
          {/* store */}
          {data.store && (
            <div className={style.store} id='store'>
              <Brand
                image={data.store.image}
                color={data.store.color}
                name={data.store.name}
                slug={data.store.slug}
                totalProduct={data.store.totalProduct}
                sold={data.store.sold}
                rating={data.store.rating}
                review={data.store.review}
              />
            </div>
          )}
          {/* review */}
          {data.review && (
            <div className={style.review} id='review'>
              <ProductReview review={data.review} slug={data.slug} />
            </div>
          )}
          {/* related */}
          {data.related && data.related.length > 0 && (
            <div className={style.related} id='related'>
              <h3 className={style.relatedTitle}>Other Product Recommendations</h3>
              <div className={style.relatedList}>
                {data.related.map((prod, idx) => (
                  <div key={`related-item-${idx}`} className={style.relatedItem}>
                    <ProductItem {...prod} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* modal status */}
      <Modal
        open={openStatus}
        onClose={() => setOpenStatus(false)}
        variant='success'
        title={messageStatus}
        closeIcon='hide'>
        {messageStatus && (
          <p className={style.desc}>
            The item has been successfully added to your cart. You can continue shopping or proceed to checkout to
            complete your purchase.
          </p>
        )}
      </Modal>
    </>
  ) : (
    <div className={style.empty}>
      <Empty title='No product data available' description='Please check back later.' />
    </div>
  );
};

export default ProductDetail;
