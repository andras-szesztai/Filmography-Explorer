import { GenreObject } from '../../types/movie'

const initialState = {
  activeMovieID: 0,
  genres: {
    data: [] as GenreObject[],
    error: ''
  },
  activeMovieData: {
    id: undefined,
    details: {},
    position: undefined,
    cast: [],
    crew: []
  },
  favorties: {},
  bookmarks: {}
}
