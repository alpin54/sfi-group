// -- libraries
import Link from 'next/link';

// -- styles
import style from '@components/Cta/styles/style.module.scss';

const Cta = (props) => {
  const { data } = props;
  return (
    <section className={style.cta}>
      <div className='container'>
        <div className={style.wrapper}>
          <h6 className={style.title}>
            {data.title}{' '}
            <span>
              <Link href={data.url || '/'} className={style.link}>
                {data.link_text}{' '}
              </Link>{' '}
            </span>{' '}
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Cta;
