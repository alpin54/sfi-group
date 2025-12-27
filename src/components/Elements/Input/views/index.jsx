// -- libraries
import { useState } from 'react';

// -- styles
import style from '@elements/Input/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const InputView = (props) => {
  const { icon, error, variant = 'input', type, size, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  // Tentukan tipe input final (show/hide logic)
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  // Untuk show/hide icon
  const renderPasswordToggle = () =>
    type === 'password' ? (
      <span
        className={`${style.icon} ${style.iconPassword}`}
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={0}
        role='button'
        aria-label={showPassword ? 'Hide password' : 'Show password'}>
        <SystemIcon name={showPassword ? 'eye' : 'eye-slash'} />
      </span>
    ) : null;

  return (
    <>
      {icon && type !== 'password' && (
        <span className={`${style.icon} ${type === 'search' && style.iconUnderline}`}>
          <SystemIcon name={icon} />
        </span>
      )}
      {variant === 'textarea' ? (
        <textarea
          className={`${style.textarea} ${error ? style.error : ''} ${icon ? style.inputIcon : ''}`}
          {...rest}
        />
      ) : variant === 'select' ? (
        (() => {
          const options = Array.isArray(rest.data) ? rest.data : [];
          return (
            <select
              className={`${style.select} ${error ? style.error : ''} ${icon ? style.inputIcon : ''}`}
              name={rest.name}
              {...rest}>
              <option value=''>{rest.label}</option>
              {options.map((option) => (
                <option key={String(option.value ?? option.label)} value={String(option.value ?? option.label)}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        })()
      ) : (
        <>
          <input
            className={`${style.input} ${error ? style.error : ''} ${icon && type !== 'password' ? style.inputIcon : type == 'password' ? style.inputPassword : ''} ${type === 'search' ? style.inputUnderline : ''} ${size === 'small' ? style.inputSmall : ''}`}
            type={inputType}
            {...rest}
          />
          {type === 'password' && renderPasswordToggle()}
        </>
      )}
      {error && <span className={style.errorMsg}>{error}</span>}
    </>
  );
};

export default InputView;
