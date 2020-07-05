import React from 'react'
import { usePrevious } from 'react-use'

// Utils
import { showRefElements } from '../functions/elementFunctions'

// Types
import { AxisStoredValues } from '../../../../../types/chart'

interface Params {
  storedValues: {
    current: AxisStoredValues
  }
  height: number
  activeMovieID: number
  addUpdateInteractions: () => void
}

export default function useSelectedUpdate({ storedValues, activeMovieID, height, addUpdateInteractions }: Params) {
  const prevActiveMovieID = usePrevious(activeMovieID)
  React.useEffect(() => {
    if (!storedValues.current.isInit && activeMovieID !== prevActiveMovieID) {
      const { hoverElementArea, voronoiArea } = storedValues.current
      showRefElements({
        storedValues,
        activeMovieID,
        height
      })
      if (!activeMovieID) {
        hoverElementArea.selectAll('.selected-circle').attr('opacity', 0)
        hoverElementArea.selectAll('.selected-line').attr('opacity', 0)
        voronoiArea.selectAll('.voronoi-path').attr('cursor', 'pointer')
      }
      addUpdateInteractions()
    }
  })
}
