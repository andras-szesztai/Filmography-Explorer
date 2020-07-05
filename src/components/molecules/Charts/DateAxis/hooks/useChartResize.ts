import { useEffect } from 'react'
import { usePrevious } from 'react-use'

import { Margin, AxisStoredValues } from '../../../../../types/chart'
import { VoronoiParams } from '../functions/elementFunctions'

interface Params {
  width: number
  margin: Margin
  storedValues: { current: AxisStoredValues }
  runElementUpdate: () => void
}

export default function useChartResize({ width, storedValues, margin, runElementUpdate }: Params) {
  const prevWidth = usePrevious(width)
  useEffect(() => {
    if (!storedValues.current.isInit && width !== prevWidth) {
      const { xScale } = storedValues.current
      xScale.range([0, width - margin.left - margin.right])
      // eslint-disable-next-line no-param-reassign
      storedValues.current.xScale = xScale
      runElementUpdate()
    }
  }, [width])
}
