'use client';
// --style
import style from '@components/Career/CareerBenefit/styles/style.module.scss';

// -- elements
import SystemIcon from '@components/Elements/SystemIcon/views';

const CareerBenefit = (props) => {
  const { data } = props;

  const list = Array.isArray(data) ? data : [data];
  return (
    <section className={style.benefit}>
      <div className='container'>
        <div className={style.benefitList}>
          {list.map((item, idx) => (
            <div className={style.benefitItem} key={item.title ?? idx}>
              <div className={style.benefitBox}>
                <SystemIcon name={item.icon} size={20} className={style.benefitIcon} />
                <h6 className={style.benefitTitle}>{item.title}</h6>
                <p className={style.benefitDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerBenefit;
