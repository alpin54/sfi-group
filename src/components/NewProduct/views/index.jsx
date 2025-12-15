// -- libraries
import Image from 'next/image';
import Link from 'next/link';

// -- styles
import style from '@components/NewProduct/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';

const NewProduct = (props) => {
  const { data } = props;

  if (!Array.isArray(data) || data.length === 0) return null;
  const items = data.slice(0, 2);

  return (
    <section className={style.newProduct} aria-label='New products'>
      <div className={style.wrapper}>
        {items.map((item, idx) => (
          <div className={style.newProductItem} key={`new-product-${idx}`}>
            <div className={style.newProductBox}>
              <div className={style.newImg}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title || `new-product-${idx}`}
                    className={style.newImage}
                    width={800}
                    height={600}
                    priority={false}
                  />
                )}
              </div>

              <div className={style.newBody}>
                <div className={style.newHead}>
                  {item.title && <h3 className={style.newTitle}>{item.title}</h3>}
                  {item.description && <p className={style.newDesc}>{item.description}</p>}
                </div>
                {item.button_text && (
                  <div className={style.newBtn}>
                    <Button href={item.button_link || '#'}>{item.button_text}</Button>
                  </div>
                )}
                <Link href={item.url || '/'} className={style.link} aria-label={item.title} tabIndex='-1' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewProduct;
