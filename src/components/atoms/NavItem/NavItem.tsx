import React from 'react'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import { motion } from 'framer-motion'

// Styles
import { IoIosSearch } from 'react-icons/io'
import { useMeasure } from 'react-use'
import { space, colors, fontSize, fontWeight, buttonStyle, buttonNoFocus, buttonFocus } from '../../../styles/variables'

interface Props {
  text: string
  isActive: boolean
  withMargin?: boolean
}

const NavItem: React.FC<Props> = ({ text, isActive, withMargin }) => {
  const [currentInput] = useWhatInput()
  const [isHovered, setIsHovered] = React.useState(false)
  const [ref, { width }] = useMeasure<HTMLButtonElement>()
  return (
    <motion.button
      ref={ref}
      type="button"
      animate={{ color: isActive ? colors.accentSecondary : colors.textColorPrimary }}
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      css={css`
        font-size: ${fontSize.md}px;
        color: ${colors.textColorPrimary};
        font-size: ${fontSize.lg};
        font-weight: ${fontWeight.md};
        letter-spacing: 2px;
        position: relative;
        margin-left: ${withMargin ? space[10] : 0}px;
        padding: 0;

        ${buttonStyle}
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      {text}
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered || isActive ? width : 0,
          opacity: isHovered || isActive ? 1 : 0,
          backgroundColor: isActive ? colors.accentSecondary : colors.textColorPrimary
        }}
        css={css`
          position: absolute;
          height: 1px;
          bottom: -7px;
          left: 0;
          right: 0;
          border-radius: 5px;
        `}
      />
    </motion.button>
  )
}

export default NavItem
