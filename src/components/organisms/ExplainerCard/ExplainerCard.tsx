import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { IoMdInformationCircle } from 'react-icons/io'
import useWhatInput from 'react-use-what-input'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {
  colors,
  fontSize,
  space,
  handleSize,
  buttonStyle,
  width,
  height,
  zIndex,
  dropShadow,
  buttonNoFocus,
  buttonFocus
} from '../../../styles/variables'
import { transition } from '../../../styles/animation'

function ExplainerCard() {
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      <div
        css={css`
          position: fixed;
          overflow-x: hidden;

          width: ${width.explainer}px;
          height: ${height.personCardExtra}px;

          z-index: ${zIndex.personDetailCard - 1};

          top: ${height.header - height.personCardExtra}px;
          right: ${space[8]}px;
          left: 40%;
          transform: translateY(100%);

          pointer-events: none;
        `}
      >
        <div
          css={css`
            position: absolute;
            background: ${colors.bgColorSecondary};

            width: calc(100% + ${space[8]}px);
            height: 100%;
            filter: drop-shadow(${dropShadow.header.primary}) drop-shadow(${dropShadow.header.secondary})
              drop-shadow(${dropShadow.header.ternary});

            transform: translate(-${space[4]}px, -100%);
          `}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: 1,
          y: isOpen ? height.explainerVisible : 0,
          transition: { ...transition.primary, stiffness: 140 }
        }}
        css={css`
          position: fixed;
          top: -130px;
          left: 40%;

          background-color: ${colors.bgColorSecondary};
          border-radius: ${space[1]}px;
          filter: drop-shadow(${dropShadow.header.ternary});

          height: ${height.explainerTotal}px;
          width: ${width.explainer}px;
          z-index: 5;
          padding: ${space[1]}px ${space[2]}px ${space[2]}px ${space[2]}px;

          display: flex;

          ::after {
            content: '';
            position: absolute;
            width: ${handleSize}px;
            height: ${handleSize}px;
            border-radius: 0 0 ${space[1]}px ${space[1]}px;
            background-color: ${colors.bgColorSecondary};
            bottom: -${handleSize - 2}px;
            right: 0px;
          }
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-rows: 1fr ${height.explainerVisible};
          `}
        >
          <div
            css={css`
              position: relative;
              height: 100px;
              width: 100px;
            `}
          >
            <Slider adaptiveHeight dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
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
            bottom: -${handleSize}px;
            width: ${handleSize}px;
            height: ${handleSize}px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: ${space[1]}px;

            color: ${colors.textColorSecondary};
            font-size: ${fontSize.md};
          `}
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          <IoMdInformationCircle color={colors.textColorSecondary} size={28} />
        </motion.button>
      </motion.div>
    </>
  )
}

export default ExplainerCard
