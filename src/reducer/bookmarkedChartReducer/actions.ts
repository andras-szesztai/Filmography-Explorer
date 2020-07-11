import { PersonGenresObject } from '../../types/person'
import { MovieObject } from '../../types/movie'

export const UPDATE_BOOKMARKED_GENRE_FILTER = 'UPDATE_BOOKMARKED_GENRE_FILTER'
export const POPULATE_ON_MOUNT = 'POPULATE_ON_MOUNT'

export function updateBookmarkedGenreFilter(genreArray: number[]) {
  return {
    type: UPDATE_BOOKMARKED_GENRE_FILTER,
    genreArray
  } as const
}

interface PopulateData {
  genreList: PersonGenresObject[]
  titleList: MovieObject[]
  scales: {
    xScaleDomain: Date[]
    sizeScaleDomain: number[]
  }
}

export function populateOnMount(data: PopulateData) {
  return {
    type: POPULATE_ON_MOUNT,
    data
  } as const
}
