import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { colors } from '../../../styles/variables'
import { duration } from '../../../styles/animation'

const circlesData = [
  {
    initial: { x: 388.7, y: 442.1 },
    animate: { x: 60, y: 45 }
  },
  {
    cx: 447.1,
    cy: 259.9
  },
  {
    cx: 293.3,
    cy: 150.8
  },
  {
    cx: 139.6,
    cy: 259.9
  },
  {
    cx: 195.6,
    cy: 442.1
  }
]

interface Props {
  width?: number
  isFavorited: boolean
}

export default function FavoriteStar({ width, isFavorited }: Props) {
  const topRef = useRef(null)

  return (
    <motion.svg width={width} viewBox="0 0 591.2 591.2">
      <path
        ref={topRef}
        fill={colors.bgColorSecondary}
        d="M380.6,338.8l69.6-67.9c3.3-3.2,4.5-8.1,3.1-12.5c-1.5-4.4-5.3-7.6-9.8-8.3l-96.2-14l-43-87.2
	c-2.1-4.1-6.3-6.7-11-6.7s-8.8,2.6-11,6.8l-43,87.2l-96.2,14c-4.5,0.6-8.4,3.9-9.8,8.3s-0.2,9.2,3.1,12.5l69.6,67.9l-16.5,95.8
	c-0.8,4.5,1.1,9.2,4.9,11.9c3.7,2.7,8.7,3.1,12.8,0.9l86.1-45.3l86.1,45.3c1.8,1,3.7,1.4,5.7,1.4c2.5,0,5-0.8,7.1-2.4
	c3.7-2.8,5.6-7.3,4.9-11.9L380.6,338.8z"
      />
      <motion.path
        fill={colors.accentSecondary}
        initial={{ scale: 0 }}
        animate={{ scale: isFavorited ? [1, 1.1, 1] : 0 }}
        transition={{ type: 'tween', ease: [0.65, 0, 0.35, 1], duration: duration.md }}
        strokeWidth={25}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M380.6,338.8l69.6-67.9c3.3-3.2,4.5-8.1,3.1-12.5c-1.5-4.4-5.3-7.6-9.8-8.3l-96.2-14l-43-87.2
	c-2.1-4.1-6.3-6.7-11-6.7c-4.6,0-8.8,2.6-11,6.8l-43,87.2l-96.2,14c-4.5,0.6-8.4,3.9-9.8,8.3s-0.2,9.2,3.1,12.5l69.6,67.9
	l-16.5,95.8c-0.8,4.5,1.1,9.2,4.9,11.9c3.7,2.7,8.7,3.1,12.8,0.9l86.1-45.3l86.1,45.3c1.8,1,3.7,1.4,5.7,1.4c2.5,0,5-0.8,7.1-2.4
	c3.7-2.8,5.6-7.3,4.9-11.9L380.6,338.8z"
      />
      <motion.g
        animate={{
          transition: {
            staggerChildren: 0.2
          }
        }}
        exit={{
          transition: {
            staggerChildren: 0.1,
            staggerDirection: -1
          }
        }}
      />
      {circlesData.map(({ cx, cy }) => (
        <motion.circle initial={{ x: cx, y: cy }} fill={colors.accentSecondary} r={14} />
      ))}
    </motion.svg>
  )
}

FavoriteStar.defaultProps = {
  width: 35
}
