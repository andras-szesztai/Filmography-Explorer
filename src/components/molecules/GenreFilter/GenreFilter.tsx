import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle } from 'react-icons/io'
import { css } from '@emotion/core'

// Components
import { uniq, flatten } from 'lodash'

import { usePrevious } from 'react-use'
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { ListEndPlaceHolder } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'
import { PersonGenresObject } from '../../../types/person'

// Actions
import { updateGenreFilter } from '../../../reducer/personCreditsChartReducer/actions'
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'
import { updateBookmarkedGenreFilter } from '../../../reducer/bookmarkedChartReducer/actions'

// Styles
import {
  buttonPadding,
  colors,
  fontWeight,
  space,
  buttonNoFocus,
  buttonFocus,
  buttonStyle,
  filterDropdownStyle
} from '../../../styles/variables'
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'

interface Props {
  genres: PersonGenresObject[]
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  isGenreOpen: boolean
  isBookmarkChart: boolean
  personsFilter?: number[]
  setIsPersonOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const GenreFilter = ({ genres, setIsGenreOpen, isGenreOpen, setIsTitleOpen, isBookmarkChart, personsFilter, setIsPersonOpen }: Props) => {
  const genreList = useSelector((state: CombinedState) => state.movieReducer.genres.data)
  const bookmarked = useSelector((state: CombinedState) => state.movieReducer.bookmarks)
  const personGenreFilter = useSelector((state: CombinedState) => state.personCreditsChartReducer.genreFilter)
  const bookMarkedGenreFilter = useSelector((state: CombinedState) => state.bookmarkedChartReducer.genreFilter)
  const updateFunction = isBookmarkChart ? updateBookmarkedGenreFilter : updateGenreFilter
  const genreFilter = isBookmarkChart ? bookMarkedGenreFilter : personGenreFilter

  const [filteredGenres, setFilteredGenres] = React.useState([] as number[])
  const prevPersonFilter = usePrevious(personsFilter)
  React.useEffect(() => {
    if (personsFilter && prevPersonFilter && personsFilter.length !== prevPersonFilter.length) {
      const filteredBookmarked = Object.values(bookmarked).filter(b => personsFilter.map(pID => b.credits.includes(pID)).includes(true))
      setFilteredGenres(uniq(flatten(filteredBookmarked.map(fB => fB.genres))))
    }
  }, [personsFilter])

  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsGenreOpen(!isGenreOpen)
          setIsTitleOpen(false)
          if (setIsPersonOpen) {
            setIsPersonOpen(false)
          }
        }}
        css={css`
          ${buttonPadding}
          background: ${colors.bgColorSecondary};
          border: none;
          cursor: pointer;
          letter-spacing:  .8px;
          display: flex;
          align-items: center;

          margin-left: ${space[3]}px;
          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
        `}
      >
        <motion.span animate={{ scale: isHovered ? 1.3 : 1 }}>
          <FaFilter color={colors.bgColorPrimary} size={12} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Filter for genres&nbsp;
          <motion.span
            animate={{
              color: !genreFilter.length ? colors.textColorSecondary : colors.accentPrimary
            }}
          >
            ({genreFilter.length})
          </motion.span>
        </span>
      </button>
      {isGenreOpen && (
        <div css={filterDropdownStyle}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
              `}
            >
              <span
                css={css`
                  transform: translateY(2px);
                `}
              >
                Genres
              </span>
              <AnimatePresence>
                {genreFilter.length && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    css={css`
                      height: 20px;
                      align-self: flex-start;
                      margin-left: ${space[2]}px;
                    `}
                  >
                    <SelectableListItem
                      handleSelect={() => dispatch(updateFunction([]))}
                      icon={IoIosCloseCircle}
                      iconSize={18}
                      text="Reset selection"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              type="button"
              css={css`
                display: flex;
                ${buttonStyle}
                ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
                      padding: 0;
              `}
              whileHover={{ originY: 0.1, scale: 1.3 }}
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              onKeyDown={({ keyCode }) => {
                if (keyCode === 13) {
                  setIsGenreOpen(!isGenreOpen)
                }
              }}
            >
              <IoIosCloseCircle color={colors.bgColorPrimary} size={24} />
            </motion.button>
          </div>
          <div
            css={css`
              ${horizontalScrollableStyle}
            `}
          >
            {genres
              .sort((a, b) => b.count - a.count)
              .filter(genre => (filteredGenres.length ? filteredGenres.includes(genre.id) : true))
              .map(genre => {
                const genreObj = genreList.find(g => g.id === genre.id)
                const text = genreObj && genreObj.name
                return (
                  <SelectableListItem
                    key={genre.id}
                    icon={FaFilter}
                    iconSize={12}
                    text={`${text} (${genre.count})`}
                    handleSelect={() => {
                      if (genreFilter.includes(genre.id)) {
                        dispatch(updateFunction(genreFilter.filter(id => id !== genre.id)))
                      } else if (genres.length === genreFilter.length + 1) {
                        dispatch(updateFunction([]))
                      } else {
                        dispatch(updateFunction([...genreFilter, genre.id]))
                      }
                      dispatch(emptyMovieDetails())
                    }}
                    isActive={genreFilter.length ? genreFilter.includes(genre.id) : true}
                  />
                )
              })}
            <ListEndPlaceHolder />
          </div>
        </div>
      )}
    </>
  )
}

GenreFilter.defaultProps = {
  personsFilter: undefined,
  setIsPersonOpen: undefined
}

export default GenreFilter
