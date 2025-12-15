'use client';

// -- components
import IndonesiaMap from '@components/AboutUs/AboutUsOurBranches/views/indonesiaMap';

// -- styles
import style from '@components/AboutUs/AboutUsOurBranches/styles/style.module.scss';

const AboutUsOurBranches = (props) => {
  const { data } = props;

  return (
    <section className={style.ourBranches}>
      <div className='container'>
        <h2 className={style.title}>{data.title}</h2>
        <IndonesiaMap geoUrl={data?.geoUrl} markers={data?.branches} />
      </div>
    </section>
  );
};

export default AboutUsOurBranches;
