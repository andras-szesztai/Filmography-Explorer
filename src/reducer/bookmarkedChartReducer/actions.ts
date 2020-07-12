import { PersonGenresObject } from '../../types/person'
import { MovieObject, ActiveMovieDataObject } from '../../types/movie'
import { BookmarkedHoveredMovie } from '../../types/state'

export const UPDATE_BOOKMARKED_GENRE_FILTER = 'UPDATE_BOOKMARKED_GENRE_FILTER'
export const POPULATE_ON_MOUNT = 'POPULATE_ON_MOUNT'
export const POPULATE_BOOKMARKED_HOVERED_MOVIE = 'POPULATE_BOOKMARKED_HOVERED_MOVIE'
export const EMPTY_BOOKMARKED_HOVERED_MOVIE = 'EMPTY_BOOKMARKED_HOVERED_MOVIE'
export const SET_BOOKMARKED_ACTIVE_MOVIE_ID = 'SET_BOOKMARKED_ACTIVE_MOVIE_ID'
export const FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS = 'FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS'
export const FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_SUCCESS = 'FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_SUCCESS'
export const FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_FAIL = 'FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_FAIL'
export const EMPTY_BOOKMARKED_ACTIVE_MOVIE_DETAILS = 'EMPTY_BOOKMARKED_ACTIVE_MOVIE_DETAILS'

export function updateBookmarkedGenreFilter(genreArray: number[]) {
  return {
    type: UPDATE_BOOKMARKED_GENRE_FILTER,
    genreArray
  } as const
}

interface PopulateData {
  genreList: PersonGenresObject[]
  titleList: MovieObject[]
  scales: {
    xScaleDomain: Date[]
    sizeScaleDomain: number[]
  }
}

export function populateOnMount(data: PopulateData) {
  return {
    type: POPULATE_ON_MOUNT,
    data
  } as const
}

export function populateBookmarkedHoveredMovie(movie: BookmarkedHoveredMovie) {
  return {
    type: POPULATE_BOOKMARKED_HOVERED_MOVIE,
    movie
  } as const
}

export function emptyBookmarkedHoveredMovie() {
  return {
    type: EMPTY_BOOKMARKED_HOVERED_MOVIE
  } as const
}

interface ActiveMovie {
  id: number
  position: number
  mediaType: string
}

export function setBookmarkedActiveMovieID(activeMovie: ActiveMovie) {
  return {
    type: SET_BOOKMARKED_ACTIVE_MOVIE_ID,
    activeMovie
  } as const
}

export function fetchBookmarkedActiveMovieDetails() {
  return {
    type: FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS
  } as const
}

export function fetchBookmarkedActiveMovieDetailsFail() {
  return {
    type: FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_FAIL
  } as const
}

export function fetchBookmarkedActiveMovieDetailsSuccess(movieDetails: ActiveMovieDataObject) {
  return {
    type: FETCH_BOOKMARKED_ACTIVE_MOVIE_DETAILS_SUCCESS,
    movieDetails
  } as const
}

export function emptyBookmarkedActiveMovieDetails() {
  return {
    type: EMPTY_BOOKMARKED_ACTIVE_MOVIE_DETAILS
  } as const
}
