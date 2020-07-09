import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from './person'
import { ChartSettings, HoveredMovie } from './personCreditsChart'
import { GenreObject, ActiveMovieDataObject, SavedMovieObject } from './movie'

export interface PersonState {
  activeNameID: number
  dataSets: {
    details: PersonDetails
    credits: {
      cast: FormattedPersonCreditDataObject[]
      crew: FormattedPersonCreditDataObject[]
    }
  }
  favorites: FavoritePersonsObject
  loading: {
    personDetails: boolean
    personCredits: boolean
  }
  error: string
}

export interface PersonCreditsChartState extends ChartSettings {
  isYDomainSynced: boolean
  isSizeDynamic: boolean
  hoveredMovie: HoveredMovie
}

export interface MovieState {
  activeMovieID: number
  position: number
  mediaType: string
  genres: {
    data: GenreObject[]
    error: string
  }
  activeMovieData: ActiveMovieDataObject
  loading: { activeMovieData: boolean }
  error: { activeMovieData: string }
  favorites: SavedMovieObject
  bookmarks: SavedMovieObject
}

export interface CombinedState {
  personReducer: PersonState
  personCreditsChartReducer: PersonCreditsChartState
  movieReducer: MovieState
}
