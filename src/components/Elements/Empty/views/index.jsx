// -- style
import style from '@elements/Empty/styles/style.module.scss';

const EmptyView = (props) => {
  const { title, description, button } = props;

  return (
    <div className={style.empty}>
      <h4 className={style.title}>{title}</h4>
      <p className={style.description}>{description}</p>
      {button && <div className={style.btn}>{button}</div>}
    </div>
  );
};

export default EmptyView;
