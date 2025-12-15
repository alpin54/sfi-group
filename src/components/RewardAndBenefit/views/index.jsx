'use client';

// -- library
import Image from 'next/image';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

// -- styles
import style from '@components/RewardAndBenefit/styles/style.module.scss';

const RewardAndBenefit = (props) => {
  const { data } = props;

  return (
    <section className={style.rewardAndBenefit}>
      <div className='container'>
        <div className={style.head}>
          <h2 className={style.title}>{data.title}</h2>
          <p className={style.description}>{data.description}</p>
        </div>
        <div className={style.list}>
          {data.list.map((item, index) => (
            <div key={index} className={style.item}>
              <div className={style.box}>
                <div className={style.icon}>
                  <SystemIcon name={item.icon} />
                </div>
                <h6 className={style.label}>{item.label}</h6>
                <p className={style.text}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardAndBenefit;
