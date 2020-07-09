import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { usePrevious } from 'react-use'

// Styles
import { space, colors, width, height, zIndex, dropShadow } from '../../../../styles/variables'
import { transition } from '../../../../styles/animation'

interface Props {
  isPopulated: boolean
  isOpen?: boolean
}

const PersonDetailCardContainer: React.FC<Props> = props => {
  const prevProps = usePrevious(props)
  const { isOpen, isPopulated, children } = props
  const [yPos, setYPos] = React.useState(-height.personCardOpen)
  React.useEffect(() => {
    if (isPopulated && prevProps) {
      if ((!prevProps.isPopulated && isOpen) || (isOpen && !prevProps.isOpen)) {
        setYPos(-height.personCardExtra)
      }
      if ((!prevProps.isPopulated && !isOpen) || (!isOpen && prevProps.isOpen)) {
        setYPos(-height.personCardOpen + height.personCardClosed)
      }
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
        border-radius: 0 0 ${space[1]}px ${space[1]}px;

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
