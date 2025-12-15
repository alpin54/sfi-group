'use client';
// --style
import style from '@components/Career/CareerTitle/styles/style.module.scss';

const CareerTitle = (props) => {
  const { data } = props;

  return (
    <section className={style.sectionTitle}>
      <div className='container'>
        <div className={style.careerWrapp}>
          <h2 className={style.careerTitle}>{data.title}</h2>
          <p className={style.careerDesc}>{data.desc}</p>
        </div>
      </div>
    </section>
  );
};

export default CareerTitle;
