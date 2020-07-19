import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import omit from 'lodash/omit'
import { useDispatch } from 'react-redux'

// Components
import { FavoriteStar } from '../../atoms'

// Types
import { FavoritePersonsObject, PersonDataSets } from '../../../types/person'

// Styles
import { fontWeight, fontSize, colors, space, buttonNoFocus, buttonFocus } from '../../../styles/variables'
import { updateFavoritePersons } from '../../../reducer/personReducer/actions'

interface Props {
  currentInput: string
  favoritePersons: FavoritePersonsObject
  setFavoritePersons: (obj: FavoritePersonsObject) => void
  personData: PersonDataSets
}

function PersonDetailCardNameButton({ currentInput, favoritePersons, setFavoritePersons, personData }: Props) {
  const [isNameHovered, setIsNameHovered] = React.useState(false)
  const dispatch = useDispatch()

  const handleFavoriteToggle = () => {
    const currId = personData.details && personData.details.id
    if (favoritePersons && currId) {
      let newObject
      if (favoritePersons[currId]) {
        newObject = omit(favoritePersons, currId.toString())
      } else {
        newObject = {
          ...favoritePersons,
          [currId]: { name: (personData.details && personData.details.name) || '', id: currId, dateFavorited: new Date() }
        }
      }
      setFavoritePersons(newObject)
      dispatch(updateFavoritePersons(newObject))
    }
  }
  return (
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

        padding: ${space[1] + 1}px ${space[10]}px ${space[1] + 3}px ${space[3]}px;

        cursor: pointer;
        user-select: none;

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
        animate={{ scale: isNameHovered ? 1.15 : 1 }}
        css={css`
          position: absolute;
          right: 6px;
          top: 5px;
        `}
      >
        {favoritePersons && personData.details && (
          <FavoriteStar width={30} isFavorited={!!favoritePersons[personData.details.id]} isHovered={isNameHovered} />
        )}
      </motion.span>
    </div>
  )
}

export default PersonDetailCardNameButton
