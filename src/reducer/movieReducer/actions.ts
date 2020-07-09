import { ActiveMovieDataObject, GenreObject } from '../../types/movie'

export const SET_ACTIVE_MOVIE_ID = 'SET_ACTIVE_MOVIE_ID'
export const FETCH_GENRE_LIST_FAIL = 'FETCH_GENRE_LIST_FAIL'
export const FETCH_GENRE_LIST_SUCCESS = 'FETCH_GENRE_LIST_SUCCESS'
export const FETCH_ACTIVE_MOVIE_DETAILS = 'FETCH_ACTIVE_MOVIE_DETAILS'
export const FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS = 'FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS'
export const FETCH_ACTIVE_MOVIE_DETAILS_FAIL = 'FETCH_ACTIVE_MOVIE_DETAILS_FAIL'
export const EMPTY_MOVIE_DETAILS = 'EMPTY_MOVIE_DETAILS'

export function setActiveMovieID(info: { id: number; position: number; mediaType: string }) {
  return {
    type: SET_ACTIVE_MOVIE_ID,
    info
  } as const
}

export function fetchGenreListFail() {
  return {
    type: FETCH_GENRE_LIST_FAIL
  } as const
}

export function fetchGenreListSuccess(genres: GenreObject[]) {
  return {
    type: FETCH_GENRE_LIST_SUCCESS,
    genres
  } as const
}

export function fetchActiveMovieDetails() {
  return {
    type: FETCH_ACTIVE_MOVIE_DETAILS
  } as const
}

export function fetchActiveMovieDetailsFail() {
  return {
    type: FETCH_ACTIVE_MOVIE_DETAILS_FAIL
  } as const
}

export function fetchActiveMovieDetailsSuccess(movieDetails: ActiveMovieDataObject) {
  return {
    type: FETCH_ACTIVE_MOVIE_DETAILS_SUCCESS,
    movieDetails
  } as const
}

export function emptyMovieDetails() {
  return {
    type: EMPTY_MOVIE_DETAILS
  } as const
}
