import { MovieObject } from '../../types/movie'
import { PersonGenresObject } from '../../types/person'
import { BookmarkedChartReducer } from '../../types/state'

import { updateBookmarkedGenreFilter, UPDATE_BOOKMARKED_GENRE_FILTER, populateOnMount, POPULATE_ON_MOUNT } from './actions'

const initialState = {
  genreList: [] as PersonGenresObject[],
  titleList: [] as MovieObject[],
  genreFilter: [] as number[],
  personFilter: [] as number[],
  activeMovieID: 0,
  scales: {
    xScaleDomain: [] as Date[],
    sizeScaleDomain: [] as number[]
  },
  hoveredMovie: {
    id: 0,
    data: {} as MovieObject,
    yPosition: 0,
    xPosition: 0
  }
}

type Action = ReturnType<typeof populateOnMount | typeof updateBookmarkedGenreFilter>

const bookmarkedChartReducer = (state: BookmarkedChartReducer = initialState, action: Action) => {
  switch (action.type) {
    case POPULATE_ON_MOUNT:
      return {
        ...state,
        genreList: action.data.genreList,
        titleList: action.data.titleList,
        scales: action.data.scales
      }
    case UPDATE_BOOKMARKED_GENRE_FILTER:
      return {
        ...state,
        genreFilter: action.genreArray
      }
    default:
      return state
  }
}

export default bookmarkedChartReducer
