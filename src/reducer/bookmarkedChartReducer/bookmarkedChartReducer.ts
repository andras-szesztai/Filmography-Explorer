import { GenreCountObject, MovieObject } from '../../types/movie'
import { BookmarkedChartReducer } from '../../types/state'

import { updateGenreFilter, updateGenreList, UPDATE_GENRE_LIST, UPDATE_GENRE_FILTER } from './actions'

const initialState = {
  genreList: [] as GenreCountObject[],
  genreFilters: [] as number[],
  personFilters: [] as number[],
  activeMovieID: 0,
  hoveredMovie: {
    id: 0,
    data: {} as MovieObject,
    yPosition: 0,
    xPosition: 0
  }
}

type Action = ReturnType<typeof updateGenreList | typeof updateGenreFilter>

const bookmarkedChartReducer = (state: BookmarkedChartReducer = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_GENRE_LIST:
      return {
        ...state,
        genreList: action.genreList
      }
    case UPDATE_GENRE_FILTER:
      return {
        ...state,
        genreFilters: action.newArray
      }
    default:
      return state
  }
}

export default bookmarkedChartReducer
