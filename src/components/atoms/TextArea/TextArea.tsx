import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { space, dentedStyle, fontSize, colors } from '../../../styles/variables'

interface Props {
  text?: string
  gridArea: string
}

const TextArea = ({ text, gridArea }: Props) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      css={css`
        grid-area: ${gridArea};
        place-self: stretch;
        border-radius: ${space[1]}px;

        overflow-y: auto;
        ${dentedStyle};

        border-radius: ${space[1]}px;

        color: ${colors.textColorSecondary};
        font-size: ${fontSize.sm};
        padding: ${space[1]}px ${space[3]}px ${space[0]}px ${space[2]}px;

        p {
          margin-top: 0;
          line-height: 1.5;

          ::selection {
            background: ${colors.textColorSecondary};
            color: ${colors.textColorPrimary};
          }
        }

        scrollbar-width: thin;
        scrollbar-color: rebeccapurple green;

        ::-webkit-scrollbar {
          width: ${space[1]}px;
        }

        ::-webkit-scrollbar-track {
          background: ${colors.bgColorSecondaryDark};
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.bgColorPrimary};
          border-radius: ${space[1]}px;
        }
      `}
    >
      <p>{text}</p>
    </motion.div>
  )
}

TextArea.defaultProps = {
  text: ''
}

export default TextArea
