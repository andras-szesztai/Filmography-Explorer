export interface Person {
  id: number
  name: string
}

export interface PersonDetails extends Person {
  birthday: string
  place_of_birth: string
  deathday?: string
  known_for_department: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  profile_path: string
  imdb_id: string
  homepage?: string
}

export interface PersonCreditDataObject extends Person {
  release_date: string
  first_air_date: string
  popularity: number
  vote_count: number
  vote_average: number
  title: string
  character?: string
  job?: string
  genre_ids: number[]
  original_title: string
  original_name: string
  media_type: string
  poster_path: string
}

export interface FormattedPersonCreditDataObject extends Person {
  id: number
  name: string
  release_date: string
  first_air_date: string
  unified_date: string
  unified_year: string
  vote_count: number
  vote_average: number
  title: string
  character?: string | undefined
  job?: (string | undefined)[]
  genre_ids: number[]
  poster_path: string
  original_title: string
  media_type: string
}

export interface PersonGenresObject {
  id: number
  count: number
}

export interface PersonCredits {
  cast: FormattedPersonCreditDataObject[]
  crew: FormattedPersonCreditDataObject[]
}

export interface PersonDataSets {
  details?: PersonDetails
  credits: PersonCredits
}

export interface FavoritePersonsObject {
  [id: number]: {
    name: string
    id: number
    credits: number[]
  }
}
