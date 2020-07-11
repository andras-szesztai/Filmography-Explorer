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
import {
  fetchBookmarkedActiveMovieDetails,
  fetchBookmarkedActiveMovieDetailsFail,
  fetchBookmarkedActiveMovieDetailsSuccess
} from '../../../../reducer/bookmarkedChartReducer/actions'

interface Params {
  isOpen: boolean
  activeMovieID: number
  mediaType: string
  isBookmarkedChart?: boolean
}

function useFetchActiveMovieDetails({ isOpen, activeMovieID, mediaType, isBookmarkedChart }: Params) {
  const dispatch = useDispatch()
  const fetchFunc = isBookmarkedChart ? fetchBookmarkedActiveMovieDetails : fetchActiveMovieDetails
  const successFunc = isBookmarkedChart ? fetchBookmarkedActiveMovieDetailsSuccess : fetchActiveMovieDetailsSuccess
  const failFunc = isBookmarkedChart ? fetchBookmarkedActiveMovieDetailsFail : fetchActiveMovieDetailsFail

  React.useEffect(() => {
    if (isOpen) {
      dispatch(fetchFunc())
      axios
        .all([
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}/credits?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/${mediaType}/${activeMovieID}?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((credits, details) => {
            console.log('useFetchActiveMovieDetails -> details', details)
            dispatch(
              successFunc({
                id: activeMovieID,
                details: details.data,
                cast: credits.data.cast,
                crew: credits.data.crew
              })
            )
          })
        )
        .catch(() => {
          dispatch(failFunc())
        })
    }
  }, [activeMovieID])
}

export default useFetchActiveMovieDetails
