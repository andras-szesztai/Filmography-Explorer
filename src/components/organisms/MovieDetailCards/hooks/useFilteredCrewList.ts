import React from 'react'
import { useDebounce } from 'react-use'
import { MovieCrewObject } from '../../../../types/movie'
import { duration } from '../../../../styles/animation'

interface Params {
  crew: MovieCrewObject[]
}

const useFilteredCrewList = ({ crew }: Params) => {
  const [filteredCrew, setFilteredCrew] = React.useState(crew)
  const [crewInputText, setCrewInputText] = React.useState('')
  const [crewSearchText, setCrewSearchText] = React.useState('')
  useDebounce(
    () => {
      setCrewSearchText(crewInputText)
    },
    duration.sm,
    [crewInputText]
  )
  React.useEffect(() => {
    if (crewSearchText) {
      const filtered = crew.filter(
        d =>
          (d.job && d.job.toLowerCase().includes(crewSearchText.toLowerCase())) ||
          (d.name && d.name.toLowerCase().includes(crewSearchText.toLowerCase()))
      )
      setFilteredCrew(filtered)
    }
    if (!crewSearchText && filteredCrew.length !== crew.length) {
      setFilteredCrew(crew)
    }
  }, [crewSearchText, crew.length, filteredCrew.length])

  return { crewInputText, setCrewInputText, filteredCrew }
}

export default useFilteredCrewList
