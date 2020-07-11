import React from 'react'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { motion, AnimatePresence } from 'framer-motion'
import { useMeasure } from 'react-use'

// Styles
import { space, colors, fontSize, fontWeight, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'

interface Props {
  text: string
  setActiveItem: React.Dispatch<React.SetStateAction<number>>
  activeItem: number
  itemNumber: number
  withMargin?: boolean
}

const NavItem: React.FC<Props> = ({ text, withMargin, setActiveItem, activeItem, itemNumber }) => {
  const [currentInput] = useWhatInput()
  const [isHovered, setIsHovered] = React.useState(false)
  const [ref, { width }] = useMeasure<HTMLButtonElement>()
  const isActive = activeItem === itemNumber
  return (
    <motion.button
      ref={ref}
      type="button"
      animate={{ color: isActive ? colors.accentSecondary : colors.textColorPrimary }}
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => {
        if (!isActive) {
          setActiveItem(itemNumber)
        }
      }}
      css={css`
        font-size: ${fontSize.md}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.sm};
        letter-spacing: 2px;
        position: relative;
        margin-left: ${withMargin ? space[10] : 0}px;
        padding: 0;

        ${buttonStyle}
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      {text}
      <AnimatePresence>
        {(isActive || isHovered) && (
          <motion.span
            initial={{ width: 0, x: -space[3], backgroundColor: colors.textColorPrimary }}
            animate={{
              width,
              x: 0,
              backgroundColor: isActive ? colors.accentSecondary : colors.textColorPrimary
            }}
            exit={{
              x: width,
              width: 0,
              backgroundColor: colors.textColorPrimary
            }}
            css={css`
              position: absolute;
              height: 1px;
              bottom: -7px;
              left: 0px;
              border-radius: 5px;
            `}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default NavItem
