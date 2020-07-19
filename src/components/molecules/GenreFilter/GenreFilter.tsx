import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle } from 'react-icons/io'
import { css } from '@emotion/core'
import { usePrevious, useClickAway } from 'react-use'
import { uniq, flatten } from 'lodash'

// Components
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { ListEndPlaceHolder, FilterBridge } from '../../atoms'

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
  filterDropdownStyle,
  dentedStyleDark
} from '../../../styles/variables'
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'

interface Props {
  genres: PersonGenresObject[]
  isBookmarkChart: boolean
  personsFilter?: number[]
}

const GenreFilter = ({ genres, isBookmarkChart, personsFilter }: Props) => {
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
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLDivElement>(null)
  useClickAway(ref, () => {
    setIsOpen(false)
  })

  return (
    <div ref={ref}>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        css={css`
          ${buttonPadding}
          background: ${colors.bgColorPrimaryLight};
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          color: ${colors.textColorPrimary};

          margin-left: ${space[3]}px;
          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
          position: relative;
        `}
      >
        <FilterBridge isOpen={isOpen} />
        <motion.span animate={{ scale: isHovered ? 1.3 : 1, color: genreFilter.length ? colors.accentSecondary : colors.textColorPrimary }}>
          <FaFilter size={12} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Filter for genres ({genreFilter.length})
        </span>
      </button>
      {isOpen && (
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
                      paddingSpace={space[8]}
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
              `}
              initial={{ y: -2, x: 6 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoIosCloseCircle color={colors.bgColorSecondary} size={24} />
            </motion.button>
          </div>
          <div
            css={css`
              ${horizontalScrollableStyle} ::-webkit-scrollbar-track {
                background: ${colors.bgColorSecondary};
              }
              ${dentedStyleDark}
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
                    key={`${genre.id}-main-filter`}
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
    </div>
  )
}

GenreFilter.defaultProps = {
  personsFilter: []
}

export default GenreFilter
