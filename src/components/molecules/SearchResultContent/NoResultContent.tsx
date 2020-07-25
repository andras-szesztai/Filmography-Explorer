import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Styles
import { fontWeight } from '../../../styles/variables'
import { flexContainerStyle, variants, nameContainerStyle, containerStyle } from './styles'

interface Props {
  inputText: string
}

const SearchResultContent = ({ inputText }: Props) => {
  return (
    <motion.div
      css={css`
        ${containerStyle}
        ${flexContainerStyle}
      `}
      variants={variants}
    >
      <span
        css={css`
            ${nameContainerStyle}
            font-weight: ${fontWeight.md};
            margin-top: 0px;
          `}
      >
        Sorry, there is no result for {inputText}
      </span>
    </motion.div>
  )
}

export default SearchResultContent
