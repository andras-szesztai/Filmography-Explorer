import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import isEmpty from 'lodash/isEmpty'

// Components
import { Image } from '../../atoms'

// Types
import { containerStyle, gridContainerStyle, variants, nameContainerStyle, jobContainerStyle } from './styles'
import { MovieSearchResultObject } from '../../../types/movie'

interface Props {
  handleClick: () => void
  handleMouseover: () => void
  zIndex: number
  data: MovieSearchResultObject
}

const SearchResultContent = ({ data, handleClick, handleMouseover, zIndex }: Props) => {
  return (
    <motion.div
      css={css`
        ${containerStyle}
        ${gridContainerStyle}
        z-index: ${zIndex};
      `}
      variants={variants}
      onClick={handleClick}
      onMouseOver={handleMouseover}
    >
      {data && !isEmpty(data) && (
        <>
          <Image url={data.poster_path} alt={data.title} />
          <span css={nameContainerStyle}>{data.title}</span>
          <span css={jobContainerStyle}>Media:&nbsp;{data.media_type}</span>
        </>
      )}
    </motion.div>
  )
}

export default SearchResultContent
