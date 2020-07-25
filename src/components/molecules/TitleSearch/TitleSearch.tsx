import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { IoIosSearch } from 'react-icons/io'
import { css } from '@emotion/core'
import { useDebounce, useClickAway } from 'react-use'
import { mean } from 'lodash'

// Components
import { ListEndPlaceHolder, FilterBridge, CloseIconButton } from '../../atoms'
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
  fontSize,
  space,
  filterDropdownStyle,
  dentedStyleDark
} from '../../../styles/variables'
import { useUpdateFilteredTitles } from './hooks'
import { transition } from '../../../styles/animation'

interface Props {
  titles: MovieObject[]
  isBookmarkChart: boolean
  personsFilter?: number[]
}

const TitleSearch = ({ titles, isBookmarkChart, personsFilter = [] }: Props) => {
  const personCreditsChartReducer = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const bookmarkedChartReducer = useSelector((state: CombinedState) => state.bookmarkedChartReducer)
  const movieReducer = useSelector((state: CombinedState) => state.movieReducer)

  const xScaleDomain = isBookmarkChart ? bookmarkedChartReducer.scales.xScaleDomain : personCreditsChartReducer.scales.xScaleDomain
  const cast = isBookmarkChart ? Object.values(movieReducer.bookmarks) : personCreditsChartReducer.dataSets.cast
  const crew = isBookmarkChart ? Object.values(movieReducer.bookmarks) : personCreditsChartReducer.dataSets.crew
  const populateHoveredFunc = isBookmarkChart ? populateBookmarkedHoveredMovie : populateHoveredMovie
  const setActiveMovieFunc = isBookmarkChart ? setBookmarkedActiveMovieID : setActiveMovieID
  const emptyHoveredFunc = isBookmarkChart ? emptyBookmarkedHoveredMovie : emptyHoveredMovie

  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState('')
  const [searchText, setSearchText] = React.useState('')

  const filteredTitles = useUpdateFilteredTitles({ searchText, isBookmarkChart, titles, personsFilter })

  useDebounce(
    () => {
      setSearchText(inputText)
    },
    500,
    [inputText]
  )

  React.useEffect(() => {
    if (!isOpen && searchText) {
      setInputText('')
    }
  }, [isOpen])

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
          padding: ${space[1] + 1}px ${space[4]}px ${space[1] + 2}px ${space[3]}px;
          background: ${colors.bgColorPrimaryLight};
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          color: ${colors.textColorPrimary};

          position: relative;

          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
        `}
      >
        <FilterBridge isOpen={isOpen} />
        <motion.span initial={{ y: 2 }} animate={{ scale: isHovered ? 1.3 : 1, transition: transition.whileHover }}>
          <IoIosSearch color={colors.textColorPrimary} size={16} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Find a title
        </span>
      </button>
      {isOpen && (
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
              <span>
                <input
                  css={css`
                    border-radius: ${space[1]}px;
                    border: none;
                    background: ${colors.bgColorPrimary};

                    color: ${colors.textColorPrimary};
                    font-size: ${fontSize.md};
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
                  placeholder="Search"
                  type="text"
                  value={inputText}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)}
                />
              </span>
            </div>
            <CloseIconButton currentInput={currentInput} setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          <div
            css={css`
              ${horizontalScrollableStyle} ::-webkit-scrollbar-track {
                background: ${colors.bgColorSecondary};
              }
              ${dentedStyleDark}
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
    </div>
  )
}

TitleSearch.defaultProps = {
  personsFilter: []
}

export default TitleSearch
