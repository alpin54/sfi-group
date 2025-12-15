'use client';

// -- library
import Image from 'next/image';

// -- styles
import style from '@components/AboutUs/AboutUsOurPartnerNetwork/styles/style.module.scss';

const AboutUsOurPartnerNetwork = (props) => {
  const { data } = props;

  return (
    <section className={style.ourPartnerNetwork}>
      <div className='container'>
        <div className={style.head}>
          <h2 className={style.title}>{data.title}</h2>
        </div>
        <div className={style.list}>
          {data.list.map((item, index) => (
            <div key={index} className={style.item}>
              <div className={style.img}>
                <Image className={style.imgEl} src={item.logo} alt={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsOurPartnerNetwork;
