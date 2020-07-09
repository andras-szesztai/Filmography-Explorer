import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Actions
import {
  fetchActiveMovieDetails,
  fetchActiveMovieDetailsSuccess,
  fetchActiveMovieDetailsFail
} from '../../../../reducer/movieReducer/actions'

// Constants
import { API_ROOT } from '../../../../constants/url'

interface Params {
  isOpen: boolean
  activeMovieID: number
  mediaType: string
}

function useFetchActiveMovieDetails({ isOpen, activeMovieID, mediaType }: Params) {
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (isOpen) {
      dispatch(fetchActiveMovieDetails())
      axios
        .all([
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}/credits?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((credits, details) => {
            dispatch(
              fetchActiveMovieDetailsSuccess({
                id: activeMovieID,
                details: details.data,
                cast: credits.data.cast,
                crew: credits.data.crew
              })
            )
          })
        )
        .catch(() => {
          dispatch(fetchActiveMovieDetailsFail())
        })
    }
  }, [activeMovieID])
}

export default useFetchActiveMovieDetails
