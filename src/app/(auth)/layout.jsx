// -- widgets
import MainSite from '@components/MainSite';

const LayoutAuth = (props) => {
  const { children } = props;

  return (
    <>
      <MainSite variant='auth'>{children}</MainSite>
    </>
  );
};

export default LayoutAuth;
