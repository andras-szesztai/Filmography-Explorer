import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/core'

// Components
import { Image } from '../../atoms'

const ResultContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: repeat(2, 50%);
  grid-template-areas:
    'photo name'
    'photo job';
  grid-column-gap: 1.5rem;

  align-self: start;
  width: calc(100% - 10px);
  height: 60px;
  border-radius: ${space[1]}px;
  background-color: #fff;
  filter: drop-shadow(${dropShadow.primary});
  margin: 5px;
  padding: 4px 6px;
`

const NameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${themifyFontSize(2)};
  font-weight: 500;
  color: ${({ color }) => color};
  grid-area: name;
  margin-top: 2px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const JobContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${themifyFontSize(1)};
  font-weight: ${themifyFontWeight(4)};
  grid-area: job;
  margin-bottom: 3px;
  color: ${COLORS.textColor};

  span {
    font-weight: ${themifyFontWeight(1)};
  }
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

interface Props {}

const SearchResultContent = ({ handleClick }: Props) => {
  return (
    <ResultContainer variants={variants} onClick={handleClick}>
      <Image height={52} url={data[accessors.img]} alt={title} />
      <NameContainer color={accessors.color}>{title}</NameContainer>
      <JobContainer>
        {accessors.subText}:&nbsp;<span>{data[accessors.subTextValue]}</span>
      </JobContainer>
    </ResultContainer>
  )
}

export default SearchResultContent
