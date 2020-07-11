import React from 'react'
import { usePrevious } from 'react-use'

// Utils
import { createBubbleChartRefElements } from '../functions/elementFunctions'

// Types
import { BubbleChartStoredValues } from '../../../../../types/chart'
import { MovieObject } from '../../../../../types/movie'

interface Params {
  height: number
  storedValues: { current: BubbleChartStoredValues }
  type: string
  isSizeDynamic: boolean
  data: MovieObject[]
  activeMovieID: number
}

export default function useActiveMovieIDUpdate({ storedValues, activeMovieID, isSizeDynamic, type, height, data }: Params) {
  const prevActiveMovieID = usePrevious(activeMovieID)
  React.useEffect(() => {
    if (!storedValues.current.isInit && activeMovieID !== prevActiveMovieID) {
      const { chartArea } = storedValues.current
      chartArea.select('.selected-circle').remove()
      chartArea.select('.selected-line').remove()
      chartArea.select('.hovered-circle').remove()
      chartArea.select('.hovered-line').remove()
      createBubbleChartRefElements({
        data,
        activeMovieID,
        storedValues,
        type,
        isSizeDynamic,
        height
      })
    }
  })
}
