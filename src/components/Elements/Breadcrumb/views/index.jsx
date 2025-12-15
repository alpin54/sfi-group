// -- core
import Link from 'next/link';

// -- style
import style from '@elements/Breadcrumb/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const BreadcrumbView = (props) => {
  const { data, variant = 'default', color = 'default' } = props;
  let styleClass = style.breadcrumb;
  if (color === 'white') {
    styleClass += ' ' + style.white;
  }
  if (variant === 'primary') {
    styleClass += ' ' + style.primary;
  }

  return (
    <ul className={styleClass}>
      {data.map((item, index) => (
        <li key={index} className={style.breadcrumbItem}>
          {index === 0 ? <Link href={item.href}>{item.text}</Link> : item.text}
          {item.icon && <SystemIcon name={item.icon} />}
        </li>
      ))}
    </ul>
  );
};

export default BreadcrumbView;
