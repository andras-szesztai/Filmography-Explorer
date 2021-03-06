import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Styles
import { space, colors, width, height, zIndex, dropShadow } from '../../../../styles/variables'
import { transition } from '../../../../styles/animation'

interface Props {
  isPopulated: boolean
  isOpen?: boolean
}

const PersonDetailCardContainer: React.FC<Props> = props => {
  const { isOpen, isPopulated, children } = props
  const [yPos, setYPos] = React.useState(-height.personCardOpen)

  React.useEffect(() => {
    if (isPopulated && isOpen) {
      setYPos(-height.personCardExtra + space[1])
    }
    if (isPopulated && !isOpen) {
      setYPos(-height.personCardOpen + space[1] + height.personCardClosed)
    }
  }, [isOpen, isPopulated])

  return (
    <motion.div
      initial={{ y: -height.personCardOpen }}
      animate={{ y: yPos }}
      transition={transition.primary}
      css={css`
        position: fixed;
        right: ${space[8]}px;

        filter: drop-shadow(${dropShadow.header.ternary});

        background-color: ${colors.bgColorSecondary};
        border-radius: 0 0 ${space[2]}px ${space[2]}px;

        width: ${width.detailsCard}px;
        height: ${height.personCardOpen}px;
        padding: 0 ${space[3]}px ${space[2]}px ${space[3]}px;
        z-index: ${zIndex.personDetailCard};
      `}
    >
      {children}
    </motion.div>
  )
}

export default PersonDetailCardContainer
