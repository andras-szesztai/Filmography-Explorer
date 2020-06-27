import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'

// Styles
import { space, colors, width, height } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

interface Props {
  isPopulated: boolean
  isOpen: boolean
}

const PersonDetailCardContainer: React.FC<Props> = ({ children, isOpen, isPopulated }) => {
  const [yPos, setYPos] = React.useState(-height.personCardOpen)
  React.useEffect(() => {
    if (isPopulated && isOpen && yPos === -height.personCardOpen) {
      setYPos(-height.personCardExtra)
    }
    if (isPopulated && !isOpen && (yPos === -height.personCardExtra || yPos === -height.personCardOpen)) {
      setYPos(-height.personCardOpen + height.personCardClosed)
    }
  }, [isOpen, isPopulated])

  return (
    <motion.div
      initial={{ y: -height.personCardOpen }}
      animate={{ y: yPos }}
      transition={transition.primary}
      css={css`
        position: fixed;

        background-color: ${colors.bgColorSecondary};
        border-radius: 0 0 ${space[1]}px ${space[1]}px;

        right: ${space[8]}px;
        width: ${width.detailsCard}px;
        height: ${height.personCardOpen}px;
        z-index: 5;
        padding: 0 ${space[3]}px;
      `}
    >
      {children}
    </motion.div>
  )
}

export default PersonDetailCardContainer
