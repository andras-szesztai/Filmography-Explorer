import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'

import { colors } from '../../../styles/variables'

interface Props {
  width?: number
  isFavorited: boolean
  isHovered: boolean
}

export default function FavoriteHearth({ width, isFavorited, isHovered }: Props) {
  const topRef = useRef(null)
  const circleOne = useRef(null)
  const circleTwo = useRef(null)
  const circleThree = useRef(null)

  const init = useRef(true)
  useEffect(() => {
    if (init.current) {
      init.current = false
      gsap.set(topRef.current, {
        transformOrigin: '50% 50%',
        scale: isFavorited ? 1 : 0
      })
    }
  })

  useEffect(() => {
    const fill = isFavorited ? colors.accentSecondary : colors.bgColorSecondary
    const r = isFavorited ? 14 : 0
    gsap
      .timeline({
        defaults: {
          duration: 0.5,
          transformOrigin: '50% 50%',
          ease: isFavorited ? 'back.out(6)' : 'back.in(4)'
        }
      })
      .to(topRef.current, {
        scale: isFavorited ? 1 : 0
      })
      .to(
        circleOne.current,
        {
          y: isFavorited ? -70 : 0,
          x: isFavorited ? -50 : 0,
          fill,
          r
        },
        isFavorited ? '-=0.4' : '-=0.5'
      )
      .to(
        circleTwo.current,
        {
          y: isFavorited ? -115 : 0,
          fill,
          r
        },
        '<'
      )
      .to(
        circleThree.current,
        {
          y: isFavorited ? -70 : 0,
          x: isFavorited ? 50 : 0,
          fill,
          r
        },
        '<'
      )
  }, [isFavorited])

  useEffect(() => {
    const opacity = isHovered ? 1 : 0
    gsap
      .timeline({
        defaults: {
          duration: 0.1
        }
      })
      .to(circleOne.current, { opacity })
      .to(circleTwo.current, { opacity })
      .to(circleThree.current, { opacity })
  }, [isHovered])

  return (
    <motion.svg width={width} viewBox="0 0 463 495.1">
      <motion.path
        fill={colors.bgColorSecondary}
        d="M352,196.9c-30.8-31.5-81-32.9-113.5-3.1l-7.2,8.2l-7.2-7.2c-32-30.6-82.6-29.7-113.5,2
	c-30.5,31.7-29.5,82.1,2.2,112.6c0,0,0,0,0,0c0.3,0.3,0.6,0.6,0.9,0.9l104.4,99c8,7.6,20.5,7.6,28.4,0l104.4-99
	C382,279,382.4,228.7,352,196.9z"
      />
      <motion.path
        ref={topRef}
        fill={colors.accentSecondary}
        strokeMiterlimit={10}
        strokeWidth={25}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M352,196.9c-30.8-31.5-81-32.9-113.5-3.1l-7.2,8.2l-7.2-7.2c-32-30.6-82.6-29.7-113.5,2
	c-30.5,31.7-29.5,82.1,2.2,112.6c0,0,0,0,0,0c0.3,0.3,0.6,0.6,0.9,0.9l104.4,99c8,7.6,20.5,7.6,28.4,0l104.4-99
	C382,279,382.4,228.7,352,196.9z"
      />
      <circle cx={122.6} cy={188.6} ref={circleOne} />
      <circle cx={231.5} cy={200} ref={circleTwo} />
      <circle cx={341.9} cy={188.6} ref={circleThree} />
    </motion.svg>
  )
}

FavoriteHearth.defaultProps = {
  width: 35
}
