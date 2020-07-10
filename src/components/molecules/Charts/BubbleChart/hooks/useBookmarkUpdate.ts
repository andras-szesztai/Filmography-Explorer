import { useEffect } from 'react'
import 'd3-transition'
import { usePrevious } from 'react-use'
import { easeCubicInOut } from 'd3-ease'

// Types
import { BubbleChartStoredValues } from '../../../../../types/chart'
import { BookmarkedMoviesObject } from '../../../../../types/movie'

// Styles
import { duration } from '../../../../../styles/animation'
import { colors } from '../../../../../styles/variables'

interface Params {
  storedValues: { current: BubbleChartStoredValues }
  bookmarks: BookmarkedMoviesObject
}

export default function useBookmarkUpdate({ storedValues, bookmarks }: Params) {
  const prevBookmarks = usePrevious(bookmarks)
  const currIDs = bookmarks ? Object.keys(bookmarks) : []
  const prevIDs = prevBookmarks ? Object.keys(prevBookmarks) : []
  const { isInit, chartArea } = storedValues.current
  useEffect(() => {
    if (!isInit && currIDs.length !== prevIDs.length) {
      chartArea
        .selectAll('.main-circle .circle')
        .transition()
        .duration(duration.sm)
        .ease(easeCubicInOut)
        .attr('fill', (d: any) => (currIDs.includes(d.id.toString()) ? colors.accentSecondary : colors.bgColorPrimaryLight))
        .attr('stroke', (d: any) => (currIDs.includes(d.id.toString()) ? colors.accentSecondary : colors.bgColorSecondary))
    }
  }, [chartArea, isInit, bookmarks])
}
