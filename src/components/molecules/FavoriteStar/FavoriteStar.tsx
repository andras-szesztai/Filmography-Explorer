import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { colors } from '../../../styles/variables'

interface Props {
  width?: number
  isFavorited: boolean
  isHovered: boolean
}

export default function FavoriteStar({ width, isFavorited, isHovered }: Props) {
  const topRef = useRef(null)
  const circleOne = useRef(null)
  const circleTwo = useRef(null)
  const circleThree = useRef(null)
  const circleFour = useRef(null)
  const circleFive = useRef(null)

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
          ease: isFavorited ? 'back.out(8)' : 'back.in(6)'
        }
      })
      .to(topRef.current, {
        scale: isFavorited ? 1 : 0,
        ease: isFavorited ? 'back.out(6)' : 'back.in(4)'
      })
      .to(
        circleOne.current,
        {
          y: isFavorited ? 60 : 0,
          x: isFavorited ? 45 : 0,
          fill,
          r
        },
        isFavorited ? '-=0.4' : '-=0.5'
      )
      .to(
        circleTwo.current,
        {
          y: isFavorited ? -30 : 0,
          x: isFavorited ? 70 : 0,
          fill,
          r
        },
        '<'
      )
      .to(
        circleThree.current,
        {
          y: isFavorited ? -75 : 0,
          fill,
          r
        },
        '<'
      )
      .to(
        circleFour.current,
        {
          y: isFavorited ? -20 : 0,
          x: isFavorited ? -70 : 0,
          fill,
          r
        },
        '<'
      )
      .to(
        circleFive.current,
        {
          y: isFavorited ? 50 : 0,
          x: isFavorited ? -45 : 0,
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
      .to(circleFour.current, { opacity })
      .to(circleFive.current, { opacity })
  }, [isHovered])

  return (
    <svg width={width} viewBox="0 0 591.2 591.2">
      <path
        fill={colors.bgColorSecondary}
        d="M380.6,338.8l69.6-67.9c3.3-3.2,4.5-8.1,3.1-12.5c-1.5-4.4-5.3-7.6-9.8-8.3l-96.2-14l-43-87.2
	c-2.1-4.1-6.3-6.7-11-6.7c-4.6,0-8.8,2.6-11,6.8l-43,87.2l-96.2,14c-4.5,0.6-8.4,3.9-9.8,8.3s-0.2,9.2,3.1,12.5l69.6,67.9
	l-16.5,95.8c-0.8,4.5,1.1,9.2,4.9,11.9c3.7,2.7,8.7,3.1,12.8,0.9l86.1-45.3l86.1,45.3c1.8,1,3.7,1.4,5.7,1.4c2.5,0,5-0.8,7.1-2.4
	c3.7-2.8,5.6-7.3,4.9-11.9L380.6,338.8z"
      />
      <path
        ref={topRef}
        fill={colors.accentSecondary}
        d="M380.6,338.8l69.6-67.9c3.3-3.2,4.5-8.1,3.1-12.5c-1.5-4.4-5.3-7.6-9.8-8.3l-96.2-14l-43-87.2
	c-2.1-4.1-6.3-6.7-11-6.7s-8.8,2.6-11,6.8l-43,87.2l-96.2,14c-4.5,0.6-8.4,3.9-9.8,8.3s-0.2,9.2,3.1,12.5l69.6,67.9l-16.5,95.8
	c-0.8,4.5,1.1,9.2,4.9,11.9c3.7,2.7,8.7,3.1,12.8,0.9l86.1-45.3l86.1,45.3c1.8,1,3.7,1.4,5.7,1.4c2.5,0,5-0.8,7.1-2.4
	c3.7-2.8,5.6-7.3,4.9-11.9L380.6,338.8z"
      />
      <circle cx={388.7} cy={442.1} ref={circleOne} />
      <circle cx={447.1} cy={259.9} ref={circleTwo} />
      <circle cx={293.3} cy={150.8} ref={circleThree} />
      <circle cx={139.6} cy={259.9} ref={circleFour} />
      <circle cx={195.6} cy={442.1} ref={circleFive} />
    </svg>
  )
}

FavoriteStar.defaultProps = {
  width: 35
}
