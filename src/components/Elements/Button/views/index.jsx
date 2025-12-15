// -- core
import Link from 'next/link';

// -- styles
import style from '@elements/Button/styles//style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const Button = (props) => {
  const { variant, children, href, icon, level = 'default', color, size } = props;

  const iconCont = icon && <SystemIcon name={icon} />;
  let variantStyle = style.btn;
  if (variant === 'outlined') {
    variantStyle += ' ' + style.btnOutlined;
  }
  if (variant === 'icon') {
    variantStyle += ' ' + style.btnIcon;
  }
  if (variant === 'underline') {
    variantStyle += ' ' + style.btnUnderline;
  }
  if (variant === 'transparent') {
    variantStyle += ' ' + style.btnTransparent;
  }
  if (level === 'block') {
    variantStyle += ' ' + style.btnBlock;
  }
  if (color === 'white') {
    variantStyle += ' ' + style.btnWhite;
  }
  if (size === 'small') {
    variantStyle += ' ' + style.btnSmall;
  }

  if (href) {
    return (
      <Link {...props} className={variantStyle}>
        {variant !== 'underline' ? <span className={style.btnText}>{children}</span> : children}
        {iconCont}
      </Link>
    );
  }

  return (
    <button {...props} className={variantStyle}>
      {variant !== 'underline' ? <span className={style.btnText}>{children}</span> : children}
      {iconCont}
    </button>
  );
};

export default Button;
