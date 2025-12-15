// -- assets
import AuthImage1 from '@assets/image/dummy/auth-4.jpg';
import AuthImage2 from '@assets/image/dummy/auth-3.jpg';
import AuthImage3 from '@assets/image/dummy/auth-2.jpg';
import AuthImage4 from '@assets/image/dummy/auth-1.jpg';

const data = {
  images: [
    {
      alt: 'auth-1',
      image: AuthImage1
    },
    {
      alt: 'auth-2',
      image: AuthImage2
    },
    {
      alt: 'auth-3',
      image: AuthImage3
    },
    {
      alt: 'auth-4',
      image: AuthImage4
    }
  ],
  title: 'Verify Your Email Address',
  description:
    'We’ve sent a verification link to [email@dummy.com]. Please check your Inbox, and don’t forget to look in Spam, Promotions, or Recent folders if you don’t see it.'
};

export default data;
