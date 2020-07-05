import React from 'react'
import { useDispatch } from 'react-redux'
import useWhatInput from 'react-use-what-input'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { IoIosSearch } from 'react-icons/io'

// Actions
import { setActiveNameID } from '../../../reducer/personReducer/actions'

// Styles
import { fontWeight, space, buttonStyle, colors, buttonNoFocus, buttonFocus } from '../../../styles/variables'

interface Props {
  text: string
  id?: number
  activeID: number
}

const FavoritePersonsListItem = ({ text, id, activeID }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()
  const isActive = activeID === id
  return (
    <motion.button
      type="button"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => id && dispatch(setActiveNameID(id))}
      onKeyDown={({ keyCode }) => {
        if (keyCode === 13 && id) {
          dispatch(setActiveNameID(id))
        }
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1
      }}
      exit={{ y: 50, opacity: 0 }}
      css={css`
        white-space: nowrap;
        list-style-type: none;
        position: relative;

        font-weight: ${fontWeight.sm};
        border-radius: ${space[1]}px;
        padding: ${space[1]}px ${space[4]}px ${space[1] + 1}px ${space[4]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        letter-spacing: 1.1px;

        ${buttonStyle}
        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

        cursor: ${isActive ? 'auto' : 'pointer'};
      `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !isActive ? 1 : 0 }}
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: ${space[1]}px ${space[2]}px;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: ${colors.bgColorPrimary};
          border-radius: ${space[1]}px;

          pointer-events: none;
        `}
      >
        <IoIosSearch size={18} color={colors.textColorPrimary} />
      </motion.div>
      {text}
    </motion.button>
  )
}

FavoritePersonsListItem.defaultProps = {
  id: undefined
}

export default FavoritePersonsListItem
