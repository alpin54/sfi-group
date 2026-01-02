// -- styles
import style from '@elements/SwitchToggle/styles/style.module.scss';

const SwitchToggle = (props) => {
  const { checked = true, disabled = false, onChange, label = '', id = '' } = props;

  return (
    <label className={style.switch} htmlFor={id}>
      <input type='checkbox' id={id} checked={checked} disabled={disabled} onChange={onChange} />
      <span className={style.track}>
        <span className={style.thumb} />
      </span>
      {label && <span className={style.label}>{label}</span>}
    </label>
  );
};
export default SwitchToggle;
