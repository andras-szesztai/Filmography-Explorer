import React from 'react'
import { motion } from 'framer-motion'
import { css } from '@emotion/core'
import axios from 'axios'
import { useDispatch } from 'react-redux'

// Types
import { Props } from './types'

// Constans
import { API_ROOT } from '../../../constants/url'

// Styles
import { MovieDetailCardContainerLeft, MainGridStyle, InfoGrid } from './styles'
import { width, handleSize } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

const MovieDetailCardLeft = ({ isOpen, activeMovieID, mediaType }: Props) => {
  const dispatch = useDispatch()
  console.log('MovieDetailCardLeft -> mediaType', mediaType)
  React.useEffect(() => {
    if (isOpen && activeMovieID) {
      axios
        .all([
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}/credits?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((credits, details) => {
            console.log(credits)
            console.log(details)
            // cast: uniqBy(response.data.cast, 'id').slice(0, 10),
            // crew: uniqBy(response.data.crew, 'id').slice(0, 10)
            // dispatch(fetchGenreListSuccess(uniqBy([...movie.data.genres, ...tv.data.genres], 'id')))
          })
        )
        .catch(() => {
          // dispatch(fetchGenreListFail())
        })
    }
  }, [activeMovieID])

  return (
    <motion.div animate={{ x: isOpen ? width.detailsCard : 0 }} transition={transition.primary} css={MovieDetailCardContainerLeft}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${width.movieDetailCardExtra + handleSize}px auto;
          grid-template-areas: 'placeholder content';
        `}
      >
        <div css={MainGridStyle}>
          <div css={InfoGrid}>
            <div>Title</div>
            <div>Info</div>
            <div>Info</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MovieDetailCardLeft
