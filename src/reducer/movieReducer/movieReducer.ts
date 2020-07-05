// Types
import { GenreObject, SavedMovieObject, MovieDetails, MovieCastObject, MovieCrewObject } from '../../types/movie'
import { MovieState } from '../../types/state'

// Actions
import {
  setActiveMovieID,
  fetchGenreListFail,
  fetchGenreListSuccess,
  SET_ACTIVE_MOVIE_ID,
  FETCH_GENRE_LIST_FAIL,
  FETCH_GENRE_LIST_SUCCESS,
  FETCH_ACTIVE_MOVIE_DETAILS,
  FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS,
  FETCH_ACTIVE_MOVIE_DETAILS_FAIL,
  fetchActiveMovieDetails,
  fetchActiveMovieDetailsFail,
  fetchActiveMovieDetailsSuccess
} from './actions'

const initialState = {
  activeMovieID: 0,
  genres: {
    data: [] as GenreObject[],
    error: ''
  },
  activeMovieData: {
    id: 0,
    details: {} as MovieDetails,
    position: 0,
    cast: [] as MovieCastObject[],
    crew: [] as MovieCrewObject[]
  },
  loading: { activeMovieData: false },
  error: { activeMovieData: '' },
  favorites: {} as SavedMovieObject,
  bookmarks: {} as SavedMovieObject
}

type Action = ReturnType<
  | typeof setActiveMovieID
  | typeof fetchGenreListFail
  | typeof fetchGenreListSuccess
  | typeof fetchActiveMovieDetails
  | typeof fetchActiveMovieDetailsFail
  | typeof fetchActiveMovieDetailsSuccess
>

const personReducer = (state: MovieState = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_GENRE_LIST_FAIL:
      return { ...state, genres: { data: [], error: 'Genre data is not available' } }
    case FETCH_GENRE_LIST_SUCCESS:
      return { ...state, genres: { data: action.genres, error: '' } }
    case SET_ACTIVE_MOVIE_ID:
      return { ...state, activeMovieID: action.movieID }
    case FETCH_ACTIVE_MOVIE_DETAILS:
      return { ...state, loading: { activeMovieData: true } }
    case FETCH_ACTIVE_MOVIE_DETAILS_FAIL:
      return { ...state, loading: { activeMovieData: false }, error: { activeMovieData: 'Movie details data is not available' } }
    case FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS:
      return { ...state, loading: { activeMovieData: false }, error: { activeMovieData: '' }, activeMovieData: action.movieDetails }
    default:
      return state
  }
}

export default personReducer
