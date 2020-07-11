import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { motion } from 'framer-motion'

// Components
import { Header } from '../../molecules'

// Styles
import 'modern-normalize'
import '../../../styles/main.css'
import { colors, height } from '../../../styles/variables'

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
        meta={[
          { name: 'description', content: siteMetadata.description },
          { name: 'keywords', content: siteMetadata.keywords }
        ]}
      />
      <Global
        styles={css`
          body {
            background-color: ${colors.bgColorPrimary};
            color: ${colors.textColorPrimary};
          }
        `}
      />
      <motion.div
        css={css`
          height: 100vh;
          width: 100vw;

          display: grid;
          grid-template-rows: ${height.header}px 1fr ${height.header}px;
        `}
      >
        <Header />
        {children}
      </motion.div>
    </>
  )
}
export default Layout
