// --style
import style from '@components/Product/ProductPopular/styles/style.module.scss';

// -- components
import ProductItem from '@components/Product/ProductItem/views';

const ProductPopular = (props) => {
  const { data } = props;

  return (
    <section className={style.productPopular}>
      <div className='container'>
        <div className={style.wrapp}>
          <h3 className={style.title}>{data.title}</h3>
          <div className={style.list}>
            {Array.isArray(data.list) && data.list.length > 0 ? (
              data.list.map((item, idx) => (
                <div className={style.productItem} key={item.id ?? idx}>
                  <ProductItem {...item} />
                </div>
              ))
            ) : (
              <p className={style.empty}>No products</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPopular;
