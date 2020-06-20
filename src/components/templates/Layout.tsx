import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'

interface DataProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        keywords: string
      }
    }
  }
}

const IndexLayout: React.FC<DataProps> = ({ children, data }) => (
  <>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { name: 'keywords', content: data.site.siteMetadata.keywords }
      ]}
    />
    {children}
  </>
)

export default IndexLayout
