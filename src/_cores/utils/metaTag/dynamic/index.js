// -- configs
import DefaultSEO from '@configs/SEO';

// -- models
import metaModel from '@components/Meta/models';

// -- utils
import stringKeywords from '@utils/stringKeywords';

const metaTagDynamic = async (d = {}) => {
  // const {
  //   data: { data: dataDefault }
  // } = await metaModel.default();
  const dataDefault = null;

  const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

  // extract defaults from DefaultSEO or metaModel
  const title = dataDefault?.title || DefaultSEO.title;
  const description = dataDefault?.description || DefaultSEO.description;
  const keywords = dataDefault?.keywords || DefaultSEO.keywords;
  const siteURL = dataDefault?.site_url || DefaultSEO.siteURL;
  const siteName = dataDefault?.site_name || DefaultSEO.siteName;
  const twitterUsername = dataDefault?.twitter || DefaultSEO.twitter.username;
  const openGraphImage = dataDefault?.og_image || DefaultSEO.openGraph.image;
  const twitterImage = dataDefault?.twitter_image || DefaultSEO.twitter.image;
  const openGraph = DefaultSEO.openGraph;
  const twitter = DefaultSEO.twitter;

  const pageTitle = d.page ? `${d.page} | ${title}` : title;
  const pageDescription = d.page ? `${d.page} | ${description}` : description;
  const pageKeywords = d.page ? `${stringKeywords(d.page)}, ${keywords}` : keywords;
  const pageUrl = new URL(d.link || '', siteURL).toString();

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.toLowerCase(),
    metadataBase,
    alternates: {
      canonical: pageUrl
    },
    ...(openGraph.enable && {
      openGraph: {
        locale: openGraph.locale,
        type: openGraph.type,
        siteName: siteName,
        title: pageTitle,
        description: pageDescription,
        url: new URL(d.link || '', metadataBase).toString(),
        images: [
          {
            url: new URL(d.ogImage || openGraphImage, metadataBase).toString(),
            alt: d.title || title
          }
        ]
      }
    }),
    ...(twitter.enable && {
      twitter: {
        card: twitter.card,
        site: twitterUsername,
        siteId: twitterUsername,
        creator: twitterUsername,
        title: pageTitle,
        description: pageDescription,
        images: [new URL(d.twitterImage || twitterImage, metadataBase).toString()]
      }
    })
  };
};

export default metaTagDynamic;
