/* ------------------------------------------------------------------------------
@name: Default Schema
@description: Default Schema
--------------------------------------------------------------------------------- */

const DefaultSchema = {
  organization: {
    context: 'http://schema.org',
    id: 'https://crappo-psi.vercel.app#organization',
    type: 'Organization',
    name: 'Crappo',
    url: 'https://crappo-psi.vercel.app',
    logo: 'https://crappo-psi.vercel.app/logo/logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-81380003385',
        contactType: 'sales',
        areaServed: 'ID'
      }
    ],
    sameAs: ['https://www.instagram.com/crappo', 'https://www.facebook.com/crappo', 'https://www.tiktok.com/@crappo']
  },
  website: {
    context: 'http://schema.org',
    id: 'https://crappo-psi.vercel.app#website',
    type: 'WebSite',
    url: 'https://crappo-psi.vercel.app',
    name: 'Crappo'
  },
  webpage: {
    context: 'http://schema.org',
    id: 'https://crappo-psi.vercel.app#webpage',
    type: 'WebPage',
    url: 'https://crappo-psi.vercel.app',
    name: 'Crappo'
  }
};

export default DefaultSchema;
