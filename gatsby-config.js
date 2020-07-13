module.exports = {
  siteMetadata: {
    title: 'Filmography Explorer',
    description: 'A place to explorer all about the filmography of your favorite writers, directors, actors and more.',
    keywords: 'gatsbyjs, gatsby, javascript, react, d3.js, films, movies, series',
    siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com',
    author: {
      name: 'András Szesztai',
      url: 'https://twitter.com/AndSzesztai',
      email: 'and.szesztai@gmail.com'
    }
  },
  plugins: [
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'content',
    //     path: `${__dirname}/src/content`
    //   }
    // },

    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/templates/Layout/Layout.tsx`)
      }
    },

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
