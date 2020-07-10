import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import { css } from '@emotion/core'
import { useDebounce, usePrevious } from 'react-use'

import { mean } from 'lodash'

import { CombinedState } from '../../../types/state'
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
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'
import { MovieObject } from '../../../types/movie'
import { ListEndPlaceHolder } from '../../atoms'
import { setActiveMovieID } from '../../../reducer/movieReducer/actions'
import { populateHoveredMovie, emptyHoveredMovie } from '../../../reducer/personCreditsChartReducer/actions'

interface Props {
  titles: MovieObject[]
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTitleOpen: boolean
}

const TitleSearch = ({ titles, setIsTitleOpen, isTitleOpen, setIsGenreOpen }: Props) => {
  const {
    scales: { xScaleDomain },
    genreFilter
  } = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const prevGenreFilter = usePrevious(genreFilter)
  const {
    activeNameID,
    dataSets: { credits }
  } = useSelector((state: CombinedState) => state.personReducer)
  const prevActiveNameID = usePrevious(activeNameID)

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

  const [genreFilteredTitles, setGenreFilteredTitles] = React.useState([] as MovieObject[])
  const [filteredTitles, setFilteredTitles] = React.useState([] as MovieObject[])
  React.useEffect(() => {
    if (!searchText && !genreFilter.length && !genreFilteredTitles.length && !!titles.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
    if (prevGenreFilter && genreFilter.length !== prevGenreFilter.length) {
      const newArray = titles.filter(t =>
        genreFilter.length && t.genres ? t.genres.map(id => genreFilter.includes(id)).includes(true) : true
      )
      setGenreFilteredTitles(newArray)
      setFilteredTitles(newArray)
    }
    if (prevSearchText !== searchText) {
      setFilteredTitles(genreFilteredTitles.filter(t => t.title.toLowerCase().includes(searchText.toLowerCase())))
    }
    if (prevActiveNameID && activeNameID !== prevActiveNameID) {
      setGenreFilteredTitles([])
      setFilteredTitles([])
    }
    if (!genreFilter.length && titles.length !== genreFilteredTitles.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
  }, [searchText, genreFilter])

  return (
    <>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsTitleOpen(!isTitleOpen)
          setIsGenreOpen(false)
        }}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            setIsTitleOpen(!isTitleOpen)
            setIsGenreOpen(false)
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
      </button>
      <AnimatePresence>
        {isTitleOpen && (
          <motion.div initial={{ y: 35, opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} css={filterDropdownStyle}>
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
                    text={t.title}
                    handleSelect={() => {
                      const meanYear = mean(xScaleDomain.map(y => new Date(y).getFullYear()))
                      dispatch(
                        setActiveMovieID({
                          id: t.id,
                          position: Number(meanYear <= new Date(t.date).getFullYear()),
                          mediaType: t.media_type
                        })
                      )
                    }}
                    handleMouseover={() => {
                      const meanYear = mean(xScaleDomain.map(y => new Date(y).getFullYear()))
                      const xPos = Number(meanYear <= new Date(t.date).getFullYear())
                      const castObject = credits.cast.find(d => d.id === t.id)
                      if (castObject) {
                        dispatch(
                          populateHoveredMovie({
                            id: t.id,
                            data: castObject,
                            yPosition: 0,
                            xPosition: xPos
                          })
                        )
                      }
                      if (!castObject) {
                        const crewObject = credits.crew.find(d => d.id === t.id)
                        if (crewObject) {
                          populateHoveredMovie({
                            id: t.id,
                            data: crewObject,
                            yPosition: 0,
                            xPosition: xPos
                          })
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TitleSearch
