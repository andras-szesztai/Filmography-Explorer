export interface BookmarkedMoviesObject {
  [id: number]: {
    original_title?: string
    original_name?: string
    release_date?: string
    first_air_date?: string
    media_type: string
    vote_average: number
    vote_count: number
    genres: number[]
    credits: number[]
  }
}
