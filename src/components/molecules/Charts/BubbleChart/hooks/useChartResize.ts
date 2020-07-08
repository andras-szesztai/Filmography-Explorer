import { useEffect } from 'react'
import { usePrevious } from 'react-use'

// Types
import { Margin, BubbleChartStoredValues } from '../../../../../types/chart'
import { getSelectedLineYPos } from '../../DateAxis/functions/elementFunctions'

interface Param {
  width: number
  height: number
  margin: Margin
  storedValues: { current: BubbleChartStoredValues }
  type: string
  isSizeDynamic: boolean
  updateVoronoi: () => void
}

export default function useChartResize({ width, height, storedValues, margin, type, isSizeDynamic, updateVoronoi }: Param) {
  const prevDims = usePrevious({ width, height })
  useEffect(() => {
    if (!storedValues.current.isInit && prevDims && (width !== prevDims.width || height !== prevDims.height)) {
      const { xScale, yScale, chartArea, gridArea, sizeScale } = storedValues.current
      xScale.range([0, width - margin.left - margin.right])
      yScale.range([height - margin.top - margin.bottom, 0])
      // eslint-disable-next-line no-param-reassign
      storedValues.current = {
        ...storedValues.current,
        xScale,
        yScale
      }
      const setX = (d: any) => xScale(new Date(d.unified_date))
      chartArea
        .selectAll('.main-circle')
        .selectAll('circle')
        .attr('cx', setX)
        .attr('cy', (d: any) => yScale(d.vote_average))
      chartArea
        .select('.selected-line')
        .attr('x1', setX)
        .attr('x2', setX)
        .attr('y1', d =>
          getSelectedLineYPos({
            data: d,
            yScale,
            sizeScale,
            isSizeDynamic,
            type
          })
        )
        .attr('y2', type === 'main' ? height : -height)
      gridArea
        .selectAll('.grid-line')
        .attr('x2', width)
        .attr('y1', (d: any) => yScale(d))
        .attr('y2', (d: any) => yScale(d))
      gridArea
        .selectAll('.grid-text')
        .attr('x', width - margin.left)
        .attr('y', (d: any) => yScale(d))
      updateVoronoi()
    }
  }, [width, height])
}
