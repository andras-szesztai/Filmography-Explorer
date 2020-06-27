import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'

// Components
import { PersonDetailCardContainer } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'

const PersonDetailCard = () => {
  const personDetails = useSelector((state: CombinedState) => state.personReducer.dataSets.details)
  console.log('PersonDetailCard -> personDetails', personDetails)
  return <AnimatePresence>{personDetails && <PersonDetailCardContainer>Hello</PersonDetailCardContainer>}</AnimatePresence>
}

export default PersonDetailCard
