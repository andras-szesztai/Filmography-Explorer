// Actions
import {
  updateChartSettings,
  populateHoveredMovie,
  emptyHoveredMovie,
  UPDATE_CHART_SETTINGS,
  POPULATE_HOVERED_MOVIE,
  EMPTY_HOVERED_MOVIE,
  updateGenreFilter,
  UPDATE_GENRE_FILTER
} from './actions'

// Types
import { PersonCreditsChartState } from '../../types/state'
import { FormattedPersonCreditDataObject } from '../../types/person'
import { MovieObject } from '../../types/movie'

const initialState = {
  nameId: 0,
  movieSearchData: [] as FormattedPersonCreditDataObject[],
  isBoth: false,
  scales: {
    xScaleDomain: [] as Date[],
    sizeScaleDomain: [] as number[]
  },
  dataSets: {
    crew: [] as MovieObject[],
    cast: [] as MovieObject[]
  },
  isYDomainSynced: true,
  isSizeDynamic: true,
  hoveredMovie: {
    id: 0,
    data: {} as MovieObject,
    yPosition: 0,
    xPosition: 0
  },
  genreFilter: [] as number[]
}

type Action = ReturnType<typeof updateChartSettings | typeof populateHoveredMovie | typeof emptyHoveredMovie | typeof updateGenreFilter>

const personCreditsChartReducer = (state: PersonCreditsChartState = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_CHART_SETTINGS:
      return {
        ...state,
        nameId: action.settings.nameId,
        movieSearchData: action.settings.movieSearchData,
        isBoth: action.settings.isBoth,
        scales: action.settings.scales,
        dataSets: action.settings.dataSets,
        genreFilter: []
      }
    case POPULATE_HOVERED_MOVIE:
      return {
        ...state,
        hoveredMovie: action.movie
      }
    case EMPTY_HOVERED_MOVIE:
      return {
        ...state,
        hoveredMovie: {
          id: 0,
          data: {} as MovieObject,
          yPosition: 0,
          xPosition: 0
        }
      }
    case UPDATE_GENRE_FILTER:
      return {
        ...state,
        genreFilter: action.newArray
      }
    default:
      return state
  }
}

export default personCreditsChartReducer
