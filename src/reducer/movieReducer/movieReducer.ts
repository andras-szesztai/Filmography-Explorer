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
  fetchActiveMovieDetailsSuccess,
  emptyMovieDetails,
  EMPTY_MOVIE_DETAILS
} from './actions'

const initialState = {
  activeMovieID: 0,
  position: 0,
  mediaType: '',
  genres: {
    data: [] as GenreObject[],
    error: ''
  },
  activeMovieData: {
    id: 0,
    details: {} as MovieDetails,
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
  | typeof emptyMovieDetails
>

const personReducer = (state: MovieState = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_GENRE_LIST_FAIL:
      return { ...state, genres: { data: [], error: 'Genre data is not available' } }
    case FETCH_GENRE_LIST_SUCCESS:
      return { ...state, genres: { data: action.genres, error: '' } }
    case SET_ACTIVE_MOVIE_ID:
      return { ...state, activeMovieID: action.info.id, position: action.info.position, mediaType: action.info.mediaType }
    case FETCH_ACTIVE_MOVIE_DETAILS:
      return { ...state, loading: { activeMovieData: true } }
    case FETCH_ACTIVE_MOVIE_DETAILS_FAIL:
      return { ...state, loading: { activeMovieData: false }, error: { activeMovieData: 'Movie details data is not available' } }
    case FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS:
      return { ...state, loading: { activeMovieData: false }, error: { activeMovieData: '' }, activeMovieData: action.movieDetails }
    case EMPTY_MOVIE_DETAILS:
      return {
        ...state,
        activeMovieID: 0,
        mediaType: '',
        activeMovieData: {
          id: 0,
          details: {} as MovieDetails,
          cast: [] as MovieCastObject[],
          crew: [] as MovieCrewObject[]
        }
      }
    default:
      return state
  }
}

export default personReducer
