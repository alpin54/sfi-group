'use client';

// -- library
import Image from 'next/image';

// -- styles
import style from '@components/AboutUs/AboutUsOurGroupCompanies/styles/style.module.scss';

const AboutUsOurGroupCompanies = (props) => {
  const { data } = props;

  return (
    <section className={style.ourGroupCompanies}>
      <div className='container'>
        <h2 className={style.title}>{data.title}</h2>
        <div className={style.list}>
          {data.list.map((item, index) => (
            <div key={index} className={style.item}>
              <div className={style.img}>
                <Image className={style.imgEl} src={item.image} alt={item.title} />
              </div>
              <div className={style.text}>
                <h4 className={style.name}>{item.title}</h4>
                <h5 className={style.short}>{item.short}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsOurGroupCompanies;
