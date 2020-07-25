export interface GenreObject {
  id: number
  name: string
}

export interface MovieSearchResultObject {
  id: number
  poster_path: string
  title: string
  media_type: string
}

export interface ActiveMovieDataObject {
  id: number
  details: MovieDetails
  cast: MovieCastObject[]
  crew: MovieCrewObject[]
}

export interface TitleObject {
  id: number
  title: string
  date: string
  genres: number[]
}

export interface MovieDetails {
  budget: number
  genres: GenreObject[]
  homepage?: string
  id: number
  imdb_id?: string
  title?: string
  name?: string
  overview: string
  popularity: number
  poster_path?: string
  vote_average: number
  vote_count: number
  tagline: string
  release_date?: string
  first_air_date?: string
  media_type: string
}

export interface MovieCastObject {
  character: string
  id: number
  name: string
}

export interface MovieCrewObject {
  department: string
  job: string
  id: number
  name: string
}

export interface MovieObject {
  id: number
  media_type: string
  vote_average: number
  vote_count: number
  date: string
  title: string

  genres: number[]

  credits?: number[]
  job?: (string | undefined)[]
  poster_path?: string
}

export interface BookmarkedMoviesObject {
  [id: number]: MovieObject
}

export interface GenreCountObject extends GenreObject {
  count: number
}
