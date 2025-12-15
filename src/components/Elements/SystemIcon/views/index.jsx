const SystemIcon = ({ name }) => {
  const classNames = `fi fi-${name}`;

  return <i className={classNames}></i>;
};

export default SystemIcon;
