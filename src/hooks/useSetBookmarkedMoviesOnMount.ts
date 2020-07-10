import React from 'react'
import { useLocalStorage } from 'react-use'
import { useDispatch } from 'react-redux'

// Actions
import { updateBookmarkedMovies } from '../reducer/movieReducer/actions'

// Constants
import { LOCAL_STORE_ACCESSORS } from '../constants/accessors'

// Types
import { BookmarkedMoviesObject } from '../types/movie'

export default function useSetBookmarkedMoviesOnMount() {
  const [bookmarkedMovies] = useLocalStorage<BookmarkedMoviesObject>(LOCAL_STORE_ACCESSORS.bookmarkedMovies)

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
