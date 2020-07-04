import React from 'react'
import { css } from '@emotion/core'
import { motion, AnimateSharedLayout } from 'framer-motion'

// Styles
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

const ListItem = () => (
  <motion.li
    layoutId="list-item"
    css={css`
      white-space: nowrap;
      list-style-type: none;

      background: ${colors.bgColorPrimary};
      color: ${colors.textColorPrimary};

      border-radius: ${space[1]}px;
      padding: ${space[1]}px ${space[3]}px;
      margin: 0 ${space[1]}px;
      user-select: none;
    `}
  >
    Lorem, ipsum.
  </motion.li>
)

const FavoritePersonsList = () => {
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
      <AnimateSharedLayout>
        <motion.ul
          css={css`
            justify-self: center;
            align-self: center;
            ${dentedStyle}
            overflow-x: auto;
            border-radius: ${space[1]}px;
            height: 60%;
            width: 100%;

            display: flex;
            align-items: center;

            padding-left: ${space[2]}px;

            color: red;

            ::-webkit-scrollbar {
              height: ${space[1]}px;
            }

            ::-webkit-scrollbar-track {
              background: ${colors.bgColorSecondaryDark};
            }

            ::-webkit-scrollbar-thumb {
              background: ${colors.bgColorPrimary};
              border-radius: ${space[1]}px;
            }

            li {
            }
          `}
        >
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  )
}

export default FavoritePersonsList
