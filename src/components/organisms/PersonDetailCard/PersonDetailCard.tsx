/* eslint-disable react/button-has-type */
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import 'what-input'
import useWhatInput from 'react-use-what-input'
import { useLocalStorage } from 'react-use'
import isEmpty from 'lodash/isEmpty'

// Components
import { PersonDetailCardContainer, PersonDetailCardShadow, Image, PersonDetailContentLoader, PersonContainerArrow } from '../../atoms'
import { PersonDetailCardNameButton } from '../../molecules'

// Types
import { CombinedState } from '../../../types/state'
import { FavoritePersonsObject } from '../../../types/person'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'

// Hooks
import useSetActiveNameIDOnMount from './hooks/useSetActiveNameIDOnMount'

// Styles
import { fontSize, dentedStyle, space, colors } from '../../../styles/variables'
import { delay } from '../../../styles/animation'
import { contentGridStyle } from './styles'

const PersonDetailCard = () => {
  const personData = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const loading = useSelector((state: CombinedState) => state.personReducer.loading.personDetails)

  const [personCardIsOpen, setPersonCardIsOpen] = useLocalStorage('personCardIsOpen', true)
  const [favoritePersons, setFavoritePersons] = useLocalStorage(LOCAL_STORE_ACCESSORS.favoritePersons, {} as FavoritePersonsObject)

  const [currentInput] = useWhatInput()

  useSetActiveNameIDOnMount({ favoritePersons })

  return (
    <>
      {personData.details && <PersonDetailCardShadow />}
      <PersonDetailCardContainer isPopulated={!isEmpty(personData.details)} isOpen={personCardIsOpen}>
        <PersonDetailContentLoader loading={loading} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: personData.details ? 1 : 0, transition: { delay: delay.md } }}
          css={contentGridStyle}
        >
          <PersonContainerArrow setPersonCardIsOpen={setPersonCardIsOpen} personCardIsOpen={personCardIsOpen} currentInput={currentInput} />
          <PersonDetailCardNameButton
            currentInput={currentInput}
            favoritePersons={favoritePersons || {}}
            setFavoritePersons={setFavoritePersons}
            personData={personData}
          />
          <div
            css={css`
              grid-area: bio;
              place-self: stretch;
              border-radius: ${space[1]}px;

              overflow-y: auto;
              ${dentedStyle};

              border-radius: ${space[1]}px;

              color: ${colors.textColorSecondary};
              font-size: ${fontSize.sm};
              padding: ${space[2]}px ${space[3]}px ${space[0]}px ${space[2]}px;

              p {
                margin-top: 0;
                line-height: 1.5;

                ::selection {
                  background: ${colors.textColorSecondary};
                  color: ${colors.textColorPrimary};
                }
              }

              scrollbar-width: thin;
              scrollbar-color: rebeccapurple green;

              ::-webkit-scrollbar {
                width: ${space[1]}px;
              }

              ::-webkit-scrollbar-track {
                background: ${colors.bgColorSecondaryDark};
              }

              ::-webkit-scrollbar-thumb {
                background: ${colors.bgColorPrimary};
                border-radius: ${space[1]}px;
              }
            `}
          >
            <p>{personData.details && personData.details.biography}</p>
          </div>
          {personData.details && <Image url={personData.details.profile_path} alt={personData.details.name} borderRadius={space[1]} />}
        </motion.div>
      </PersonDetailCardContainer>
    </>
  )
}

export default PersonDetailCard
