// -- library
import Image from 'next/image';

// -- utils
import Currency from '@utils/currency';

// -- styles
import style from '@components/Order/OrderItem/styles/style.module.scss';

const OrderItem = (props) => {
  const { data } = props;
  return (
    <div className={style.item}>
      <div className={style.box}>
        <div className={style.info}>
          <div className={style.img}>
            <Image className={style.imgEl} src={data.image} alt={data.name} width={72} height={72} />
          </div>
          <div className={style.text}>
            <h6 className={style.name}>{data.name}</h6>
            {data.selected_variant && (
              <h6 className={style.variant}>
                {data.selected_variant.name} <span>&bull;</span> {data.selected_variant.color}
              </h6>
            )}
            <h6 className={style.quantity}>
              Quantity: {data.quantity} Product - {Currency.formatRp(data.price)}
            </h6>
          </div>
        </div>
        <h6 className={style.price}>{Currency.formatRp(data.price)}</h6>
      </div>
    </div>
  );
};

export default OrderItem;
