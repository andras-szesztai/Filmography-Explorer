import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import useWhatInput from 'react-use-what-input'
import { useLocalStorage } from 'react-use'
import isEmpty from 'lodash/isEmpty'

// Components
import {
  PersonDetailCardContainer,
  PersonDetailCardShadow,
  Image,
  PersonDetailContentLoader,
  PersonContainerArrow,
  TextArea
} from '../../atoms'
import { PersonDetailCardNameButton } from '../../molecules'

// Types
import { CombinedState } from '../../../types/state'
import { FavoritePersonsObject } from '../../../types/person'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'

// Hooks
import useSetActiveNameIDOnMount from './hooks/useSetActiveNameIDOnMount'

// Styles
import { space } from '../../../styles/variables'
import { delay } from '../../../styles/animation'
import { contentGridStyle } from './styles'

const PersonDetailCard = () => {
  const { dataSets: personData, favorites, activeNameID } = useSelector((state: CombinedState) => state.personReducer)
  const loading = useSelector((state: CombinedState) => state.personReducer.loading.personDetails)

  const [personCardIsOpen, setPersonCardIsOpen] = useLocalStorage(LOCAL_STORE_ACCESSORS.personCardIsOpen, true)
  const [favoritePersons, setFavoritePersons] = useLocalStorage(LOCAL_STORE_ACCESSORS.favoritePersons, {} as FavoritePersonsObject)

  const [currentInput] = useWhatInput()

  useSetActiveNameIDOnMount({ favoritePersons, isPopulated: !!Object.keys(favorites).length, activeNameID })

  return (
    <>
      {!isEmpty(personData.details) && <PersonDetailCardShadow />}
      <PersonDetailCardContainer isPopulated={!isEmpty(personData.details)} isOpen={personCardIsOpen}>
        <PersonDetailContentLoader loading={loading} isOpen={personCardIsOpen || true} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !isEmpty(personData.details) ? 1 : 0, transition: { delay: delay.md } }}
          css={contentGridStyle}
        >
          <PersonContainerArrow setPersonCardIsOpen={setPersonCardIsOpen} personCardIsOpen={personCardIsOpen} currentInput={currentInput} />
          <PersonDetailCardNameButton
            currentInput={currentInput}
            favoritePersons={favoritePersons || {}}
            setFavoritePersons={setFavoritePersons}
            personData={personData}
          />
          <AnimatePresence>
            {personCardIsOpen && (
              <>
                <TextArea gridArea="bio" text={personData.details.biography} />
                <Image url={personData.details.profile_path} alt={personData.details.name} borderRadius={space[1]} />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </PersonDetailCardContainer>
    </>
  )
}

export default PersonDetailCard
