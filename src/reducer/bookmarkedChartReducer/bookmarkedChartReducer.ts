import { MovieObject, MovieDetails, MovieCastObject, MovieCrewObject } from '../../types/movie'
import { PersonGenresObject, PersonListObject } from '../../types/person'
import { BookmarkedChartReducer } from '../../types/state'

import {
  updateBookmarkedGenreFilter,
  UPDATE_BOOKMARKED_GENRE_FILTER,
  populateOnMount,
  POPULATE_ON_MOUNT,
  populateBookmarkedHoveredMovie,
  emptyBookmarkedHoveredMovie,
  EMPTY_BOOKMARKED_HOVERED_MOVIE,
  POPULATE_BOOKMARKED_HOVERED_MOVIE,
  setBookmarkedActiveMovieID,
  SET_BOOKMARKED_ACTIVE_MOVIE_ID,
  fetchBookmarkedActiveMovieDetails,
  fetchBookmarkedActiveMovieDetailsFail,
  fetchBookmarkedActiveMovieDetailsSuccess,
  FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS,
  FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_FAIL,
  FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_SUCCESS,
  EMPTY_BOOKMARKED_ACTIVE_MOVIE_DETAILS,
  emptyBookmarkedActiveMovieDetails,
  UPDATE_PERSON_FILTER,
  updatePersonFilter,
  updateBookmarkGenreList,
  UPDATE_BOOKMARK_GENRE_LIST,
  updateBookmarkedPersonList,
  UPDATE_BOOKMARK_PERSON_LIST
} from './actions'

const initialState = {
  genreList: [] as PersonGenresObject[],
  personList: [] as PersonListObject[],
  titleList: [] as MovieObject[],
  genreFilter: [] as number[],
  personFilter: [] as number[],
  bookmarkedActiveMovie: {
    id: 0,
    position: 0,
    mediaType: '',
    details: {} as MovieDetails,
    cast: [] as MovieCastObject[],
    crew: [] as MovieCrewObject[],
    loading: false,
    error: ''
  },
  bookmarkedHoveredMovie: {
    id: 0,
    data: {} as MovieObject,
    yPosition: 0,
    xPosition: 0
  },
  scales: {
    xScaleDomain: [] as Date[],
    sizeScaleDomain: [] as number[]
  }
}

type Action = ReturnType<
  | typeof populateOnMount
  | typeof updateBookmarkedGenreFilter
  | typeof populateBookmarkedHoveredMovie
  | typeof emptyBookmarkedHoveredMovie
  | typeof setBookmarkedActiveMovieID
  | typeof fetchBookmarkedActiveMovieDetails
  | typeof fetchBookmarkedActiveMovieDetailsFail
  | typeof fetchBookmarkedActiveMovieDetailsSuccess
  | typeof emptyBookmarkedActiveMovieDetails
  | typeof updatePersonFilter
  | typeof updateBookmarkGenreList
  | typeof updateBookmarkedPersonList
>

const bookmarkedChartReducer = (state: BookmarkedChartReducer = initialState, action: Action) => {
  switch (action.type) {
    case POPULATE_ON_MOUNT:
      return {
        ...state,
        genreList: action.data.genreList,
        personList: action.data.personList,
        titleList: action.data.titleList,
        scales: action.data.scales
      }
    case UPDATE_BOOKMARKED_GENRE_FILTER:
      return {
        ...state,
        genreFilter: action.genreArray
      }
    case POPULATE_BOOKMARKED_HOVERED_MOVIE:
      return {
        ...state,
        bookmarkedHoveredMovie: action.movie
      }
    case EMPTY_BOOKMARKED_HOVERED_MOVIE:
      return {
        ...state,
        bookmarkedHoveredMovie: {
          id: 0,
          data: {} as MovieObject,
          yPosition: 0,
          xPosition: 0
        }
      }
    case SET_BOOKMARKED_ACTIVE_MOVIE_ID: {
      return {
        ...state,
        bookmarkedActiveMovie: {
          ...state.bookmarkedActiveMovie,
          id: action.activeMovie.id,
          position: action.activeMovie.position,
          mediaType: action.activeMovie.mediaType
        }
      }
    }
    case FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS:
      return {
        ...state,
        bookmarkedActiveMovie: {
          ...state.bookmarkedActiveMovie,
          loading: true
        }
      }
    case FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        bookmarkedActiveMovie: {
          ...state.bookmarkedActiveMovie,
          loading: false,
          error: 'Movie details data is not available'
        }
      }
    case FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        bookmarkedActiveMovie: {
          ...state.bookmarkedActiveMovie,
          details: action.movieDetails.details,
          cast: action.movieDetails.cast,
          crew: action.movieDetails.crew,
          loading: false,
          error: ''
        }
      }
    case EMPTY_BOOKMARKED_ACTIVE_MOVIE_DETAILS:
      return {
        ...state,
        bookmarkedActiveMovie: {
          ...state.bookmarkedActiveMovie,
          id: 0,
          position: 0,
          mediaType: '',
          details: {} as MovieDetails,
          cast: [] as MovieCastObject[],
          crew: [] as MovieCrewObject[]
        }
      }
    case UPDATE_PERSON_FILTER:
      return {
        ...state,
        personFilter: action.personFilterArray
      }
    case UPDATE_BOOKMARK_GENRE_LIST:
      return {
        ...state,
        genreList: action.genreList
      }
    case UPDATE_BOOKMARK_PERSON_LIST:
      return {
        ...state,
        personList: action.personList
      }
    default:
      return state
  }
}

export default bookmarkedChartReducer
