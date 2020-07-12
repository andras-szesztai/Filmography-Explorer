import { BookmarkedMoviesObject, MovieDetails, MovieCastObject, MovieCrewObject } from '../../../types/movie'

export interface Params {
  bookmarkedMovies?: BookmarkedMoviesObject | undefined
  setBookmarkedMovies?: React.Dispatch<React.SetStateAction<BookmarkedMoviesObject | undefined>>
  activeNameID?: number
  genreFilter: number[]
  mediaType: string
  loading: boolean
  isBookmarkedChart?: boolean
  activeMovieData: {
    details: MovieDetails
    crew: MovieCrewObject[]
    cast: MovieCastObject[]
  }
}

export interface ContentProps {
  isOpen: boolean
  justifyLink: string
  loaderLeftPos: number
  handleClick: () => void
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
  activeNameID?: number
  genreFilter: number[]
  activeMovieID: number
  mediaType: string
  loading: boolean
  activeMovieData: {
    details: MovieDetails
    crew: MovieCrewObject[]
    cast: MovieCastObject[]
  }
  isBookmarkedChart?: boolean
}
