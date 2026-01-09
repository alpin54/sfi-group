// -- libraries
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@elements/Select/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Input from '@components/Elements/Input/views';
import Button from '@components/Elements/Button/views';

const SelectView = (props) => {
  const {
    data = [],
    label,
    value = [],
    onChange,
    filterKey,
    border = false,
    icon,
    openInitial = false,
    type = 'default',
    onApply
  } = props;
  const ref = useRef(null);
  const selectBoxRef = useRef(null);
  const [open, setOpen] = useState(openInitial);
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [selectBoxHeight, setSelectBoxHeight] = useState('0px');
  const [price, setPrice] = useState([value?.[0] || '', value?.[1] || '']);
  const BREAKPOINT = 992;

  let classNames = style.select;
  if (open) classNames += ` ${style.open}`;
  if (border) classNames += ` ${style.border}`;
  if (icon) classNames += ` ${style.icon}`;

  useEffect(() => {
    if (type === 'price') {
      setPrice([value?.[0] || '', value?.[1] || '']);
    }
  }, [value, type]);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Accordion effect for selectBox on mobile
  useEffect(() => {
    if (!isMobile) {
      setSelectBoxHeight('auto');
      return;
    }
    if (open && selectBoxRef.current) {
      setSelectBoxHeight(`${selectBoxRef.current.scrollHeight}px`);
    } else {
      setSelectBoxHeight('0px');
    }
  }, [open, isMobile, data, search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when Escape is pressed
  useEffect(() => {
    if (!open) return;
    const handleEsc = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  // Filter data
  const filteredData = data?.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

  // Display selected label
  const renderSelectedLabel = () => {
    if (!value?.length) return '';
    const found = data.filter((item) => value.includes(item.value)).map((i) => i.label);
    return found.join(', ');
  };

  // handle Select change (isolation only for its own filterKey data)
  const handleSelect = (val) => {
    let newValue;
    if (value.includes(val)) {
      newValue = value.filter((item) => item !== val);
    } else {
      newValue = [...value, val];
    }
    onChange(newValue);
    if (!isMobile) {
      setOpen(false);
    }
  };

  // Handle price input change - parse formatted value back to number
  const handlePriceChange = (formattedValue, index) => {
    // Remove all non-digit characters (Rp, dots, commas, spaces)
    const numericValue = formattedValue.replace(/[^\d]/g, '');
    const newPrice = [...price];
    newPrice[index] = numericValue;
    setPrice(newPrice);
  };

  return (
    <div className={classNames} ref={ref}>
      <button type='button' className={style.selectButton} onClick={() => setOpen(!open)}>
        {icon && (
          <span className={style.selectIconFaders}>
            <SystemIcon name={icon} />
          </span>
        )}
        <input
          className={style.selectInput}
          placeholder={label}
          value={open ? search : renderSelectedLabel()}
          onChange={(e) => setSearch(e.target.value)}
          readOnly={!open}
        />
        <span className={style.selectIcon}>
          <SystemIcon name='caret-down' />
        </span>
      </button>

      <div
        className={style.selectBox}
        ref={selectBoxRef}
        style={
          isMobile
            ? {
                maxHeight: selectBoxHeight,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }
            : {}
        }>
        {type === 'price' ? (
          <ul className={style.selectList}>
            <li className={style.selectItem}>
              <Input
                size='small'
                type='text'
                placeholder='Min Price'
                value={price[0] ? Currency.formatRp(price[0]) : ''}
                onChange={(e) => handlePriceChange(e.target.value, 0)}
              />
            </li>
            <li className={style.selectItem}>
              <Input
                size='small'
                type='text'
                placeholder='Max Price'
                value={price[1] ? Currency.formatRp(price[1]) : ''}
                onChange={(e) => handlePriceChange(e.target.value, 1)}
              />
            </li>
            <li className={style.selectItem}>
              <Button
                type='button'
                size='small'
                level='block'
                disabled={!price[0] || !price[1]}
                onClick={() => {
                  onChange(price);
                  setOpen(false);
                  if (onApply) onApply();
                }}>
                Apply
              </Button>
            </li>
          </ul>
        ) : (
          <ul className={style.selectList}>
            {filteredData.length === 0 ? (
              <li className={style.selectItem}>Data tidak ditemukan</li>
            ) : (
              filteredData.map((item) => (
                <li
                  className={`${style.selectItem} ${value.includes(item.value) ? style.selectItemActive : ''}`}
                  key={filterKey ? `${filterKey}-${item.value}` : item.value}>
                  <label
                    htmlFor={filterKey ? `${filterKey}-${item.value}` : item.value}
                    className={style.checkboxWrapper}>
                    <span className={style.checkboxLabel}>
                      {type === 'color' && (
                        <span
                          className={style.checkboxLabelColor}
                          style={{ backgroundColor: item.label.toLowerCase() }}></span>
                      )}
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.label}
                          className={style.checkboxLabelImage}
                          width={80}
                          height={16}
                        />
                      )}
                      {!item.image && item.label}
                    </span>
                    <span className={style.checkbox}>
                      {item.total && <span className={style.checkboxTotal}>{item.total}</span>}
                      <input
                        className={style.checkboxInput}
                        type='checkbox'
                        id={filterKey ? `${filterKey}-${item.value}` : item.value}
                        checked={value.includes(item.value)}
                        onChange={() => handleSelect(item.value)}
                      />
                      <span className={style.checkboxInner}></span>
                    </span>
                  </label>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectView;
