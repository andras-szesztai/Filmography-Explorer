import React from 'react'
import { css } from '@emotion/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import useWhatInput from 'react-use-what-input'
import { IoIosFilm, IoMdPerson } from 'react-icons/io'

// Styles
import { colors, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { containerStyle, flexButtonStyle, backgroundStyle } from './styles'

interface Props {
  isPersonSearch: boolean
  setIsPersonSearch: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBarSwitcher({ isPersonSearch, setIsPersonSearch }: Props) {
  const [currentInput] = useWhatInput()
  const [isPersonHovered, setIsPersonHovered] = React.useState(false)
  const [isMovieHovered, setIsMovieHovered] = React.useState(false)
  return (
    <div css={containerStyle}>
      <AnimateSharedLayout>
        <button
          type="button"
          onClick={() => setIsPersonSearch(true)}
          onMouseOver={() => {
            setIsPersonHovered(true)
          }}
          onFocus={() => {
            setIsPersonHovered(true)
          }}
          onMouseLeave={() => {
            setIsPersonHovered(false)
          }}
          onBlur={() => {
            setIsPersonHovered(false)
          }}
          css={css`
          ${buttonStyle}
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          ${flexButtonStyle}
        `}
        >
          <motion.span
            animate={{
              color: isPersonSearch ? colors.textColorSecondary : colors.textColorPrimary,
              scale: isPersonHovered ? 1.25 : 1,
              transition: {
                scale: transition.whileHover
              }
            }}
            css={css`
              z-index: 2;
            `}
          >
            <IoMdPerson size={22} />
          </motion.span>
          {isPersonSearch && <motion.div layoutId="outline" transition={transition.secondary} css={backgroundStyle} />}
        </button>
        <button
          type="button"
          onClick={() => setIsPersonSearch(false)}
          onMouseOver={() => {
            setIsMovieHovered(true)
          }}
          onFocus={() => {
            setIsMovieHovered(true)
          }}
          onMouseLeave={() => {
            setIsMovieHovered(false)
          }}
          onBlur={() => {
            setIsMovieHovered(false)
          }}
          css={css`
          ${buttonStyle}
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          ${flexButtonStyle}
        `}
        >
          <motion.span
            animate={{
              color: !isPersonSearch ? colors.textColorSecondary : colors.textColorPrimary,
              scale: isMovieHovered ? 1.25 : 1,
              transition: {
                scale: transition.whileHover
              }
            }}
            css={css`
              z-index: 2;
            `}
          >
            <IoIosFilm size={24} />
          </motion.span>
          {!isPersonSearch && <motion.div layoutId="outline" transition={transition.secondary} css={backgroundStyle} />}
        </button>
      </AnimateSharedLayout>
    </div>
  )
}

export default SearchBarSwitcher
