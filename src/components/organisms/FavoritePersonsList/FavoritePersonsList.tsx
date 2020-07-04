import React, { useState } from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { useMeasure, useLocalStorage } from 'react-use'
import { IoIosSearch } from 'react-icons/io'
import { useSelector } from 'react-redux'

// Styles
import { space, colors, height, fontSize, dentedStyle } from '../../../styles/variables'
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'
import { FavoritePersonsObject } from '../../../types/person'
import { getObjectValues } from '../../../utils/dataHelpers'
import { CombinedState } from '../../../types/state'

const ContainerStyle = css`
  position: fixed;
  left: ${space[8]}px;
  bottom: 0px;
  width: calc(100vw - ${space[13]}px);
  height: ${height.personCardClosed}px;

  background-color: ${colors.bgColorSecondary};
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: ${space[4]}px;
  padding: 0 ${space[4]}px;
  border-radius: ${space[1]}px ${space[1]}px 0 0;

  font-size: ${fontSize.md};
`

interface Props {
  name: string
  id: number
}

const ListItem = ({ name, id }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <li
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      css={css`
        white-space: nowrap;
        list-style-type: none;
        position: relative;

        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};

        border-radius: ${space[1]}px;
        padding: ${space[1]}px ${space[3]}px ${space[1] + 1}px ${space[3]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
        cursor: pointer;
        letter-spacing: 1px;
        /* TODO: change for non-active only */
      `}
    >
      <motion.div
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
      {name}
    </li>
  )
}

const PlaceHolder = () => {
  return (
    <motion.li
      layoutId="list-item"
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
        {width && (
          <ul
            css={css`
            position: absolute;
            ${dentedStyle}
            border-radius: ${space[1]}px;
            overflow-x: auto;
            height: 75%;
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
            {favs.length ? [...favs].reverse().map(({ name, id }) => <ListItem name={name} id={id} key={id} />) : <div>None</div>}
            <PlaceHolder />
          </ul>
        )}
      </div>
    </div>
  )
}

export default FavoritePersonsList
