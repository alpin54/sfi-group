// -- views
import ContactUs from '@components/ContactUs/views';

// -- data dummy
import data from '@components/ContactUs/data';

const ContactUsWidget = async () => {
  return <ContactUs data={data?.data} />;
};

export default ContactUsWidget;
