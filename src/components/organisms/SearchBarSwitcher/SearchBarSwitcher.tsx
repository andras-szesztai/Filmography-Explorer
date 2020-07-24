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
  return (
    <div css={containerStyle}>
      <AnimateSharedLayout>
        <button
          type="button"
          onClick={() => setIsPersonSearch(true)}
          css={css`
          ${buttonStyle}
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          ${flexButtonStyle}
        `}
        >
          <motion.span
            animate={{ color: isPersonSearch ? colors.textColorSecondary : colors.textColorPrimary }}
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
          css={css`
          ${buttonStyle}
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          ${flexButtonStyle}
        `}
        >
          <motion.span
            animate={{ color: !isPersonSearch ? colors.textColorSecondary : colors.textColorPrimary }}
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
