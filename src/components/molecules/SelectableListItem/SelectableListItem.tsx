import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import useWhatInput from 'react-use-what-input'

// Components
import ButtonHoverOverlay from '../../atoms/ButtonHoverOverlay/ButtonHoverOverlay'

// Styles
import { space, colors, buttonNoFocus, buttonFocus, fontWeight, fontSize, buttonStyle } from '../../../styles/variables'

interface Props {
  text: string
  icon: IconType
  iconSize: number
  handleSelect?: () => void
  additionalHoverCondition?: boolean
}

const SelectableListItem = ({ text, icon: Icon, iconSize, handleSelect, additionalHoverCondition = true }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const [currentInput] = useWhatInput()
  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => handleSelect && handleSelect()}
      onKeyDown={({ keyCode }) => {
        if (keyCode === 13 && handleSelect) {
          handleSelect()
        }
      }}
      css={css`
        white-space: nowrap;
        list-style-type: none;
        position: relative;

        font-weight: ${fontWeight.sm};
        font-size: ${fontSize.sm};

        border-radius: ${space[1]}px;
        padding: ${space[1] + 1}px ${space[3]}px ${space[1] + 2}px ${space[3]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        letter-spacing: .8px;

        ${buttonStyle}
        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};

        cursor: ${isHovered && additionalHoverCondition ? 'pointer' : 'default'};
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
      `}
    >
      <ButtonHoverOverlay isHovered={isHovered && additionalHoverCondition}>
        <Icon size={iconSize} color={colors.textColorPrimary} />
      </ButtonHoverOverlay>
      {text}
    </motion.button>
  )
}

SelectableListItem.defaultProps = {
  handleSelect: () => null,
  additionalHoverCondition: true
}

export default SelectableListItem
