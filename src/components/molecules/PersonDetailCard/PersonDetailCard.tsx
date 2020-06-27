import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import { PersonDetailCardContainer } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { space, height } from '../../../styles/variables'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)

  return (
    <PersonDetailCardContainer isPopulated={!!personDetails} isOpen>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: personDetails ? 1 : 0, transition: { delay: 0.8 } }}
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-column-gap: ${space[3]}px;
          grid-template-rows: ${height.personCardExtra}px 1fr ${height.personCardClosed}px;
          grid-template-areas:
            '. . .'
            'bio bio photo'
            'icon name name';

          background: red;

          width: 100%;
          height: 100%;
        `}
      />
    </PersonDetailCardContainer>
  )
}

export default PersonDetailCard
