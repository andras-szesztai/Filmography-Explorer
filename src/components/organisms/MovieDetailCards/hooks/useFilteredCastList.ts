import React from 'react'
import { useDebounce } from 'react-use'
import { MovieCastObject } from '../../../../types/movie'
import { duration } from '../../../../styles/animation'

interface Params {
  cast: MovieCastObject[]
}

const useFilteredCastList = ({ cast }: Params) => {
  const [filteredCast, setFilteredCast] = React.useState(cast)
  const [castInputText, setCastInputText] = React.useState('')
  const [castSearchText, setCastSearchText] = React.useState('')
  useDebounce(
    () => {
      setCastSearchText(castInputText)
    },
    duration.sm,
    [castInputText]
  )
  React.useEffect(() => {
    if (castSearchText) {
      const filtered = cast.filter(
        d =>
          (d.character && d.character.toLowerCase().includes(castSearchText.toLowerCase())) ||
          (d.name && d.name.toLowerCase().includes(castSearchText.toLowerCase()))
      )
      setFilteredCast(filtered)
    }
    if (!castSearchText && filteredCast.length !== cast.length) {
      setFilteredCast(cast)
    }
  }, [castSearchText, cast.length, filteredCast.length])

  return { castInputText, setCastInputText, filteredCast }
}

export default useFilteredCastList
