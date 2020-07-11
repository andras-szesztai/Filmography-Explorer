import { PersonGenresObject } from '../../types/person'

export const UPDATE_GENRE_LIST = 'UPDATE_GENRE_LIST'
export const UPDATE_GENRE_FILTER = 'UPDATE_GENRE_FILTER'

export function updateGenreList(genreList: PersonGenresObject[]) {
  return {
    type: UPDATE_GENRE_LIST,
    genreList
  } as const
}

export function updateGenreFilter(newArray: number[]) {
  return {
    type: UPDATE_GENRE_FILTER,
    newArray
  } as const
}
