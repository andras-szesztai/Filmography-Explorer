import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'

// Components
import { PersonDetailCardContainer } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)

  return (
    <PersonDetailCardContainer isPopulated={!!personDetails} isOpen>
      <div>Hello</div>
    </PersonDetailCardContainer>
  )
}

export default PersonDetailCard
