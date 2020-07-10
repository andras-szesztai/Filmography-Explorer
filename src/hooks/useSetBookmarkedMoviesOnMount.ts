import React from 'react'
import { useDispatch } from 'react-redux'

// Actions
import { updateBookmarkedMovies } from '../reducer/movieReducer/actions'

// Types
import { BookmarkedMoviesObject } from '../types/movie'

export default function useSetBookmarkedMoviesOnMount(bookmarkedMovies?: BookmarkedMoviesObject) {
  const dispatch = useDispatch()
  const init = React.useRef(true)
  React.useEffect(() => {
    if (init.current) {
      if (bookmarkedMovies && Object.keys(bookmarkedMovies)) {
        init.current = false
        dispatch(updateBookmarkedMovies(bookmarkedMovies))
      }
    }
  })
}
