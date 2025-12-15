// -- widgets
import HeaderWidget from '@components/Header/widgets/Default';
import FooterWidget from '@components/Footer/widgets/Default';
import MainSite from '@components/MainSite';

const LayoutMain = (props) => {
  const { children } = props;

  return (
    <>
      <HeaderWidget />
      <MainSite>{children}</MainSite>
      <FooterWidget />
    </>
  );
};

export default LayoutMain;
