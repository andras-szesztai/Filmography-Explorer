import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { FaFilter } from 'react-icons/fa'

// Types
import useWhatInput from 'react-use-what-input'
import { CombinedState } from '../../../types/state'

// Hooks
import { useFetchActiveMovieDetails } from './hooks'

// Styles
import {
  movieDetailCardContainerLeft,
  mainGridStyle,
  infoGrid,
  movieTitle,
  subtitle,
  rowStyle,
  rowTitleStyle,
  horizontalScrollableStyle
} from './styles'
import { width, handleSize, space, colors, buttonNoFocus, buttonFocus } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { Image, TextArea } from '../../atoms'
import GenreListItem from '../../molecules/GenreListItem/GenreListItem'

const MovieDetailCardLeft = () => {
  const {
    position,
    activeMovieID,
    mediaType,
    activeMovieData: { details },
    loading
  } = useSelector((state: CombinedState) => state.movieReducer)

  const isOpen = true //! !activeMovieID && position === 1
  useFetchActiveMovieDetails({ isOpen, activeMovieID, mediaType })

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={movieDetailCardContainerLeft}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${width.movieDetailCardExtra + handleSize}px auto;
          grid-template-areas: 'placeholder content';
        `}
      >
        <div css={mainGridStyle}>
          <div css={infoGrid}>
            <div css={movieTitle}>{details.original_title || details.original_name}</div>
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
            <Image url={details.poster_path} alt={`${details.original_title || details.original_name}-poster`} />
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
              {details.genres && !!details.genres.length && details.genres.map(genre => <GenreListItem text={genre.name} />)}
            </div>
          </div>
          <div
            css={css`
              ${rowStyle}
              grid-area: crew;
            `}
          >
            <div css={rowTitleStyle}>Lead crew</div>
            <div
              css={css`
                ${horizontalScrollableStyle}
              `}
            />
          </div>
          <div
            css={css`
              ${rowStyle}
              grid-area: cast;
            `}
          >
            <div css={rowTitleStyle}>Cast crew</div>
            <div
              css={css`
                ${horizontalScrollableStyle}
              `}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
