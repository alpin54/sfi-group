// -- library
import Image from 'next/image';

// -- styles
import style from '@components/AboutUs/AboutUsGallery/styles/style.module.scss';

const AboutUsGallery = (props) => {
  const { data } = props;

  return (
    <section className={style.gallery}>
      <div className={`${style.track} ${style.trackLeft}`}>
        <div className={style.trackInner}>
          {[0, 1].map((pass) =>
            data.left.map((item, index) => (
              <div key={`left-${pass}-${index}`} className={style.img}>
                <Image className={style.imgEl} src={item.image} alt={item.title} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className={`${style.track} ${style.trackRight}`}>
        <div className={style.trackInner}>
          {[0, 1].map((pass) =>
            data.right.map((item, index) => (
              <div key={`right-${pass}-${index}`} className={style.img}>
                <Image className={style.imgEl} src={item.image} alt={item.title} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUsGallery;
