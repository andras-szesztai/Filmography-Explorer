export interface Person {
  id: number
  name: string
}

export interface PersonCreditDataObject extends Person {
  character: string
  job: string
  release_date: string
  first_air_date: string
  vote_count: number
  vote_average: number
  title: string
}
