import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import uniqBy from 'lodash/uniqBy'

// Types
import { CombinedState } from '../types/state'

// Actions
import { fetchGenreListSuccess, fetchGenreListFail } from '../reducer/movieReducer/actions'

// Constant
import { API_ROOT } from '../constants/url'

const useFetchGenreList = () => {
  const genres = useSelector((state: CombinedState) => state.movieReducer.genres.data)
  const dispatch = useDispatch()

  const init = useRef(true)
  useEffect(() => {
    if (init.current && !genres.length) {
      axios
        .all([
          axios.get(`${API_ROOT}/genre/movie/list?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/genre/tv/list?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((movie, tv) => {
            dispatch(fetchGenreListSuccess(uniqBy([...movie.data.genres, ...tv.data.genres], 'id')))
          })
        )
        .catch(() => {
          dispatch(fetchGenreListFail())
        })
    }
    init.current = false
  })
}

export default useFetchGenreList
