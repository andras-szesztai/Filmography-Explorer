import { ChartSettings, HoveredMovie } from '../../types/personCreditsChart'

export const UPDATE_CHART_SETTINGS = 'UPDATE_CHART_SETTINGS'
export const SET_IS_Y_DOMAIN_SYNCED = 'SET_IS_Y_DOMAIN_SYNCED'
export const SET_IS_SIZE_DYNAMIC = 'SET_IS_SIZE_DYNAMIC'
export const POPULATE_HOVERED_MOVIE = 'POPULATE_HOVERED_MOVIE'
export const EMPTY_HOVERED_MOVIE = 'EMPTY_HOVERED_MOVIE'
export const ADD_SELECTED_MOVIE = 'ADD_SELECTED_MOVIE'
export const REMOVE_SELECTED_MOVIE = 'REMOVE_SELECTED_MOVIE'
export const UPDATE_GENRE_FILTER = 'UPDATE_GENRE_FILTER'

export function updateChartSettings(settings: ChartSettings) {
  return {
    type: UPDATE_CHART_SETTINGS,
    settings
  } as const
}

export function populateHoveredMovie(movie: HoveredMovie) {
  return {
    type: POPULATE_HOVERED_MOVIE,
    movie
  } as const
}

export function emptyHoveredMovie() {
  return {
    type: EMPTY_HOVERED_MOVIE
  } as const
}

export function updateGenreFilter(newArray: number[]) {
  return {
    type: UPDATE_GENRE_FILTER,
    newArray
  } as const
}
