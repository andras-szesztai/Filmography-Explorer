import React from 'react'
import { usePrevious } from 'react-use'
import { useSelector } from 'react-redux'

// Types
import { MovieObject } from '../../../../types/movie'
import { CombinedState } from '../../../../types/state'

interface Params {
  searchText: string
  isBookmarkChart: boolean
  titles: MovieObject[]
  personsFilter: number[]
}

const useUpdateFilteredTitles = ({ searchText, isBookmarkChart, titles, personsFilter }: Params) => {
  const personCreditsChartReducer = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const bookmarkedChartReducer = useSelector((state: CombinedState) => state.bookmarkedChartReducer)
  const genreFilter = isBookmarkChart ? bookmarkedChartReducer.genreFilter : personCreditsChartReducer.genreFilter
  const prevGenreFilter = usePrevious(genreFilter)
  const prevActiveNameID = usePrevious(personCreditsChartReducer.nameId)
  const prevSearchText = usePrevious(searchText)

  const prevPersonsFilter = usePrevious(personsFilter)
  const isInit = React.useRef(true)
  const [genreFilteredTitles, setGenreFilteredTitles] = React.useState([] as MovieObject[])
  const [filteredTitles, setFilteredTitles] = React.useState([] as MovieObject[])

  React.useEffect(() => {
    if (!searchText && !genreFilter.length && !genreFilteredTitles.length && !!titles.length && !personsFilter.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
    if (
      (prevGenreFilter && genreFilter.length !== prevGenreFilter.length) ||
      (isInit.current && genreFilter.length) ||
      (prevPersonsFilter && personsFilter.length !== prevPersonsFilter.length)
    ) {
      if (isInit.current) {
        isInit.current = false
      }
      const newArray = titles
        .filter(t => (genreFilter.length && t.genres ? t.genres.map(id => genreFilter.includes(id)).includes(true) : true))
        .filter(d => (personsFilter.length ? d.credits && d.credits.some(id => personsFilter.includes(id)) : true))
      setGenreFilteredTitles(newArray)
      setFilteredTitles(newArray)
    }
    if (typeof prevSearchText === 'string' && prevSearchText !== searchText) {
      setFilteredTitles(genreFilteredTitles.filter(t => t.title && t.title.toLowerCase().includes(searchText.toLowerCase())))
    }
    if (prevActiveNameID && personCreditsChartReducer.nameId && personCreditsChartReducer.nameId !== prevActiveNameID) {
      setGenreFilteredTitles([])
      setFilteredTitles([])
    }
    if (!genreFilter.length && !personsFilter.length && titles.length !== genreFilteredTitles.length) {
      setGenreFilteredTitles(titles)
      setFilteredTitles(titles)
    }
  }, [searchText, genreFilter.length, titles.length, personsFilter.length])

  return filteredTitles
}

export default useUpdateFilteredTitles
