import { GenreObject, SavedMovieObject, MovieDetails, MovieCastObject, MovieCrewObject } from '../../types/movie'

const initialState = {
  activeMovieID: 0,
  genres: {
    data: [] as GenreObject[],
    error: ''
  },
  activeMovieData: {
    id: 0,
    details: {} as MovieDetails,
    position: 0,
    cast: [] as MovieCastObject[],
    crew: [] as MovieCrewObject[]
  },
  favorites: {} as SavedMovieObject,
  bookmarks: {} as SavedMovieObject
}
