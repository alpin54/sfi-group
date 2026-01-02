// -- library
import { useState, useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/Cart/CartItem/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Quantity from '@elements/Quantity/views';

const CartItem = (props) => {
  const qtyNum = Number.isFinite(Number(props.quantity)) ? Number(props.quantity) : 1;
  const currentStock = typeof props.stock === 'number' && props.stock <= 0;
  const canDecrease = qtyNum > 1;
  const canIncrease = !currentStock && (typeof props.stock === 'number' ? qtyNum < props.stock : true);

  const handleQtyChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (currentStock !== undefined && currentStock !== null && typeof currentStock === 'number' && value > currentStock)
      value = currentStock;
    props.updateQty && props.updateQty(value);
  };

  // variant select value: use variant_id first (so parent-controlled changes reflect immediately),
  // fallback to selected_variant.id then to the first variant id
  const fallbackVariantId =
    Array.isArray(props.variants) && props.variants.length > 0 && props.variants[0] && props.variants[0].id
      ? props.variants[0].id
      : '';
  const currentVariantId = String(props.variant_id ?? props.selected_variant?.id ?? fallbackVariantId);

  // Local state to make select respond immediately (optimistic UI).
  // Keep it in sync with incoming props.variant_id so parent updates reflect here.
  const [localVariantId, setLocalVariantId] = useState(currentVariantId);
  useEffect(() => {
    setLocalVariantId(currentVariantId);
  }, [currentVariantId]);

  return (
    <div className={`${style.item} ${props.checked ? style.isChecked : ''}`}>
      <div className={style.itemText}>
        {/* info */}
        <div className={style.itemInfo}>
          {/* select */}
          <div className={style.itemSelect}>
            <input
              type='checkbox'
              checked={!!props.checked}
              onChange={() => props.selectedItem && props.selectedItem()}
              aria-label={`Pilih ${props.name}`}
            />
            <div className={style.itemSelectIcon}>
              {props.checked ? <SystemIcon name='check' /> : <SystemIcon name='check-empty' />}
            </div>
          </div>

          {/* thumb */}
          <div className={style.itemThumb}>
            {props.image ? <Image src={props.image} alt={props.name || 'produk'} width={88} height={88} /> : null}
          </div>

          <div className={style.itemWrap}>
            <h6 className={style.itemTitle}>{props.name}</h6>
            <div className={style.itemMeta}>
              {props.variants && Array.isArray(props.variants) && props.variants.length > 0 && (
                <div className={style.itemVariant}>
                  <select
                    value={localVariantId}
                    onChange={(e) => {
                      const val = e.target.value;
                      // update local state immediately to reflect change in UI
                      setLocalVariantId(val);
                      // convert back to number before sending; parent should handle variant id
                      props.updateVariant && props.updateVariant(val === '' ? '' : Number(val));
                    }}
                    aria-label={`Pilih varian ${props.name}`}>
                    {props.variants.map((v) => (
                      <option key={v.id} value={String(v.id)}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  <SystemIcon name='caret-down' />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* action */}
        <div className={style.itemAction}>
          <div className={style.itemPrice}>
            {props.sale_price > 0 && <p className={style.itemPriceOriginal}>{Currency.formatRp(props.price)}</p>}
            <p className={style.itemPriceCurrent}>
              {Currency.formatRp(props.sale_price > 0 ? props.sale_price : props.price)}
            </p>
          </div>

          <div className={style.itemBtn}>
            <button className={style.itemRemove} type='button' aria-label='Add to Favorites' onClick={() => {}}>
              <SystemIcon name='heart-off' />
            </button>
            <button
              className={style.itemRemove}
              type='button'
              aria-label='Hapus item'
              onClick={() => props.removeItem && props.removeItem()}>
              <SystemIcon name='trash' />
            </button>

            <div className={style.itemQty}>
              <Quantity
                size='small'
                quantity={qtyNum}
                currentStock={currentStock ? 0 : props.stock}
                onChange={handleQtyChange}
                setQuantity={props.updateQty}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
