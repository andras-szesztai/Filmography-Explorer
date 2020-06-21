import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Components
import { Image } from '../../atoms'

// Styles
import { space, colors, fontSize, fontWeight } from '../../../styles/variables'
import { ResultData } from '../SearchBar/SearchBar'

const containerStyle = css`
  display: grid;
  grid-template-columns: ${space[1]}px 1fr;
  grid-template-rows: repeat(2, 50%);
  grid-template-areas:
    'photo name'
    'photo job';
  grid-column-gap: ${space[3]}px;

  align-self: start;
  width: calc(100% - ${space[1]}px);
  height: ${space[13]}px;
  border-radius: ${space[1]}px;
  background-color: ${colors.bgColorSecondary};
  margin: ${space[1]}px;
  padding: ${space[1]}px ${space[2]}px;
  color: ${colors.textColorSecondary};
`

const variants = {
  enter: { y: '-100%', opacity: 0 },
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
  handleClick: () => void
  data: ResultData
}

const SearchResultContent = ({ data, handleClick }: Props) => {
  return (
    <motion.div css={containerStyle} variants={variants} onClick={handleClick}>
      <Image height={52} url={data.profile_path} alt={data.name} />
      <span
        css={css`
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
        `}
      >
        {data.name}
      </span>
      <span
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: ${fontSize.sm};
          font-weight: ${fontWeight.sm};
          grid-area: job;
          margin-bottom: 3px;
        `}
      >
        Known for:&nbsp;{data.known_for_department}
      </span>
    </motion.div>
  )
}

export default SearchResultContent
