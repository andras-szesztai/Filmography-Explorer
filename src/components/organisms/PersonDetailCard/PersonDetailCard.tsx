/* eslint-disable react/button-has-type */
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'
import 'what-input'
import useWhatInput from 'react-use-what-input'
import { useLocalStorage } from 'react-use'
import uniq from 'lodash/uniq'

import omit from 'lodash/omit'

// Components
import { PersonDetailCardContainer, PersonDetailCardShadow, Image, PersonDetailContentLoader, PersonContainerArrow } from '../../atoms'
import FavoriteStar from '../../molecules/FavoriteStar/FavoriteStar'

// Types
import { CombinedState } from '../../../types/state'
import { FavoritePersonsObject } from '../../../types/person'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'

// Hooks
import useSetActiveNameIDOnMount from './hooks/useSetActiveNameIDOnMount'

// Styles
import { height, buttonNoFocus, buttonFocus, fontWeight, fontSize, dentedStyle, space, colors } from '../../../styles/variables'
import { delay } from '../../../styles/animation'

const contentGridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  place-items: center;
  grid-template-rows: ${height.personCardExtra + space[4]}px 1fr ${height.personCardClosed - space[2]}px;
  grid-template-areas:
    '. . .'
    'bio bio photo'
    'name name icon';

  width: 100%;
  height: 100%;
`

const PersonDetailCard = () => {
  const personData = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const loading = useSelector((state: CombinedState) => state.personReducer.loading.personDetails)

  const [personCardIsOpen, setPersonCardIsOpen] = useLocalStorage('personCardIsOpen', true)
  const [favoritePersons, setFavoritePersons] = useLocalStorage(LOCAL_STORE_ACCESSORS.favoritePersons, {} as FavoritePersonsObject)

  const [currentInput] = useWhatInput()

  const [isNameHovered, setIsNameHovered] = React.useState(false)

  useSetActiveNameIDOnMount({ favoritePersons })

  const handleFavoriteToggle = () => {
    const currId = personData.details?.id
    if (favoritePersons && currId) {
      if (favoritePersons[currId]) {
        setFavoritePersons(omit(favoritePersons, currId.toString()))
      } else {
        const castIDs = personData.credits.cast ? personData.credits.cast.map(d => d.id) : []
        const crewIDs = personData.credits.crew ? personData.credits.crew.map(d => d.id) : []
        setFavoritePersons({ ...favoritePersons, [currId]: uniq([...castIDs, ...crewIDs]) })
      }
    }
  }

  return (
    <>
      {personData.details && <PersonDetailCardShadow />}
      <PersonDetailCardContainer isPopulated={!!personData.details} isOpen={personCardIsOpen}>
        <PersonDetailContentLoader loading={loading} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: personData.details ? 1 : 0, transition: { delay: delay.md } }}
          css={contentGridStyle}
        >
          <PersonContainerArrow setPersonCardIsOpen={setPersonCardIsOpen} personCardIsOpen={personCardIsOpen} currentInput={currentInput} />
          <div
            css={css`
              grid-area: name;
              position: relative;

              font-weight: ${fontWeight.xs};
              font-size: ${fontSize.xl};
              color: ${colors.textColorPrimary};

              border-radius: ${space[1]}px;
              background: ${colors.bgColorPrimary};
              white-space: nowrap;
              letter-spacing: 1.25px;
              margin-bottom: ${space[1]}px;

              place-self: end start;

              padding: ${space[1]}px ${space[10]}px ${space[1] + 2}px ${space[3]}px;

              cursor: pointer;

              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
            `}
            role="button"
            tabIndex={0}
            onMouseOver={() => setIsNameHovered(true)}
            onFocus={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
            onBlur={() => setIsNameHovered(false)}
            onClick={() => handleFavoriteToggle()}
            onKeyDown={({ keyCode }) => {
              if (keyCode === 13) {
                handleFavoriteToggle()
              }
            }}
          >
            <span>{personData.details && personData.details.name}</span>
            <motion.span
              initial={{ originX: 0.5 }}
              animate={{ scale: isNameHovered ? 1.2 : 1 }}
              css={css`
                position: absolute;
                right: 4px;
                top: 1px;
              `}
            >
              {favoritePersons && personData.details && (
                <FavoriteStar isFavorited={!!favoritePersons[personData.details?.id]} isHovered={isNameHovered} />
              )}
            </motion.span>
          </div>
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
