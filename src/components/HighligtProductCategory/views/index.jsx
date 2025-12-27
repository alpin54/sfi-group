// -- libraries
import Image from 'next/image';
import Link from 'next/link';

// -- styles
import style from '@components/HighligtProductCategory/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';

const HighligtProductCategory = (props) => {
  const { data } = props;
  if (!data) return null;

  const {
    title,
    description,
    image,
    url,
    button_url,
    button_text,
    button_secondary_url,
    button_secondary_text,
    list = []
  } = data;

  const renderCard = (item, idx) => (
    <div key={`hpc-card-${idx}`} className={style.card}>
      <div className={style.cardBox}>
        <div className={style.cardMedia}>
          {item.image && (
            <Image
              src={item.image}
              alt={item.title || `card-${idx}`}
              className={style.cardImage}
              width={600}
              height={400}
              priority={false}
            />
          )}
        </div>

        <div className={style.cardBody}>
          {item.title && <h5 className={style.cardTitle}>{item.title}</h5>}
          <div className={style.cardBtn}>
            {item.button_text && <Button href={item.button_url}>{item.button_text}</Button>}
          </div>
          <Link href={item.url} className={style.link} aria-label={item.title} tabIndex='-1' />
        </div>
      </div>
    </div>
  );

  return (
    <section className={style.higlightProductCategory} aria-label='Highlight product categories'>
      <div className={style.wrapper}>
        {/* Left*/}
        <div className={style.leftCard}>
          <div className={style.mainInner}>
            <Link href={url} className={style.link} aria-label={title} tabIndex='-1' />
            <div className={style.mainText}>
              {title && <h2 className={style.title}>{title}</h2>}
              {description && <p className={style.desc}>{description}</p>}
              <div className={style.actionGroup}>
                {button_secondary_text && (
                  <Button href={button_secondary_url} variant='outlined'>
                    {button_secondary_text}
                  </Button>
                )}
                {button_text && (
                  <Button href={button_url} variant='primary'>
                    {button_text}
                  </Button>
                )}
              </div>
            </div>

            <div className={style.mainMedia}>
              {image && (
                <Image
                  src={image}
                  alt={title || 'highlight'}
                  className={style.mainImage}
                  width={720}
                  height={720}
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Right:*/}
        <div className={style.rightCard}>{list.slice(0, 4).map((c, i) => renderCard(c, i))}</div>
      </div>
    </section>
  );
};

export default HighligtProductCategory;
