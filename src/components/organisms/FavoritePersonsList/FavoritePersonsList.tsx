import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useMeasure } from 'react-use'
import { IoIosSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import useWhatInput from 'react-use-what-input'

// Types
import { CombinedState } from '../../../types/state'

// Actions
import { setActiveNameID } from '../../../reducer/personReducer/actions'

// Helpers
import { getObjectValues } from '../../../utils/dataHelpers'

// Styles
import {
  space,
  colors,
  height,
  fontSize,
  dentedStyle,
  buttonStyle,
  buttonNoFocus,
  buttonFocus,
  fontWeight
} from '../../../styles/variables'

const ContainerStyle = css`
  position: fixed;
  left: ${space[8]}px;
  bottom: 0px;
  width: calc(100vw - ${space[13]}px);
  height: ${height.personCardClosed}px;

  background-color: ${colors.bgColorSecondary};
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: ${space[5]}px;
  padding: 0 ${space[3]}px 0 ${space[5]}px;
  border-radius: ${space[1]}px ${space[1]}px 0 0;

  font-size: ${fontSize.md};
`

interface Props {
  text: string
  id?: number
}

const ListItem = ({ text, id }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()
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

        font-weight: ${fontWeight.xs};
        border-radius: ${space[1]}px;
        padding: ${space[1]}px ${space[4]}px ${space[1] + 1}px ${space[4]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        letter-spacing: 1px;

        ${buttonStyle}
        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};
        ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

        cursor: pointer;
        /* TODO: change for non-active only */
      `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
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

ListItem.defaultProps = {
  id: undefined
}

const PlaceHolder = () => {
  return (
    <div
      css={css`
        opacity: 0;
        padding: ${space[1]}px;
        pointer-events: none;
      `}
    />
  )
}

const FavoritePersonsList = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>()
  const favorites = useSelector((state: CombinedState) => state.personReducer.favorites)

  const favs = getObjectValues(favorites).map(({ name, id }) => ({ name, id }))

  return (
    <div css={ContainerStyle}>
      <div
        css={css`
          display: flex;
          align-items: center;
          color: ${colors.textColorSecondary};
        `}
      >
        My recent favorites
      </div>
      <div
        ref={ref}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
        `}
      >
        <AnimateSharedLayout>
          <motion.div
            css={css`
            position: absolute;
            ${dentedStyle}
            border-radius: ${space[1]}px;
            overflow-x: auto;
            overflow-y: hidden;
            height: 70%;
            width: ${width}px;

            display: flex;
            align-items: center;

            padding-left: ${space[2]}px;
            margin: 0;

            ::-webkit-scrollbar {
              height: ${space[1]}px;
            }

            ::-webkit-scrollbar-track {
              background: ${colors.bgColorSecondaryDark};
            }

            ::-webkit-scrollbar-thumb {
              background: ${colors.accentSecondary};
              border-radius: ${space[1]}px;
            }
          `}
          >
            <AnimatePresence>
              {favs.length &&
                [...favs].reverse().map(({ name, id }) => (
                  <motion.span key={`${id}-favlist`} animate>
                    <ListItem text={name} id={id} />
                  </motion.span>
                ))}
            </AnimatePresence>
            <PlaceHolder />
          </motion.div>
        </AnimateSharedLayout>
        <AnimatePresence>
          {!favs.length && (
            <motion.div
              css={css`
                padding-left: ${space[4]}px;
                color: ${colors.textColorSecondary};
              `}
            >
              Please start the list by marking a person as your favorite
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FavoritePersonsList
