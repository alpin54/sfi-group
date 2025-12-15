'use client';

// -- library
import Image from 'next/image';

// -- styles
import style from '@components/AboutUs/AboutUsOurBranches/styles/style.module.scss';

const AboutUsOurBranches = (props) => {
  const { data } = props;

  return (
    <section className={style.ourBranches}>
      <div className='container'>
        <h2 className={style.title}>{data.title}</h2>
        <div className={style.img}>
          <Image className={style.imgEl} src={data.image} alt={data.title} />
        </div>
      </div>
    </section>
  );
};

export default AboutUsOurBranches;
