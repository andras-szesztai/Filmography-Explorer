import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'

// import 'modern-normalize'
// import '../../styles/main.css'

const Layout: React.FC = ({ children }) => {
  const {
    site: { siteMetadata }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author {
            email
            name
            url
          }
          description
          keywords
          siteUrl
          title
        }
      }
    }
  `)
  return (
    <>
      <Helmet
        title={siteMetadata.title}
        meta={[{ name: 'description', content: siteMetadata.description }, { name: 'keywords', content: siteMetadata.keywords }]}
      />
      <Global
        styles={css`
          @import url('https://use.typekit.net/sds6vgg.css');
          html {
            box-sizing: border-box;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }

          html {
            font-family: gill-sans-nova, sans-serif;
            font-weight: 300;
            font-style: normal;
            font-size: 8px;
          }
        `}
      />
      {children}
    </>
  )
}
export default Layout
