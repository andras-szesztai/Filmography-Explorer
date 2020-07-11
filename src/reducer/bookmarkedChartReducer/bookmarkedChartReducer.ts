import { MovieObject } from '../../types/movie'
import { PersonGenresObject } from '../../types/person'
import { BookmarkedChartReducer } from '../../types/state'

import { updateBookmarkedGenreFilter, updateGenreList, UPDATE_GENRE_LIST, UPDATE_BOOKMARKED_GENRE_FILTER } from './actions'

const initialState = {
  genreList: [] as PersonGenresObject[],
  genreFilter: [] as number[],
  personFilter: [] as number[],
  activeMovieID: 0,
  hoveredMovie: {
    id: 0,
    data: {} as MovieObject,
    yPosition: 0,
    xPosition: 0
  }
}

type Action = ReturnType<typeof updateGenreList | typeof updateBookmarkedGenreFilter>

const bookmarkedChartReducer = (state: BookmarkedChartReducer = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_GENRE_LIST:
      return {
        ...state,
        genreList: action.genreList
      }
    case UPDATE_BOOKMARKED_GENRE_FILTER:
      return {
        ...state,
        genreFilter: action.newArray
      }
    default:
      return state
  }
}

export default bookmarkedChartReducer
