import { PersonGenresObject } from '../../types/person'
import { MovieObject } from '../../types/movie'

export const UPDATE_GENRE_LIST = 'UPDATE_GENRE_LIST'
export const UPDATE_BOOKMARKED_GENRE_FILTER = 'UPDATE_BOOKMARKED_GENRE_FILTER'
export const POPULATE_BOOKMARKED_TITLE_FILTER = 'POPULATE_BOOKMARKED_TITLE_FILTER'

export function updateGenreList(genreList: PersonGenresObject[]) {
  return {
    type: UPDATE_GENRE_LIST,
    genreList
  } as const
}

export function updateBookmarkedGenreFilter(genreArray: number[]) {
  return {
    type: UPDATE_BOOKMARKED_GENRE_FILTER,
    genreArray
  } as const
}

export function populateBookmarkedTitleFilter(titleArray: MovieObject[]) {
  return {
    type: POPULATE_BOOKMARKED_TITLE_FILTER,
    titleArray
  } as const
}
