import React from 'react'
import { motion } from 'framer-motion'
import chroma from 'chroma-js'
import { IoMdBuild } from 'react-icons/io'
import { css } from '@emotion/core'

// Style
import { colors, space, fontSize } from '../../../styles/variables'

interface Props {
  bigText: string
  smallText: string
  height: number
  width: number
}

export default function Disclaimer({ bigText, smallText, height, width }: Props) {
  return (
    <div
      css={css`
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;
        height: ${height}px;
        width: ${width}px;
        font-size: ${fontSize.xl};

        background-color: ${chroma(colors.bgColorPrimary)
          .alpha(0.98)
          .hex()};
        padding: ${space[8]}px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: ${colors.textColorPrimary};
        font-weight: 200;
        text-align: center;

        .explain {
          margin-top: ${space[3]}px;
          font-size: ${fontSize.md};
        }
      `}
    >
      <p>{bigText}</p>
      <p className="explain">{smallText}</p>
      <div style={{ marginTop: space[3] }}>
        <IoMdBuild size={30} color={colors.textColorPrimary} />
      </div>
    </div>
  )
}
