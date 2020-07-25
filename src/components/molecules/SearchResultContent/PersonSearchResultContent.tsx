import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import isEmpty from 'lodash/isEmpty'

// Components
import { Image } from '../../atoms'

// Types
import { PersonDetails } from '../../../types/person'
import { containerStyle } from '../MoviesTooltip/styles'
import { gridContainerStyle, variants, nameContainerStyle, jobContainerStyle } from './styles'

interface Props {
  handleClick: () => void
  handleMouseover: () => void
  zIndex: number
  data: PersonDetails
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
          <Image url={data.profile_path} alt={data.name} />
          <span css={nameContainerStyle}>{data.name}</span>
          <span css={jobContainerStyle}>Known for:&nbsp;{data.known_for_department}</span>
        </>
      )}
    </motion.div>
  )
}

export default SearchResultContent
