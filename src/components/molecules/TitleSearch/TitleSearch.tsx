import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import { css } from '@emotion/core'
import { useDebounce, usePrevious } from 'react-use'
import { mean } from 'lodash'

// Components
import { ListEndPlaceHolder } from '../../atoms'
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'
import SelectableListItem from '../SelectableListItem/SelectableListItem'

// Actions
import { setActiveMovieID } from '../../../reducer/movieReducer/actions'
import { populateHoveredMovie, emptyHoveredMovie } from '../../../reducer/personCreditsChartReducer/actions'
import {
  populateBookmarkedHoveredMovie,
  setBookmarkedActiveMovieID,
  emptyBookmarkedHoveredMovie
} from '../../../reducer/bookmarkedChartReducer/actions'

// Types
import { MovieObject } from '../../../types/movie'
import { CombinedState } from '../../../types/state'

// Styles
import {
  colors,
  fontWeight,
  buttonNoFocus,
  buttonFocus,
  buttonStyle,
  fontSize,
  space,
  filterDropdownStyle
} from '../../../styles/variables'

interface Props {
  titles: MovieObject[]
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  isGenreOpen: boolean
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSettingsOpen: boolean
  isTitleOpen: boolean
  isBookmarkChart: boolean
  personsFilter?: number[]
  setIsPersonOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isPersonOpen?: boolean
}

const TitleSearch = ({
  titles,
  setIsTitleOpen,
  isTitleOpen,
  setIsGenreOpen,
  isBookmarkChart,
  setIsPersonOpen,
  setIsSettingsOpen,
  personsFilter = [],
  isGenreOpen,
  isSettingsOpen,
  isPersonOpen
}: Props) => {
  const personCreditsChartReducer = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const bookmarkedChartReducer = useSelector((state: CombinedState) => state.bookmarkedChartReducer)
  const movieReducer = useSelector((state: CombinedState) => state.movieReducer)

  const genreFilter = isBookmarkChart ? bookmarkedChartReducer.genreFilter : personCreditsChartReducer.genreFilter
  const xScaleDomain = isBookmarkChart ? bookmarkedChartReducer.scales.xScaleDomain : personCreditsChartReducer.scales.xScaleDomain
  const prevGenreFilter = usePrevious(genreFilter)
  const cast = isBookmarkChart ? Object.values(movieReducer.bookmarks) : personCreditsChartReducer.dataSets.cast
  const crew = isBookmarkChart ? Object.values(movieReducer.bookmarks) : personCreditsChartReducer.dataSets.crew
  const populateHoveredFunc = isBookmarkChart ? populateBookmarkedHoveredMovie : populateHoveredMovie
  const setActiveMovieFunc = isBookmarkChart ? setBookmarkedActiveMovieID : setActiveMovieID
  const emptyHoveredFunc = isBookmarkChart ? emptyBookmarkedHoveredMovie : emptyHoveredMovie

  const prevActiveNameID = usePrevious(personCreditsChartReducer.nameId)
  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [inputText, setInputText] = React.useState('')
  const [searchText, setSearchText] = React.useState('')
  const prevSearchText = usePrevious(searchText)

  useDebounce(
    () => {
      setSearchText(inputText)
    },
    500,
    [inputText]
  )

  React.useEffect(() => {
    if (!isTitleOpen && searchText) {
      setInputText('')
    }
  }, [isTitleOpen])

  const prevPersonsFilter = usePrevious(personsFilter)
  const isInit = React.useRef(true)
  const [genreFilteredTitles, setGenreFilteredTitles] = React.useState([] as MovieObject[])
  const [filteredTitles, setFilteredTitles] = React.useState([] as MovieObject[])
  React.useEffect(() => {
    if (!searchText && !genreFilter.length && !genreFilteredTitles.length && !!titles.length && !personsFilter.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
    if (
      (prevGenreFilter && genreFilter.length !== prevGenreFilter.length) ||
      (isInit.current && genreFilter.length) ||
      (prevPersonsFilter && personsFilter.length !== prevPersonsFilter.length)
    ) {
      if (isInit.current) {
        isInit.current = false
      }
      const newArray = titles
        .filter(t => (genreFilter.length && t.genres ? t.genres.map(id => genreFilter.includes(id)).includes(true) : true))
        .filter(d => (personsFilter.length ? d.credits && d.credits.some(id => personsFilter.includes(id)) : true))
      setGenreFilteredTitles(newArray)
      setFilteredTitles(newArray)
    }
    if (typeof prevSearchText === 'string' && prevSearchText !== searchText) {
      setFilteredTitles(genreFilteredTitles.filter(t => t.title && t.title.toLowerCase().includes(searchText.toLowerCase())))
    }
    if (prevActiveNameID && personCreditsChartReducer.nameId && personCreditsChartReducer.nameId !== prevActiveNameID) {
      setGenreFilteredTitles([])
      setFilteredTitles([])
    }
    if (!genreFilter.length && !personsFilter.length && titles.length !== genreFilteredTitles.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
  }, [searchText, genreFilter.length, titles.length, personsFilter.length])

  return (
    <>
      <motion.button
        type="button"
        initial={{ background: isTitleOpen ? colors.accentSecondary : colors.bgColorSecondary }}
        animate={{ background: isTitleOpen ? colors.accentSecondary : colors.bgColorSecondary }}
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsTitleOpen(!isTitleOpen)
          if (isGenreOpen) {
            setIsGenreOpen(false)
          }
          if (isSettingsOpen) {
            setIsSettingsOpen(false)
          }
          if (setIsPersonOpen && isPersonOpen) {
            setIsPersonOpen(false)
          }
        }}
        css={css`
          padding: ${space[1] + 1}px ${space[4]}px ${space[1] + 2}px ${space[3]}px;
          background: ${colors.bgColorSecondary};
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          color: ${colors.bgColorPrimary};

          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
        `}
      >
        <motion.span initial={{ y: 2 }} animate={{ scale: isHovered ? 1.3 : 1 }}>
          <IoIosSearch color={colors.bgColorPrimary} size={16} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Find a title
        </span>
      </motion.button>
      {isTitleOpen && (
        <div css={filterDropdownStyle}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              position: relative;
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
                Titles
              </span>
              <span
                css={css`
                  margin-left: ${space[3]}px;
                `}
              >
                <input
                  css={css`
                    border-radius: ${space[1]}px;
                    border: 1px solid ${colors.textColorSecondary};

                    color: ${colors.textColorSecondary};
                    font-size: ${fontSize.sm};
                    font-weight: ${fontWeight.sm};

                    padding: ${space[1]}px ${space[2]}px;
                    opacity: 1;

                    ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

                    &::placeholder {
                      color: inherit;
                      opacity: 1;
                      font-size: inherit;
                      letter-spacing: 0.8px;
                      user-select: none;
                    }
                  `}
                  placeholder="Search . . . "
                  type="text"
                  value={inputText}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)}
                />
              </span>
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
              onClick={() => setIsTitleOpen(!isTitleOpen)}
              onKeyDown={({ keyCode }) => {
                if (keyCode === 13) {
                  setIsTitleOpen(!isTitleOpen)
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
            {filteredTitles.length ? (
              filteredTitles.map(t => (
                <SelectableListItem
                  key={t.id}
                  icon={IoIosSearch}
                  iconSize={16}
                  paddingSpace={space[8]}
                  text={t.title || 'Missing title'}
                  handleSelect={() => {
                    const meanYear = mean(xScaleDomain.map(y => new Date(y).getFullYear()))
                    dispatch(
                      setActiveMovieFunc({
                        id: t.id,
                        position: t.date ? Number(meanYear <= new Date(t.date).getFullYear()) : 0,
                        mediaType: t.media_type
                      })
                    )
                    dispatch(emptyHoveredFunc())
                  }}
                  handleMouseover={() => {
                    const meanYear = mean(xScaleDomain.map(y => new Date(y).getFullYear()))
                    const xPos = t.date ? Number(meanYear <= new Date(t.date).getFullYear()) : 0
                    const isSingle = !cast.length || !crew.length
                    const isCast = cast.length >= crew.length
                    const castObject = cast.find(d => d.id === t.id)
                    if (castObject) {
                      dispatch(
                        populateHoveredFunc({
                          id: t.id,
                          data: castObject,
                          yPosition: isBookmarkChart || isSingle || !isCast ? 1 : 0,
                          xPosition: xPos
                        })
                      )
                    }
                    if (!castObject) {
                      const crewObject = crew.find(d => d.id === t.id)
                      if (crewObject) {
                        dispatch(
                          populateHoveredFunc({
                            id: t.id,
                            data: crewObject,
                            yPosition: isBookmarkChart || isSingle || isCast ? 1 : 0,
                            xPosition: xPos
                          })
                        )
                      }
                    }
                  }}
                  handleMouseout={() => {
                    dispatch(emptyHoveredMovie())
                  }}
                />
              ))
            ) : (
              <span
                css={css`
                  margin-left: ${space[1]}px;
                `}
              >
                Sorry, no results found
              </span>
            )}
            <ListEndPlaceHolder />
          </div>
        </div>
      )}
    </>
  )
}

TitleSearch.defaultProps = {
  setIsPersonOpen: undefined,
  isPersonOpen: false,
  personsFilter: []
}

export default TitleSearch
