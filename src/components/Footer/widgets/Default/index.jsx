// -- organisms
import Footer from '@components/Footer/views';

// -- dummy
import dummyData from '@components/Footer/data';

const FooterWidget = () => {
  return <Footer data={dummyData.data} />;
};

export default FooterWidget;
