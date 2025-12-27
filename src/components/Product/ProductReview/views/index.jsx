// -- libraries
import { useEffect, useState } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/Product/ProductReview/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Pagination from '@elements/Pagination/views';
import Button from '@components/Elements/Button/views';

// -- components
import ModalImage from '@components/Product/ProductReview/views/modal.jsx';

const ProductReview = (props) => {
  const { review, data } = props;
  const { enableScroll, disableScroll } = useScrollable();
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAllReview, setOpenAllReview] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const limit = data.limit;
  const total = data.total;
  const totalPages = Math.ceil(total / limit);
  const dataList = data.data.slice(0, limit);
  const BREAKPOINT = 992;

  // Track window width for responsive UI
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsDesktop(window.innerWidth > BREAKPOINT);
      setOpenAllReview(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle show menu class rm-scroll on body for mobile
  useEffect(() => {
    if (openAllReview && !isDesktop) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [openAllReview && !isDesktop, enableScroll, disableScroll]);

  useEffect(() => {
    if (!openAllReview) return;
    // Escape key handler
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpenAllReview(false);
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [openAllReview]);

  const handleOpenModal = (images, key) => {
    setDataModal(images);
    setSelectedImage(key);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDataModal([]);
  };

  return (
    <>
      <div className={style.review}>
        <div className={style.reviewHeader}>
          <div className={style.rating}>
            <p className={style.label}>Rating</p>
            <h2 className={style.title}>
              <SystemIcon name='star-on' />
              {review.average}
              <span>/ 5.0</span>
            </h2>
          </div>
          <div className={style.preview}>
            <p className={style.label}>Preview</p>
            <h2 className={style.title}>
              <SystemIcon name='chats-circle' />
              {review.total}
            </h2>
          </div>
          <button type='button' className={style.reviewBtn} onClick={() => setOpenAllReview(true)}>
            <SystemIcon name='caret-right' />
          </button>
        </div>
        <div className={`${style.reviewModal} ${openAllReview ? style.openAllReview : ''}`}>
          <div className={style.reviewModalHeader}>
            <h3 className={style.reviewModalTitle}>All Reviews</h3>
            <button type='button' className={style.reviewModalClose} onClick={() => setOpenAllReview(false)}>
              <SystemIcon name='close' />
            </button>
          </div>
          <div className={style.reviewModalBody}>
            <div className={style.rating}>
              <ul className={style.filter}>
                {data.ratings.map((item, index) => (
                  <li key={index} className={style.filterItem}>
                    <span className={style.checkbox}>
                      <input type='checkbox' id={`filter-${index}`} name={item.id} className={style.checkboxInput} />
                      <span className={style.checkboxInner}></span>
                    </span>
                    <div className={style.filterInfo}>
                      {item.stars}
                      <ul className={style.stars}>
                        {isDesktop ? (
                          Array.from({ length: 5 }).map((_, starIndex) => {
                            if (starIndex < item.stars) {
                              return (
                                <li key={`star-${starIndex}`}>
                                  <SystemIcon name='star-on' />
                                </li>
                              );
                            }
                          })
                        ) : (
                          <li>
                            <SystemIcon name='star-on' />
                          </li>
                        )}
                      </ul>
                      <span>{item.review}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.preview}>
              <div className={style.list}>
                {dataList.map((item, index) => (
                  <div className={style.item} key={`preview-${index}`}>
                    <div className={style.itemHeader}>
                      <div className={style.itemAvatar}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className={style.itemAvatarImage}
                        />
                      </div>
                      <div className={style.itemInfo}>
                        <p className={style.name}>{item.name}</p>
                        <p className={style.date}>{item.date}</p>
                      </div>
                    </div>
                    <div className={style.itemBody}>
                      <ul className={style.stars}>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <li key={`star-${starIndex}`}>
                            <SystemIcon name={starIndex < item.stars ? 'star-on' : 'star-off'} />
                          </li>
                        ))}
                      </ul>
                      {(item.type || item.color) && (
                        <p className={style.variant}>
                          Variant: <span>{item.type.name}</span>
                          <span>{item.color.name}</span>
                        </p>
                      )}
                      <p className={style.comment}>{item.comment}</p>
                      {item.images && (
                        <div className={style.images}>
                          {item.images.map((image, imageIndex) => (
                            <div
                              className={style.imagesItem}
                              key={`image-${imageIndex}`}
                              aria-label='button'
                              onClick={() => handleOpenModal(item.images, imageIndex)}>
                              <Image
                                src={image}
                                alt='Review Image'
                                width={56}
                                height={56}
                                className={style.imagesThumb}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.pagination}>
                {totalPages > 1 && <Pagination currentPage={1} totalPage={totalPages} />}
              </div>
            </div>
          </div>
        </div>
        <div className={style.reviewList}>
          <div className={style.list}>
            {dataList.slice(0, 3).map((item, index) => (
              <div className={style.item} key={`preview-${index}`}>
                <div className={style.itemHeader}>
                  <div className={style.itemAvatar}>
                    <Image src={item.image} alt={item.name} width={48} height={48} className={style.itemAvatarImage} />
                  </div>
                  <div className={style.itemInfo}>
                    <p className={style.name}>{item.name}</p>
                    <p className={style.date}>{item.date}</p>
                  </div>
                </div>
                <div className={style.itemBody}>
                  <ul className={style.stars}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <li key={`star-${starIndex}`}>
                        <SystemIcon name={starIndex < item.stars ? 'star-on' : 'star-off'} />
                      </li>
                    ))}
                  </ul>
                  {(item.type || item.color) && (
                    <p className={style.variant}>
                      Variant: <span>{item.type.name}</span>
                      <span>{item.color.name}</span>
                    </p>
                  )}
                  <p className={style.comment}>{item.comment}</p>
                  {item.images && (
                    <div className={style.images}>
                      {item.images.map((image, imageIndex) => (
                        <div
                          className={style.imagesItem}
                          key={`image-${imageIndex}`}
                          aria-label='button'
                          onClick={() => handleOpenModal(item.images, imageIndex)}>
                          <Image src={image} alt='Review Image' width={56} height={56} className={style.imagesThumb} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button level='block' onClick={() => setOpenAllReview(true)}>
            View All
          </Button>
        </div>
      </div>
      <ModalImage
        open={openModal}
        onClose={handleCloseModal}
        data={dataModal}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
};

export default ProductReview;
