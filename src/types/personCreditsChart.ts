export interface MovieObject {
  id: number
  popularity: number
  title: string
  release_date: string
}

export interface ChartSettings {
  nameId: number
  movieSearchData: MovieObject[]
  isBoth: boolean
  scales: {
    xScaleDomain: Date[]
    sizeScale: number[]
  }
}
