import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { FaFilter, FaExternalLinkSquareAlt } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import useWhatInput from 'react-use-what-input'

// Components
import { useDebounce } from 'react-use'

import { Image, TextArea, MovieDetailCardContantLoader, ListEndPlaceHolder } from '../../atoms'
import { SelectableListItem } from '../../molecules'

// Actions
import { setActiveNameID } from '../../../reducer/personReducer/actions'
import { updateGenreFilter } from '../../../reducer/personCreditsChartReducer/actions'
import { updateBookmarkedGenreFilter } from '../../../reducer/bookmarkedChartReducer/actions'

// Hooks
import { useFetchActiveMovieDetails, useFilteredCastList, useFilteredCrewList } from './hooks'

// Types
import { ContentProps } from './types'

// Styles
import {
  mainGridStyle,
  infoGrid,
  movieTitle,
  subtitle,
  rowStyle,
  rowTitleStyle,
  horizontalScrollableStyle,
  linkContainerStyle,
  searchInputStyle
} from './styles'
import { space, buttonNoFocus, buttonFocus, colors } from '../../../styles/variables'

function MovieDetailCardContent({
  isOpen,
  justifyLink,
  loaderLeftPos,
  handleClick,
  setIsHovered,
  activeNameID,
  genreFilter,
  activeMovieID,
  mediaType,
  activeMovieData: { details, crew, cast },
  loading,
  isBookmarkedChart
}: ContentProps) {
  const dispatch = useDispatch()
  const updateGenreFilterFunc = isBookmarkedChart ? updateBookmarkedGenreFilter : updateGenreFilter
  const [isLinkHovered, setIsLinkHovered] = React.useState(false)

  useFetchActiveMovieDetails({ isOpen, activeMovieID, mediaType })

  const [currentInput] = useWhatInput()

  const { setCastInputText, castInputText, filteredCast } = useFilteredCastList({ cast })
  const { crewInputText, setCrewInputText, filteredCrew } = useFilteredCrewList({ crew })

  return (
    <div css={mainGridStyle}>
      <MovieDetailCardContantLoader loading={loading} loaderLeftPos={loaderLeftPos} />
      <div css={infoGrid}>
        <button
          type="button"
          css={css`
            ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
            ${movieTitle}
          `}
          onMouseOver={() => setIsHovered(true)}
          onFocus={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onBlur={() => setIsHovered(false)}
          onClick={() => currentInput === 'mouse' && handleClick()}
        >
          {details.title || details.name}
        </button>
        <div css={subtitle}>
          {mediaType === 'movie' ? 'Release date' : 'First air date'}:&nbsp;
          {format(new Date(details.release_date || details.first_air_date || 0), 'MMM dd, yyyy')}
        </div>
        <TextArea gridArea="" text={details.overview} />
      </div>
      <div
        css={css`
          grid-area: photo;
          overflow: hidden;
          border-radius: ${space[1]}px;
        `}
      >
        <Image url={details.poster_path} alt={`${details.title || details.name}-poster`} />
      </div>
      <div
        css={css`
          ${rowStyle}
          grid-area: genre;
        `}
      >
        <div css={rowTitleStyle}>Genres</div>
        <div
          css={css`
            ${horizontalScrollableStyle}
          `}
        >
          {details.genres &&
            !!details.genres.length &&
            details.genres.map(genre => (
              <SelectableListItem
                key={genre.id}
                text={genre.name}
                icon={FaFilter}
                iconSize={12}
                isActive={genreFilter.length ? genreFilter.includes(genre.id) : true}
                backgroundInactive={colors.bgColorSecondary}
                colorInactive={colors.textColorSecondary}
                handleSelect={() => {
                  if (genreFilter.includes(genre.id)) {
                    dispatch(updateGenreFilterFunc(genreFilter.filter(id => id !== genre.id)))
                  } else if (genreFilter.length === details.genres.length) {
                    dispatch(updateGenreFilterFunc([]))
                  } else {
                    dispatch(updateGenreFilterFunc([...genreFilter, genre.id]))
                  }
                }}
              />
            ))}
          <ListEndPlaceHolder />
        </div>
      </div>
      <div
        css={css`
          ${rowStyle}
          grid-area: crew;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div css={rowTitleStyle}>Lead crew</div>
          <span>
            <input
              css={css`
                ${searchInputStyle}
                ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
                width: 160px;
              `}
              placeholder="Search for a name or job"
              type="text"
              value={crewInputText}
              onChange={(e: React.FormEvent<HTMLInputElement>) => setCrewInputText(e.currentTarget.value)}
            />
          </span>
        </div>
        <div
          css={css`
            ${horizontalScrollableStyle}
          `}
        >
          {!!filteredCrew.length &&
            filteredCrew.slice(0, 25).map(crewMember => {
              const isActive = crewMember.id === activeNameID
              return (
                <SelectableListItem
                  key={`crew-${crewMember.id}-${crewMember.job}`}
                  icon={IoIosSearch}
                  iconSize={18}
                  text={`${crewMember.job}: ${crewMember.name} `}
                  handleSelect={() => dispatch(setActiveNameID(crewMember.id))}
                  additionalHoverCondition={!isActive && !isBookmarkedChart}
                  paddingSpace={space[8]}
                />
              )
            })}
          <ListEndPlaceHolder />
        </div>
      </div>
      <div
        css={css`
          ${rowStyle}
          grid-area: cast;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <div css={rowTitleStyle}>Lead cast</div>
          <span>
            <input
              css={css`
                ${searchInputStyle}
                ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
                width: 195px;
              `}
              placeholder="Search for a name or character"
              type="text"
              value={castInputText}
              onChange={(e: React.FormEvent<HTMLInputElement>) => setCastInputText(e.currentTarget.value)}
            />
          </span>
        </div>
        <div
          css={css`
            ${horizontalScrollableStyle}
          `}
        >
          {!!filteredCast.length &&
            filteredCast.slice(0, 25).map(castMember => {
              const isActive = castMember.id === activeNameID
              return (
                <SelectableListItem
                  key={`cast-${castMember.id}-${castMember.character}`}
                  icon={IoIosSearch}
                  iconSize={18}
                  text={`${castMember.name} as ${castMember.character}`}
                  handleSelect={() => !isActive && !isBookmarkedChart && dispatch(setActiveNameID(castMember.id))}
                  additionalHoverCondition={!isActive && !isBookmarkedChart}
                  paddingSpace={space[8]}
                />
              )
            })}
          <ListEndPlaceHolder />
        </div>
      </div>
      <div
        css={css`
          ${linkContainerStyle}
          justify-content: ${justifyLink};
        `}
      >
        <a
          href={`https://www.themoviedb.org/${mediaType}/${activeMovieID}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsLinkHovered(true)}
          onMouseLeave={() => setIsLinkHovered(false)}
        >
          Click here to find out more on <span>The Movie Database</span>
        </a>
        <motion.div initial={{ y: 2, x: 4 }} animate={{ scale: isLinkHovered ? 1.25 : 1 }}>
          <FaExternalLinkSquareAlt size={20} />
        </motion.div>
      </div>
    </div>
  )
}

export default MovieDetailCardContent
