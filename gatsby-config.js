module.exports = {
  pathPrefix: '/running_page', // Change to `/running_page` when running on github pages
  siteMetadata: {
    siteTitle: 'WuLeiYuan Running Page',
    siteUrl: 'https://yihong.run',
    logo: 'https://upload.shejihz.com/2019/04/0eefe2eaafd7c8e49830e6afb396c7d4.jpg?x-oss-process=image/resize,m_fill,w_1600,h_1600#',
    description: 'Personal site and blog',
    navLinks: [
      {
        name: 'Blog',
        url: 'https://yihong.run/running',
      },
      {
        name: 'About',
        url: 'https://github.com/yihong0618/running_page/blob/master/README-CN.md',
      },
    ],
  },
  plugins: [
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/static/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        rootFolder: './',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#e1e1e1',
        theme_color: '#e1e1e1',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    }
  ],
};
