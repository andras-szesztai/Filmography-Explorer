import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { colors } from '../../../styles/variables'

interface Props {
  // width?: number
  isFavorited: boolean
  isHovered: boolean
}

export default function BookmarkIcon({ isHovered, isFavorited }: Props) {
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
    const r = isFavorited ? 12 : 0
    gsap
      .timeline({
        defaults: {
          duration: 0.5,
          transformOrigin: '50% 50%',
          ease: isFavorited ? 'back.out(2)' : 'back.in(1)'
        }
      })
      .to(topRef.current, {
        scale: isFavorited ? 1 : 0
      })
      .to(
        circleOne.current,
        {
          y: isFavorited ? 50 : 0,
          fill,
          r
        },
        isFavorited ? '-=0.4' : '-=0.5'
      )
      .to(
        circleTwo.current,
        {
          y: isFavorited ? 50 : 0,
          fill,
          r
        },
        isFavorited ? '-=0.4' : '-=0.5'
      )
      .to(
        circleThree.current,
        {
          y: isFavorited ? 50 : 0,
          fill,
          r
        },
        isFavorited ? '-=0.4' : '-=0.5'
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
    <svg height="32px" viewBox="0 0 227.3 330.2">
      <g>
        <path
          fill={colors.bgColorPrimary}
          d="M56.4,25.8c-14,0-26,10.2-26,23.4v203.1c0,3,0.7,6.8,3.7,9.7c3,2.9,6.6,3.3,9.4,3.3c1.5,0,3-0.5,4.3-1.4l66-44
          l66,44c1.3,0.9,2.8,1.4,4.3,1.4c2.8,0,6.4-0.5,9.4-3.3c3-2.9,3.7-6.7,3.7-9.7V49.2c0-13.2-12-23.4-26-23.4H56.4z"
        />
      </g>
      <g>
        <path
          ref={topRef}
          fill={colors.accentSecondary}
          d="M55.3,23.5c-14.3,0-26.5,10.4-26.5,23.9v206.9c0,3.1,0.7,6.9,3.7,9.9c3,2.9,6.7,3.4,9.5,3.4
          c1.6,0,3.1-0.5,4.4-1.4l67.2-44.8l67.2,44.8c1.3,0.9,2.8,1.4,4.4,1.4c2.8,0,6.5-0.5,9.5-3.4c3-2.9,3.7-6.8,3.7-9.9V47.4
          c0-13.5-12.2-23.9-26.5-23.9H55.3z"
        />
      </g>
      <circle fill={colors.accentSecondary} cx="186.8" cy="258.8" ref={circleOne} />
      <circle fill={colors.accentSecondary} cx="113.7" cy="211" ref={circleTwo} />
      <circle fill={colors.accentSecondary} cx="39.5" cy="258.8" ref={circleThree} />
    </svg>
  )
}
