import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'

// Styles
import { useMeasure } from 'react-use'
import { space, colors, height, fontSize, dentedStyle } from '../../../styles/variables'

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

const ListItem = () => {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <motion.li
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layoutId="list-item"
      css={css`
        white-space: nowrap;
        list-style-type: none;

        background: ${colors.bgColorPrimary};
        color: ${colors.textColorPrimary};

        border-radius: ${space[1]}px;
        padding: ${space[1]}px ${space[3]}px ${space[1] + 1}px ${space[3]}px;
        margin: 0 ${space[1]}px;
        user-select: none;
      `}
    >
      Lorem, ipsum dolor.
    </motion.li>
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
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <PlaceHolder />
          </ul>
        )}
      </div>
    </div>
  )
}

export default FavoritePersonsList
