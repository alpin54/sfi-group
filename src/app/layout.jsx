// -- tag manager
import { GoogleAnalytics } from '@next/third-parties/google';

// -- utils
import metaTag, { MetaTagDefault } from '@utils/metaTag';
import { SchemaDefault } from '@utils/schema';

// -- style
import '@styles/app.scss';

// -- metadata
const metadata = metaTag.data();

// -- viewport
const viewport = metaTag.viewport();

// -- RootLayout --
const RootLayout = (props) => {
  const { children } = props;

  return (
    <html lang='en'>
      {/* -- THE HEAD -- */}
      <head>
        {/* -- THE META TAG -- */}
        <MetaTagDefault />

        {/* -- THE TAG MANAGER -- */}
        <GoogleAnalytics gaId='G-LVTYY07QYD' />
      </head>

      {/* -- THE HEAD -- */}
      <body className='hold-transition'>
        {children}

        {/* -- THE SCHEMA -- */}
        <SchemaDefault />
      </body>
    </html>
  );
};

export { metadata, viewport };
export default RootLayout;
