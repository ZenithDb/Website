const { getAllPosts } = require('./src/utils/api-docs');
const generateDocPagePath = require('./src/utils/generate-doc-page-path');

module.exports = {
  poweredByHeader: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    const docPosts = await getAllPosts();
    const docsRedirects = docPosts.reduce((acc, post) => {
      const { slug, redirectFrom: postRedirects } = post;
      if (!postRedirects || !postRedirects.length) {
        return acc;
      }

      const postRedirectsArray = postRedirects.map((redirect) => ({
        source: redirect,
        destination: generateDocPagePath(slug),
        permanent: true,
      }));

      return [...acc, ...postRedirectsArray];
    }, []);

    return [
      {
        source: '/team',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/careers',
        permanent: true,
      },
      // Proxy has an error message, that suggests to read `https://neon.tech/sni` for more details.
      {
        source: '/sni',
        destination: '/docs/how-to-guides/connectivity-issues',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/introduction/about',
        permanent: true,
      },
      ...docsRedirects,
    ];
  },
  webpack(config) {
    // https://github.com/vercel/next.js/issues/25950#issuecomment-863298702
    const fileLoaderRule = config.module.rules.find((rule) => {
      if (rule.test instanceof RegExp) {
        return rule.test.test('.svg');
      }
      return null;
    });

    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.inline.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
              ],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /(?<!inline)\.svg$/,
      type: 'asset/resource',
      use: 'svgo-loader',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    return config;
  },
};
