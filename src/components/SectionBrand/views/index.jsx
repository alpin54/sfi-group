// -- libraries
import Image from 'next/image';

// -- styles
import style from '@components/SectionBrand/styles/style.module.scss';

const SectionBrand = (props) => {
  const { data = {} } = props;

  const { list = {}, top = [], bottom = [] } = data;
  const topItems = Array.isArray(list.top) ? list.top : Array.isArray(top) ? top : [];
  const bottomItems = Array.isArray(list.bottom) ? list.bottom : Array.isArray(bottom) ? bottom : [];

  // renderItem helper
  const renderItem = (item, idx, pass = 0) => (
    <div
      className={style.brandItem}
      key={`brand-${idx}`}
      role='listitem'
      aria-label={item.name || `brand-${idx}`}
      aria-hidden={pass === 1 ? 'true' : undefined}>
      <div className={style.brandWrap}>
        <Image src={item.image} alt={item.name || ''} width={140} height={40} className={style.brandImage} />
      </div>
    </div>
  );

  const renderLoop = (items, prefix) =>
    items.length === 0
      ? null
      : [0, 1].map((pass) => items.map((it, i) => renderItem(it, `${prefix}-${pass}-${i}`, pass)));

  return (
    <section className={style.sectionBrand} aria-label={data.title || 'Brands'}>
      <div className='container'>
        <div className={style.inner}>
          {data.title && <h3 className={style.title}>{data.title}</h3>}
          <div className={style.trackWrap}>
            <div className={`${style.track} ${style.trackTop}`} role='list' aria-label='brand-top'>
              <div className={style.trackInner}>{renderLoop(topItems, 'top')}</div>
            </div>
            <div className={`${style.track} ${style.trackBottom}`} role='list' aria-label='brand-bottom'>
              <div className={style.trackInner}>{renderLoop(bottomItems, 'bottom')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBrand;
