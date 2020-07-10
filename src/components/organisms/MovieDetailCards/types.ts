import { BookmarkedMoviesObject } from '../../../types/movie'

export interface Params {
  bookmarkedMovies: BookmarkedMoviesObject | undefined
  setBookmarkedMovies: React.Dispatch<React.SetStateAction<BookmarkedMoviesObject | undefined>>
}
