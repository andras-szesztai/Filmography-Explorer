import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import uniq from 'lodash/uniq'
import omit from 'lodash/omit'

// Components
import { FavoriteStar } from '../../atoms'

// Types
import { FavoritePersonsObject, PersonDataSets } from '../../../types/person'

// Styles
import { fontWeight, fontSize, colors, space, buttonNoFocus, buttonFocus } from '../../../styles/variables'

interface Props {
  currentInput: string
  favoritePersons: FavoritePersonsObject
  setFavoritePersons: (obj: FavoritePersonsObject) => void
  personData: PersonDataSets
}

function PersonDetailCardNameButton({ currentInput, favoritePersons, setFavoritePersons, personData }: Props) {
  const [isNameHovered, setIsNameHovered] = React.useState(false)

  const handleFavoriteToggle = () => {
    const currId = personData?.details?.id
    if (favoritePersons && currId) {
      if (favoritePersons[currId]) {
        setFavoritePersons(omit(favoritePersons, currId.toString()))
      } else {
        const castIDs = personData?.credits.cast ? personData?.credits.cast.map(d => d.id) : []
        const crewIDs = personData?.credits.crew ? personData?.credits.crew.map(d => d.id) : []
        setFavoritePersons({ ...favoritePersons, [currId]: uniq([...castIDs, ...crewIDs]) })
      }
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

        padding: ${space[1]}px ${space[10]}px ${space[1] + 2}px ${space[3]}px;

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
      <span>{personData?.details && personData?.details.name}</span>
      <motion.span
        initial={{ originX: 0.5 }}
        animate={{ scale: isNameHovered ? 1.2 : 1 }}
        css={css`
          position: absolute;
          right: 4px;
          top: 1px;
        `}
      >
        {favoritePersons && personData?.details && (
          <FavoriteStar isFavorited={!!favoritePersons[personData?.details?.id]} isHovered={isNameHovered} />
        )}
      </motion.span>
    </div>
  )
}

export default PersonDetailCardNameButton
