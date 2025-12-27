// -- libraries
import Image from 'next/image';

// -- assets
import EmptyImage from '@assets/image/illustration/empty.svg';

// -- style
import style from '@elements/Empty/styles/style.module.scss';

const EmptyView = (props) => {
  const { image, title, description, button } = props;

  return (
    <div className={style.empty}>
      {image ? (
        <div className={style.img}>
          <Image src={image} alt='Empty' width={248} height={216} className={style.imgEl} />
        </div>
      ) : (
        <div className={style.img}>
          <Image src={EmptyImage} alt='Empty' width={248} height={216} className={style.imgEl} />
        </div>
      )}
      <h4 className={style.title}>{title}</h4>
      <p className={style.description}>{description}</p>
      {button && <div className={style.btn}>{button}</div>}
    </div>
  );
};

export default EmptyView;
