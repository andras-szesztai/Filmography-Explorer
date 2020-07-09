import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { FaFilter } from 'react-icons/fa'
import useWhatInput from 'react-use-what-input'

// Components
import ButtonHoverOverlay from '../../atoms/ButtonHoverOverlay/ButtonHoverOverlay'

// Styles
import { space, colors, buttonNoFocus, buttonFocus, fontWeight, fontSize, buttonStyle } from '../../../styles/variables'

interface Props {
  text: string
}

const GenreListItem = ({ text }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const [currentInput] = useWhatInput()
  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => {
        console.log('filter for genre')
        // if (id) {
        //   if (activeMovieID) {
        //     dispatch(emptyMovieDetails())
        //   }
        //   dispatch(setActiveNameID(id))
        // }
      }}
      onKeyDown={() => {
        console.log('filter for genre')
        // if (keyCode === 13 && id) {
        //   if (activeMovieID) {
        //     dispatch(emptyMovieDetails())
        //   }
        //   dispatch(setActiveNameID(id))
        // }
      }}
      css={css`
        white-space: nowrap;
        list-style-type: none;
        position: relative;

        font-weight: ${fontWeight.md};
        font-size: ${fontSize.sm};

        border-radius: ${space[1]}px;
        padding: ${space[1]}px ${space[3]}px ${space[1] + 1}px ${space[3]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        letter-spacing: .8px;

        ${buttonStyle}
        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};

        cursor: pointer;
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      <ButtonHoverOverlay isHovered={isHovered}>
        <FaFilter size={12} color={colors.textColorPrimary} />
      </ButtonHoverOverlay>
      {text}
    </motion.button>
  )
}

export default GenreListItem
