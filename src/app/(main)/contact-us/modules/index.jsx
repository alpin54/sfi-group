// -- components
import ContactUsWidget from '@components/ContactUs/widgets/Default';

// -- Men
import Menu from '@components/Header/views/menu';

const ContactUs = () => {
  return (
    <>
      <Menu data='home' />
      <ContactUsWidget />
    </>
  );
};

export default ContactUs;
