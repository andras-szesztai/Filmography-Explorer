import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject, PersonGenresObject } from './person'
import { ChartSettings, HoveredMovie } from './personCreditsChart'
import {
  GenreObject,
  ActiveMovieDataObject,
  MovieObject,
  BookmarkedMoviesObject,
  MovieDetails,
  MovieCastObject,
  MovieCrewObject
} from './movie'

export interface PersonState {
  activeNameID: number
  dataSets: {
    details: PersonDetails
    credits: {
      cast: FormattedPersonCreditDataObject[]
      crew: FormattedPersonCreditDataObject[]
    }
    genres: PersonGenresObject[]
    allTitles: MovieObject[]
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
  genreFilter: number[]
  dataSets: {
    crew: MovieObject[]
    cast: MovieObject[]
  }
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
  favorites: BookmarkedMoviesObject
  bookmarks: BookmarkedMoviesObject
}

export interface BookmarkedHoveredMovie {
  id: number
  data: MovieObject
  yPosition: number
  xPosition: number
}

export interface BookmarkedChartReducer {
  genreList: PersonGenresObject[]
  titleList: MovieObject[]
  genreFilter: number[]
  personFilter: number[]
  bookmarkedHoveredMovie: BookmarkedHoveredMovie
  bookmarkedActiveMovie: {
    id: number
    position: number
    mediaType: string
    details: MovieDetails
    cast: MovieCastObject[]
    crew: MovieCrewObject[]
    loading: boolean
    error: string
  }
  scales: {
    xScaleDomain: Date[]
    sizeScaleDomain: number[]
  }
}

export interface CombinedState {
  personReducer: PersonState
  personCreditsChartReducer: PersonCreditsChartState
  movieReducer: MovieState
  bookmarkedChartReducer: BookmarkedChartReducer
}
