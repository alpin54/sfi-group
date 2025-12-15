// -- libraries
import { useState, useRef, useEffect } from 'react';

// -- styles
import style from '@elements/Select/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const SelectView = ({
  label,
  data = [],
  value = [],
  onChange,
  border = false,
  icon = false,
  color = false,
  filterKey
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [selectBoxHeight, setSelectBoxHeight] = useState('0px');
  const ref = useRef(null);
  const selectBoxRef = useRef(null);
  const BREAKPOINT = 992;

  let classNames = style.select;
  if (open) classNames += ` ${style.open}`;
  if (border) classNames += ` ${style.border}`;
  if (icon) classNames += ` ${style.icon}`;

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
  const filteredData = data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

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

  return (
    <div className={classNames} ref={ref}>
      {icon && (
        <span className={style.selectIconFaders}>
          <SystemIcon name={icon} />
        </span>
      )}

      <input
        className={style.selectInput}
        placeholder={label}
        value={open ? search : renderSelectedLabel()}
        onClick={() => setOpen(!open)}
        onChange={(e) => setSearch(e.target.value)}
        readOnly={!open}
      />
      <span className={style.selectIcon}>
        <SystemIcon name='caret-down' />
      </span>

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
                    {color && (
                      <span
                        className={style.checkboxLabelColor}
                        style={{ backgroundColor: item.label.toLowerCase() }}></span>
                    )}
                    {item.label}
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
      </div>
    </div>
  );
};

export default SelectView;
