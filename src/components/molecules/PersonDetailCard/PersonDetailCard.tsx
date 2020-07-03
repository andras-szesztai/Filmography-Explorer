/* eslint-disable react/button-has-type */
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { css } from '@emotion/core'
import 'what-input'
import useWhatInput from 'react-use-what-input'
import { useLocalStorage } from 'react-use'
import { IoIosArrowUp } from 'react-icons/io'
import ContentLoader from 'react-content-loader'
import uniq from 'lodash/uniq'
import last from 'lodash/last'
import omit from 'lodash/omit'

// Components
import { PersonDetailCardContainer, PersonDetailCardShadow, Image } from '../../atoms'
import FavoriteStar from '../FavoriteStar/FavoriteStar'

// Types
import { CombinedState } from '../../../types/state'
import {
  height,
  buttonStyle,
  buttonNoFocus,
  buttonFocus,
  fontWeight,
  fontSize,
  dentedStyle,
  space,
  width,
  colors
} from '../../../styles/variables'
import { delay } from '../../../styles/animation'
import { LOCAL_STORE_ACCESSORS } from '../../../constants/accessors'
import { setActiveNameID } from '../../../reducer/personReducer/actions'

interface FavoritePersonsObject {
  [id: number]: number[]
}

const PersonDetailCard = () => {
  const personData = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const loading = useSelector((state: CombinedState) => state.personReducer.loading.personDetails)
  const dispatch = useDispatch()

  const [personCardIsOpen, setPersonCardIsOpen] = useLocalStorage('personCardIsOpen', true)
  const [isArrowHovered, setIsArrowHovered] = React.useState(false)

  const [currentInput] = useWhatInput()

  const [isNameHovered, setIsNameHovered] = React.useState(false)

  const [favoritePersons, setFavoritePersons] = useLocalStorage(LOCAL_STORE_ACCESSORS.favoritePersons, {} as FavoritePersonsObject)

  const init = React.useRef(true)
  React.useEffect(() => {
    if (init.current) {
      init.current = false
      if (favoritePersons && Object.keys(favoritePersons).length) {
        const lastID = last(Object.keys(favoritePersons))
        if (lastID) {
          dispatch(setActiveNameID(+lastID))
        }
      }
    }
  })

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
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              css={css`
                position: absolute;
                top: ${height.personCardExtra}px;
                left: 0;
                z-index: 1;
              `}
            >
              <ContentLoader
                speed={2}
                width={width.detailsCard}
                height={height.personCardOpen - height.personCardExtra}
                backgroundColor={colors.bgColorSecondaryDark}
                foregroundColor={colors.bgColorPrimary}
              >
                <rect x="12" y="14" rx="4" ry="4" width="255" height="165" />
                <rect x="280" y="14" rx="4" ry="4" width="110" height="165" />
                <rect x="12" y="190" rx="4" ry="4" width="320" height="40" />
              </ContentLoader>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: personData.details ? 1 : 0, transition: { delay: delay.md } }}
          css={css`
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
          `}
        >
          <motion.button
            onClick={() => setPersonCardIsOpen(!personCardIsOpen)}
            onMouseOver={() => setIsArrowHovered(true)}
            onMouseOut={() => setIsArrowHovered(false)}
            onFocus={() => setIsArrowHovered(true)}
            onBlur={() => setIsArrowHovered(false)}
            css={css`
              display: flex;
              align-items: center;
              grid-area: icon;
              cursor: pointer;

              place-self: end end;
              padding: 0;

              ${buttonStyle}
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
            `}
            initial={{ rotate: !personCardIsOpen ? 180 : 0 }}
            animate={{
              rotate: !personCardIsOpen ? 180 : 0,
              transition: {
                delay: delay.md
              }
            }}
          >
            <motion.div animate={{ scale: isArrowHovered ? 1.3 : 1 }}>
              <IoIosArrowUp size="24" color={colors.bgColorPrimary} />
            </motion.div>
          </motion.button>
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
