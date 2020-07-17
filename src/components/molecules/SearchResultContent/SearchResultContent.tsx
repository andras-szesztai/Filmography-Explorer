import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import isEmpty from 'lodash/isEmpty'

// Components
import { Image } from '../../atoms'

// Types
import { PersonDetails } from '../../../types/person'

// Styles
import { space, colors, fontSize, fontWeight, height, dropShadow } from '../../../styles/variables'

const containerStyle = css`
  align-self: start;
  width: calc(100% - ${space[2]}px);
  height: ${height.searchResultHeight}px;
  border-radius: ${space[1]}px;
  background-color: ${colors.bgColorSecondary};
  filter: drop-shadow(${dropShadow.header.ternary});
  margin: ${space[1]}px;
  padding: ${space[1] + 2}px ${space[2]}px;
  color: ${colors.textColorSecondary};
`

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: ${space[9]}px 1fr;
  grid-template-rows: repeat(2, 50%);
  grid-template-areas:
    'photo name'
    'photo job';
  grid-column-gap: ${space[3]}px;
`

const flexContainerStyle = css`
  display: flex;
  align-items: center;
`

const nameContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.lg};

  grid-area: name;
  margin-top: ${space[1]}px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const jobContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.sm};
  grid-area: job;
  margin-bottom: ${space[1]}px;
`

const variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12
    }
  },
  exit: {
    y: '-100%',
    opacity: -1,
    transition: {
      type: 'spring',
      damping: 12
    }
  }
}

interface Props {
  handleClick?: () => void
  handleMouseover?: () => void
  zIndex?: number
  data?: PersonDetails
  noResult?: boolean
  inputText?: string
}

const SearchResultContent = ({ data, handleClick, handleMouseover, zIndex, noResult, inputText }: Props) => {
  return (
    <motion.div
      css={css`
      ${containerStyle}
        ${noResult ? flexContainerStyle : gridContainerStyle}
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
      {noResult && (
        <span
          css={css`
            ${nameContainerStyle}
            font-weight: ${fontWeight.md};
            margin-top: 0px;
          `}
        >
          Sorry, there is no result for {inputText}
        </span>
      )}
    </motion.div>
  )
}

SearchResultContent.defaultProps = {
  handleClick: () => null,
  handleMouseover: () => null,
  zIndex: 0,
  data: {},
  noResult: false,
  inputText: ''
}

export default SearchResultContent
