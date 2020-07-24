import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { IoMdInformationCircle } from 'react-icons/io'
import useWhatInput from 'react-use-what-input'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Styles
import {
  colors,
  space,
  handleSize,
  buttonStyle,
  width,
  height,
  dropShadow,
  buttonNoFocus,
  buttonFocus,
  fontSize,
  fontWeight
} from '../../../styles/variables'
import { transition } from '../../../styles/animation'

interface Props {
  pages: {
    title: string
    text: string
  }[]
}

function ExplainerCard({ pages }: Props) {
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: 1,
        y: isOpen ? -height.explainerVisible - space[1] : 0,
        transition: { ...transition.primary, stiffness: 140 }
      }}
      css={css`
        position: fixed;
        bottom: -${height.explainerTotal - space[2]}px;
        right: ${space[8]}px;

        background-color: ${colors.bgColorSecondary};
        border-radius: ${space[1]}px;
        filter: drop-shadow(${dropShadow.header.ternary});

        height: ${height.explainerTotal}px;
        width: ${width.explainer}px;
        z-index: 5;
        padding: ${space[1]}px ${space[3]}px ${space[2]}px ${space[3]}px;

        display: flex;

        ::after {
          content: '';
          position: absolute;
          width: ${handleSize}px;
          height: ${handleSize}px;
          border-radius: ${space[1]}px ${space[1]}px 0 0;
          background-color: ${colors.bgColorSecondary};
          top: -${handleSize - space[1]}px;
          right: 0px;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-rows: 1fr ${height.explainerVisible}px;
          grid-template-areas:
            'content'
            'placeholder';
        `}
      >
        <div
          css={css`
            position: relative;
            grid-area: content;
            place-self: stretch;
            width: ${width.explainer - space[6]}px;
            height: ${height.explainerVisible}px;
          `}
        >
          <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1} arrows={false}>
            {pages.map(page => {
              return (
                <div
                  css={css`
                    width: ${width.explainer - space[6]}px;
                    height: ${height.explainerVisible - 24}px;
                  `}
                  key={page.title}
                >
                  <div
                    css={css`
                      height: 100%;
                      display: grid;
                      grid-template-rows: ${space[6]}px 1fr;
                      grid-row-gap: ${space[2]}px;
                      color: ${colors.textColorSecondary};
                    `}
                  >
                    <span
                      css={css`
                        font-size: ${fontSize.md};
                        align-self: end;
                        font-weight: ${fontWeight.lg};
                        letter-spacing: 0.8px;
                      `}
                    >
                      {page.title}
                    </span>
                    <p
                      css={css`
                        font-size: ${fontSize.sm};
                        align-self: start;
                        margin: 0;
                        padding: 0;
                        line-height: 1.5;
                      `}
                    >
                      {page.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      <motion.button
        role="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        css={css`
          ${buttonStyle}
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

          position: absolute;
          z-index: 1;
          right: 0px;
          top: -${handleSize - space[1]}px;
          width: ${handleSize}px;
          height: ${handleSize}px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: ${space[1]}px;

          color: ${colors.textColorSecondary};
          font-size: ${fontSize.md};
        `}
        animate={{ scale: isHovered ? 1.25 : 1 }}
      >
        <motion.span>
          <IoMdInformationCircle color={colors.textColorSecondary} size={26} />
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

export default ExplainerCard
