// -- libraries
import Image from 'next/image';
import Slider from 'react-slick';

// -- styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '@components/Product/ProductReview/styles/style.module.scss';

// -- elements
import Modal from '@components/Elements/Modal/views';

const ModalImage = (props) => {
  const { open, onClose, data, selectedImage, setSelectedImage } = props;

  const settings = {
    infinite: true,
    speed: 1100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setSelectedImage(newIndex)
  };

  return (
    <Modal open={open} onClose={onClose} title='Image' variant='fullscreen'>
      <div className={style.modalImage}>
        <div className={style.modalImageBox}>
          {data.length > 1 ? (
            <>
              <Slider {...settings}>
                {data.map((item, index) => (
                  <div className={style.modalImageItem} key={`modal-image-${index}`}>
                    <Image
                      src={item}
                      alt={`modal-image-${index}`}
                      className={style.modalImageThumb}
                      width={512}
                      height={512}
                    />
                  </div>
                ))}
              </Slider>
              {/* Counter */}
              <div className={style.modalImageCounter}>
                <p>
                  <span>{(selectedImage + 1).toString()}</span>
                  <span>/</span>
                  <span>{data?.length.toString()}</span>
                </p>
              </div>
            </>
          ) : (
            <div className={style.modalImageItem}>
              <Image src={data[0]} alt={`modal-image`} className={style.modalImageThumb} width={512} height={512} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalImage;
