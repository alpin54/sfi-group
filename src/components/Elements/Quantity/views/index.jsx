// -- styles
import style from '@elements/Quantity/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const Quantity = (props) => {
  const { quantity, setQuantity, onChange, currentStock, isSubmitting } = props;
  return (
    <div className={style.quantity}>
      <div className={style.quantityControl}>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1 || isSubmitting}>
          <SystemIcon name='mines' />
        </button>
        <input type='number' value={quantity} onChange={onChange} min={1} max={currentStock} />
        <button onClick={() => setQuantity(Math.min(currentStock || Infinity, quantity + 1))} disabled={isSubmitting}>
          <SystemIcon name='add' />
        </button>
      </div>
    </div>
  );
};

export default Quantity;
