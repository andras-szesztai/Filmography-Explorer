import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'

import 'modern-normalize'
import '../../styles/main.css'
import { colors } from '../../styles/variables'

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
          body {
            background-color: ${colors.bgColor};
            color: ${colors.textColor};
          }
        `}
      />
      {children}
    </>
  )
}
export default Layout
