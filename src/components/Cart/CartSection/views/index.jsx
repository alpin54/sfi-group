// -- libraries
import { useState, useEffect } from 'react';

// -- assets
import CartEmptyImage from '@assets/image/illustration/cart-empty.svg';

// -- styles
import style from '@components/Cart/CartSection/styles/style.module.scss';

// -- states
import useStateHeader from '@components/Header/states';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import Modal from '@elements/Modal/views';
import Button from '@elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';
import Empty from '@elements/Empty/views';

// -- components
import CartItem from '@components/Cart/CartItem/views';
import CartSummary from '@components/Cart/CartSummary/views';
import ProductItem from '@components/Product/ProductItem/views';
import ModalVoucher from '@components/ModalVoucher/widgets/Default';

const LOCALSTORAGE_KEY = 'cart';

const CartSection = (props) => {
  const { data, recommendedData } = props;
  const { setTotalCart } = useStateHeader();

  // helper: normalize a cart entry's product id and variant id
  const getNormalizedIds = (ci) => {
    const productId = ci.product_id ?? ci.productId ?? ci.id ?? null;
    const variantId = ci.variant_id ?? ci.variantId ?? null;
    return { productId, variantId };
  };

  // helper: dedupe cart data by composite key productId|variantId (variantId may be null)
  // Perubahan: jika ada duplikat (sama product+variant) maka jumlahkan quantity dan gabungkan checked (OR)
  const dedupeCartData = (arr = []) => {
    const map = new Map();
    for (const ci of arr) {
      const { productId, variantId } = getNormalizedIds(ci);
      const key = `${String(productId)}|${String(variantId)}`;
      if (!map.has(key)) {
        // make a shallow copy to avoid mutating original objects
        map.set(key, { ...ci });
      } else {
        const existing = map.get(key);
        const existingQty = Number(existing.quantity ?? 0);
        const incomingQty = Number(ci.quantity ?? 0);
        existing.quantity = existingQty + incomingQty;
        // preserve checked if any is checked
        existing.checked = !!existing.checked || !!ci.checked;
        // prefer existing.selected_variant if present, otherwise use incoming
        existing.selected_variant = existing.selected_variant ?? ci.selected_variant ?? null;
        map.set(key, existing);
      }
    }
    return Array.from(map.values());
  };

  // Initial state must be deterministic for SSR -> avoid reading LocalStorage at module/render time
  const [cartRaw, setCartRaw] = useState({ data: [], voucher: null });
  const [cartItems, setCartItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Derived totals
  const [subtotal, setSubtotal] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  // voucher will be synchronized from storage on client-side load
  const [voucher, setVoucher] = useState(null);
  const [points, setPoints] = useState(null);

  // modal handlers
  useEffect(() => {
    if (openModal) {
      document.querySelector('body')?.classList.add('rm-scroll');
    } else {
      document.querySelector('body')?.classList.remove('rm-scroll');
    }
  }, [openModal]);

  // Load cart from localStorage on client only (prevents hydration mismatch)
  useEffect(() => {
    try {
      const rawFromStorage = LocalStorage.get(LOCALSTORAGE_KEY) || { data: [], voucher: null };

      const cleanedDataOnLoad = Array.isArray(rawFromStorage.data)
        ? rawFromStorage.data.map((ci) => {
            const hasVariantId = ci.variant_id !== undefined && ci.variant_id !== null;
            return {
              ...ci,
              // only keep selected_variant if there is NO variant_id (legacy cases)
              selected_variant: hasVariantId ? null : (ci.selected_variant ?? null)
            };
          })
        : [];

      const initialNormalized = {
        ...rawFromStorage,
        data: dedupeCartData(cleanedDataOnLoad)
      };

      setCartRaw(initialNormalized);
      setVoucher(initialNormalized.voucher ?? null);
    } catch (err) {
      // ignore and keep defaults
      // eslint-disable-next-line no-console
      console.error('Failed to read cart from storage', err);
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const enriched = (cartRaw.data || []).map((cItem) => {
      // support different key names from stored cart entries
      const productId = cItem.product_id ?? cItem.productId ?? cItem.id ?? null;
      const product = data?.data.find((p) => p.id === productId);
      const productExists = !!product;

      // sources:
      const fromCartSelectedVariant = cItem.selected_variant ?? null;
      const fromProductSelectedVariant = productExists ? (product.selected_variant ?? null) : null;

      // IMPORTANT: resolve variant from product.variants when variant_id exists (PRIORITIZE THIS)
      const variantIdValue = cItem.variant_id ?? cItem.variantId ?? null;
      const variantFromVariantsList =
        productExists && Array.isArray(product.variants) && variantIdValue !== null && variantIdValue !== undefined
          ? product.variants.find((v) => String(v.id) === String(variantIdValue))
          : null;

      // New priority:
      // 1) variantFromVariantsList (if variant_id present and found in product.variants)
      // 2) fromCartSelectedVariant (legacy stored object when variant_id not present)
      // 3) fromProductSelectedVariant (product default)
      const selectedVariant = variantFromVariantsList || fromCartSelectedVariant || fromProductSelectedVariant || null;

      // choose current price
      const currentPrice = selectedVariant
        ? selectedVariant.sale_price > 0
          ? selectedVariant.sale_price
          : (selectedVariant.price ?? 0)
        : productExists
          ? product.sale_price > 0
            ? product.sale_price
            : (product.price ?? 0)
          : 0;

      const quantity = cItem.quantity ?? 1;

      // choose stock/weight from selectedVariant if available
      const stock = selectedVariant ? (selectedVariant.stock ?? 0) : productExists ? (product.stock ?? 0) : 0;
      const weight = selectedVariant ? (selectedVariant.weight ?? 0) : productExists ? (product.weight ?? 0) : 0;
      const width = selectedVariant ? (selectedVariant.width ?? 0) : productExists ? (product.width ?? 0) : 0;

      return {
        // keep local cart fields (normalize product_id)
        product_id: productId,
        quantity: quantity,
        // ensure variant_id normalized (use variantIdValue)
        variant_id: variantIdValue,
        checked: cItem.checked ?? false,
        // enrich with API/product info (if available)
        id: productExists ? product.id : productId,
        name: productExists ? product.name : cItem.name,
        image: selectedVariant?.image ?? (productExists ? product.image : (cItem.image ?? '')),
        stock: stock,
        weight: weight,
        width: width,
        variants: productExists ? (product.variants ?? []) : (cItem.variants ?? []),
        // include selected_variant for UI/components to consume (resolved)
        selected_variant: selectedVariant ? selectedVariant : null,
        // pricing fields
        price: currentPrice,
        sale_price: selectedVariant
          ? (selectedVariant.sale_price ?? null)
          : productExists
            ? (product.sale_price ?? null)
            : null
      };
    });

    setCartItems(enriched);

    // compute subtotal from checked items
    const newSubtotal = enriched
      .filter((it) => it.checked)
      .reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0);

    setSubtotal(newSubtotal);

    // compute voucher discount & final total
    // prefer voucher from cartRaw (that's the source-of-truth for stored voucher)
    const appliedVoucher = cartRaw.voucher ?? null;

    // keep voucher state in sync with stored voucher
    setVoucher(appliedVoucher);

    let discount = 0;
    if (appliedVoucher && newSubtotal > 0) {
      const meetsMin = !appliedVoucher.min_spend || newSubtotal >= appliedVoucher.min_spend;
      if (meetsMin) {
        if (appliedVoucher.discount_type === 'PERCENTAGE') {
          const pct = Number(appliedVoucher.discount_value ?? 0);
          discount = (newSubtotal * pct) / 100;
        } else if (appliedVoucher.discount_type === 'FIXED') {
          discount = Number(appliedVoucher.discount_value ?? 0);
        }
        // if voucher has a maximum discount field, respect it (optional)
        if (appliedVoucher.max_discount) {
          const maxDisc = Number(appliedVoucher.max_discount);
          if (!Number.isNaN(maxDisc)) discount = Math.min(discount, maxDisc);
        }
        if (discount > newSubtotal) discount = newSubtotal;
      } else {
        // voucher exists but min_spend not met -> discount 0
        discount = 0;
      }
    } else {
      discount = 0;
    }

    // set voucher discount and final total
    setVoucherDiscount(discount);
    setFinalTotal(Math.max(0, newSubtotal - discount));
    // also update totalCart in header state
    setTotalCart(enriched.length);
  }, [cartRaw, data, setTotalCart]);

  // Persist cartRaw to localStorage helper (dedupe before saving)
  // Perbaikan: merge partial updates dengan cartRaw saat ini supaya field seperti `voucher` tidak hilang
  const persistCartRaw = (next) => {
    // next bisa berupa object partial atau function(prev) => next
    const partial = typeof next === 'function' ? next(cartRaw) : next;

    // baca isi storage saat ini (agar tidak menghapus key lain yang mungkin ditulis oleh kode lain)
    const currentStorage = LocalStorage.get(LOCALSTORAGE_KEY) || {};

    // merge order: currentStorage <- cartRaw <- partial
    // - currentStorage: menjaga key lain yang mungkin ada hanya di storage (mis. voucher dari proses lain)
    // - cartRaw: isi memori saat ini sebagai baseline (biar tidak hilang karena currentStorage lebih "stale")
    // - partial: perubahan terbaru yang mau kita apply (override)
    const merged = {
      ...currentStorage,
      ...cartRaw,
      ...partial
    };

    // pastikan `data` ter-normalize / dedupe seperti sebelumnya
    const normalized = {
      ...merged,
      data: dedupeCartData(Array.isArray(merged.data) ? merged.data : [])
    };

    LocalStorage.set(LOCALSTORAGE_KEY, normalized);
    setCartRaw(normalized);
  };

  // sanitize absolute quantity (digits only)
  const sanitizeAbsoluteQty = (qty) => {
    if (qty === null || qty === undefined) return 1;
    // allow numeric strings like "10", also handle inputs that may contain other characters
    const cleaned = String(qty).replace(/[^\d]/g, '');
    const n = parseInt(cleaned, 10);
    return Number.isNaN(n) ? 1 : n;
  };

  // Helper: compare product + variant using normalized string comparison
  const matchesEntry = (ci, product_id, variant_id) => {
    const ciProduct = ci.product_id ?? ci.productId ?? ci.id ?? null;
    const ciVariant = ci.variant_id ?? ci.variantId ?? null;
    return String(ciProduct) === String(product_id ?? '') && String(ciVariant ?? '') === String(variant_id ?? '');
  };

  // toggle single item checked (now uses product+variant)
  const handleSelectedItem = (product_id, variant_id) => {
    const next = {
      ...cartRaw,
      data: (cartRaw.data || []).map((ci) =>
        matchesEntry(ci, product_id, variant_id) ? { ...ci, checked: !ci.checked } : ci
      )
    };
    persistCartRaw(next);
  };

  // toggle all items (check/uncheck)
  const handleSelectedAll = () => {
    const allChecked = cartItems.length > 0 && cartItems.every((it) => it.checked);
    const next = {
      ...cartRaw,
      data: (cartRaw.data || []).map((ci) => ({ ...ci, checked: !allChecked }))
    };
    persistCartRaw(next);
  };

  const handleUpdateQty = (product_id, variant_id, qty) => {
    // find current quantity stored in cartRaw (fallback to 1)
    const cartEntry = (cartRaw.data || []).find((ci) => matchesEntry(ci, product_id, variant_id));
    const currentQty = cartEntry ? Number(cartEntry.quantity ?? 1) : 1;

    // find item stock from cartItems (the enriched state)
    const item = cartItems.find(
      (it) =>
        String(it.product_id) === String(product_id ?? '') && String(it.variant_id ?? '') === String(variant_id ?? '')
    );
    const stock = item ? (typeof item.stock === 'number' ? item.stock : Infinity) : Infinity;

    let newQty;

    // If qty is an event (from <input onChange>), get its value
    if (qty && typeof qty === 'object' && 'target' in qty) {
      // e.g. event from input
      const v = qty.target.value;
      // if v is like "+1" or "-1", handle as delta; otherwise absolute
      if (typeof v === 'string' && /^[+-]\d+$/.test(v)) {
        newQty = currentQty + parseInt(v, 10);
      } else {
        newQty = sanitizeAbsoluteQty(v);
      }
    } else if (typeof qty === 'string') {
      // if string starts with + or - treat as delta
      if (/^[+-]\d+$/.test(qty.trim())) {
        newQty = currentQty + parseInt(qty, 10);
      } else {
        // otherwise treat as absolute (strip non-digits)
        newQty = sanitizeAbsoluteQty(qty);
      }
    } else if (typeof qty === 'number') {
      // ambiguous: if number is negative treat as delta, otherwise treat as absolute
      if (qty < 0) {
        newQty = currentQty + qty; // delta
      } else {
        // treat as absolute value
        newQty = Math.trunc(qty);
      }
    } else {
      // fallback - set to current (no change)
      newQty = currentQty;
    }

    // Ensure newQty is integer
    newQty = Number.isFinite(newQty) ? Math.trunc(newQty) : currentQty;

    // Now clamp according to stock rules
    if (stock === 0) {
      // out-of-stock: keep zero (or you can choose to remove item)
      newQty = 0;
    } else if (stock !== Infinity) {
      // enforce min 1, max stock
      newQty = Math.max(1, Math.min(newQty, stock));
    } else {
      // unlimited stock: ensure at least 1
      newQty = Math.max(1, newQty);
    }

    const next = {
      ...cartRaw,
      data: (cartRaw.data || []).map((ci) =>
        matchesEntry(ci, product_id, variant_id) ? { ...ci, quantity: newQty } : ci
      )
    };
    persistCartRaw(next);
  };

  // update variant for a specific entry (product + currentVariant) -> set variant_id to newVariantId
  // Perubahan: jika target variant (newVariantId) sudah ada di cart untuk product yang sama,
  // gabungkan quantity (sum) dan hapus entry sumber sehingga tidak ada duplicate entry.
  const handleUpdateVariant = (product_id, current_variant_id, newVariantId) => {
    // normalize incoming variant id: keep '' as empty, otherwise try to coerce to Number
    const normalizedVariantId = newVariantId === '' ? '' : Number(newVariantId);

    const sourceIndex = (cartRaw.data || []).findIndex((ci) => matchesEntry(ci, product_id, current_variant_id));

    if (sourceIndex === -1) {
      // nothing to update
      return;
    }

    const sourceEntry = (cartRaw.data || [])[sourceIndex];

    // find existing target entry (same product + desired variant) but not the same index
    const targetIndex = (cartRaw.data || []).findIndex(
      (ci, idx) =>
        idx !== sourceIndex &&
        String(ci.product_id ?? '') === String(product_id ?? '') &&
        String(ci.variant_id ?? ci.variantId ?? '') === String(normalizedVariantId ?? '')
    );

    if (targetIndex !== -1) {
      // merge quantities into target, combine checked flag, remove source entry
      const targetEntry = cartRaw.data[targetIndex];
      const mergedQty = Number(targetEntry.quantity ?? 0) + Number(sourceEntry.quantity ?? 0);
      const mergedChecked = !!targetEntry.checked || !!sourceEntry.checked;

      const newData = (cartRaw.data || []).reduce((acc, ci, idx) => {
        if (idx === targetIndex) {
          acc.push({
            ...ci,
            quantity: mergedQty,
            checked: mergedChecked,
            // clear any cached selected_variant so enrichment will resolve it fresh
            selected_variant: null
          });
        } else if (idx === sourceIndex) {
          // skip source (we merged it)
        } else {
          acc.push(ci);
        }
        return acc;
      }, []);

      persistCartRaw({
        ...cartRaw,
        data: newData
      });
    } else {
      // no existing target, just update the source entry's variant_id
      const newData = (cartRaw.data || []).map((ci) =>
        matchesEntry(ci, product_id, current_variant_id)
          ? { ...ci, variant_id: normalizedVariantId, selected_variant: null }
          : ci
      );
      persistCartRaw({
        ...cartRaw,
        data: newData
      });
    }
  };

  // remove a single item (product + variant)
  const handleRemoveItem = (product_id, variant_id) => {
    const next = {
      ...cartRaw,
      data: (cartRaw.data || []).filter((ci) => !matchesEntry(ci, product_id, variant_id))
    };
    persistCartRaw(next);
  };

  // remove all checked items
  const removeChecked = () => {
    const next = {
      ...cartRaw,
      data: (cartRaw.data || []).filter((ci) => !ci.checked)
    };
    persistCartRaw(next);
  };

  // apply a voucher (voucher object should follow stored structure)
  const applyVoucher = (voucherObj) => {
    const next = {
      ...cartRaw,
      voucher: voucherObj
    };
    persistCartRaw(next);
    setOpenModal(false);
  };

  // handle close modal
  const handleCloseModalVoucher = () => {
    setOpenModal(false);
  };

  // handle open voucher modal
  const handleOpenModalVoucher = () => {
    setOpenModal(true);
  };

  // UI helpers
  const allChecked = cartItems.length > 0 && cartItems.every((it) => it.checked);
  const someChecked = cartItems.some((it) => it.checked);

  return (
    <div className={style.cart}>
      <div className='container'>
        {cartItems && cartItems.length > 0 ? (
          <>
            <div className={style.head}>
              <h2 className={style.title}>Ready to Checkout</h2>
              <p className={style.desc}>Review your items before proceeding.</p>
            </div>
            <div className={style.inner}>
              {/* left */}
              <div className={style.left}>
                <div className={style.card}>
                  <div className={style.cardHead}>
                    <label className={style.checkAll}>
                      <input
                        type='checkbox'
                        checked={allChecked}
                        onChange={handleSelectedAll}
                        aria-checked={allChecked}
                        aria-label='Product'
                      />
                      <div className={style.checkAllIcon}>
                        {allChecked ? <SystemIcon name='check' /> : <SystemIcon name='check-empty' />}
                      </div>
                      <span>Product</span>
                    </label>
                    <div className={style.cardAction}>
                      <button type='button' className={style.cardBtn} onClick={removeChecked} disabled={!someChecked}>
                        <SystemIcon name='heart-off' />
                      </button>
                      <button type='button' className={style.cardBtn} onClick={removeChecked} disabled={!someChecked}>
                        <SystemIcon name='trash' />
                      </button>
                    </div>
                  </div>

                  <div className={style.cardBody}>
                    {cartItems && cartItems.length > 0 ? (
                      cartItems.map((item) => {
                        const currentVariantId = item.variant_id ?? item.selected_variant?.id ?? null;
                        return (
                          <CartItem
                            key={`cart-${item.product_id}-${currentVariantId ?? 'na'}`}
                            {...item}
                            selectedItem={() => handleSelectedItem(item.product_id, currentVariantId)}
                            updateVariant={(val) => handleUpdateVariant(item.product_id, currentVariantId, val)}
                            updateQty={(val) => handleUpdateQty(item.product_id, currentVariantId, val)}
                            removeItem={() => handleRemoveItem(item.product_id, currentVariantId)}
                          />
                        );
                      })
                    ) : (
                      <h6 className={style.empty}>Keranjang kosong.</h6>
                    )}
                  </div>
                </div>
              </div>

              {/* right */}
              <CartSummary
                subtotal={subtotal}
                voucher={voucher}
                setVoucher={setVoucher}
                points={points}
                setPoints={setPoints}
                total={finalTotal}
                onOpenVoucher={handleOpenModalVoucher}
                disabled={subtotal === 0}
                voucherDiscount={voucherDiscount}
              />
            </div>
          </>
        ) : (
          <Empty
            image={CartEmptyImage}
            title='Oops, your cart is empty.'
            description='Add items now to start shopping!'
            action={
              <Button href='/shop' icon='handbag-off'>
                Shop Now
              </Button>
            }
          />
        )}
        <div className={style.recommended}>
          <h3 className={style.recommendedTitle}>Complete Your Purchase</h3>
          <div className={style.recommendedList}>
            {Array.isArray(recommendedData) && recommendedData.length > 0 ? (
              recommendedData.map((item, idx) => (
                <div className={style.recommendedItem} key={item.id ?? idx}>
                  <ProductItem {...item} />
                </div>
              ))
            ) : (
              <Empty
                title='Oops, nothing matches your filters here.'
                description='Try adjusting or resetting your filters.'
              />
            )}
          </div>
        </div>
      </div>
      <Modal open={openModal} title='Vouchers' onClose={handleCloseModalVoucher}>
        <ModalVoucher
          title='Vouchers'
          voucher={voucher}
          setVoucher={setVoucher}
          onClose={handleCloseModalVoucher}
          onApply={(voucher) => applyVoucher(voucher)}
          selectedVoucher={cartRaw.voucher}
        />
      </Modal>
    </div>
  );
};

export default CartSection;
