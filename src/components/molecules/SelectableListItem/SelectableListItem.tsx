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
  handleMouseover?: () => void
  handleMouseout?: () => void
  additionalHoverCondition?: boolean
  isActive?: boolean
  paddingSpace?: number
}

const SelectableListItem = ({
  text,
  icon: Icon,
  iconSize,
  handleSelect,
  additionalHoverCondition = true,
  isActive = true,
  handleMouseover,
  handleMouseout,
  paddingSpace
}: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const [currentInput] = useWhatInput()
  return (
    <motion.button
      type="button"
      initial={{
        background: isActive ? colors.bgColorPrimary : colors.bgColorPrimaryLight,
        paddingLeft: space[3]
      }}
      animate={{
        background: isActive ? colors.bgColorPrimary : colors.bgColorPrimaryLight,
        paddingLeft: isHovered ? paddingSpace : space[3]
      }}
      onMouseOver={() => {
        setIsHovered(true)
        if (handleMouseover) {
          handleMouseover()
        }
      }}
      onFocus={() => {
        setIsHovered(true)
        if (handleMouseover) {
          handleMouseover()
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (handleMouseout) {
          handleMouseout()
        }
      }}
      onBlur={() => {
        setIsHovered(false)
        if (handleMouseout) {
          handleMouseout()
        }
      }}
      onClick={() => additionalHoverCondition && handleSelect && handleSelect()}
      css={css`
        white-space: nowrap;
        list-style-type: none;
        position: relative;

        font-weight: ${fontWeight.sm};
        font-size: ${fontSize.sm};

        padding: ${space[1] + 1}px ${space[3]}px ${space[1] + 2}px ${space[3]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        letter-spacing: 0.8px;

        ${buttonStyle}
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
  handleMouseover: () => null,
  handleMouseout: () => null,
  additionalHoverCondition: true,
  isActive: true,
  paddingSpace: space[7]
}

export default SelectableListItem
