// -- styles
import style from '@components/FallbackSection/styles/style.module.scss';

// --components
import Button from '@elements/Button/views';
import Image from 'next/image';

const FallbackSection = (props) => {
  const { image, title, description, class: modifier } = props;
  return (
    <div className={`${style.fallbackSection} ${modifier ? style[`fallbackSection--${modifier}`] : ''}`}>
      <div className='container'>
        <div className={style.wrapper}>
          <div className={style.image}>
            <Image src={image} alt={title} className={style.imageEl} />
          </div>
          <div className={style.text}>
            <h2 className={style.title}>{title}</h2>
            <p className={style.description}>{description}</p>
            <Button href='/' variant='primary' className={style.link}>
              BACK TO HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackSection;
