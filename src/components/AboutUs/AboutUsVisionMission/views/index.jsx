'use client';

// -- library
import Image from 'next/image';

// -- styles
import style from '@components/AboutUs/AboutUsVisionMission/styles/style.module.scss';

const AboutUsVisionMission = (props) => {
  const { data } = props;
  return (
    <section className={style.visionMission}>
      <div className='container'>
        <div className={style.list}>
          {data.list.map((item, index) => (
            <div key={index} className={style.item}>
              <h6 className={style.itemTitle}>{item.title}</h6>
              <div className={style.description}>
                {Array.isArray(item.description) ? (
                  <ul>
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsVisionMission;
