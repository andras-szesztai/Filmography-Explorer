export interface GenreObject {
  id: number
  name: string
}

export interface ActiveMovieDataObject {
  id: number
  details: MovieDetails
  position: number
  cast: MovieCastObject[]
  crew: MovieCrewObject[]
}

export interface MovieDetails {
  budget: number
  genres: GenreObject[]
  homepage?: string
  id: number
  imdb_id?: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  vote_average: number
  vote_count: number
  tagline: string
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

export interface SavedMovieObject {
  [id: number]: {
    id: number
    title: string
    genreIDs: number[]
    castIDs: number[]
    crewIDs: number[]
    poster_path?: string
    vote_average: number
    vote_count: number
    original_title: string
  }
}
