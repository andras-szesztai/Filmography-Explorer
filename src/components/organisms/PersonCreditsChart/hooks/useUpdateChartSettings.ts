/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { useDispatch } from 'react-redux'
import { usePrevious } from 'react-use'
import { isEqual, uniqBy, maxBy, minBy } from 'lodash'

import { PersonDataSets } from '../../../../types/person'
import { updateChartSettings } from '../../../../reducer/personCreditsChartReducer/actions'

const useUpdateChartSettings = (personDataSets: PersonDataSets) => {
  const dispatch = useDispatch()
  const prevPersonDetails = usePrevious(personDataSets.details)
  React.useEffect(() => {
    if (prevPersonDetails && !isEqual(personDataSets.details, prevPersonDetails)) {
      const movieSearchData = uniqBy([...personDataSets.credits.cast, ...personDataSets.credits.crew], 'id')
      const xScaleMax = maxBy(movieSearchData, d => new Date(d.unified_date))
      const xScaleMin = minBy(movieSearchData, d => new Date(d.unified_date))
      const xScaleDomain = [
        (xScaleMin && new Date(xScaleMin.unified_date)) || new Date(),
        (xScaleMax && new Date(xScaleMax.unified_date)) || new Date()
      ]
      const sizeMax = maxBy(movieSearchData, d => d.vote_count)
      const sizeMin = minBy(movieSearchData, d => d.vote_count)
      const sizeScaleDomain = [(sizeMin && sizeMin.vote_count) || 0, (sizeMax && sizeMax.vote_count) || 0]
      const isBoth = !!(personDataSets.credits.cast.length && personDataSets.credits.crew.length)
      if (personDataSets.details) {
        dispatch(
          updateChartSettings({
            nameId: personDataSets.details.id,
            movieSearchData,
            isBoth,
            scales: {
              xScaleDomain,
              sizeScaleDomain
            },
            dataSets: {
              crew: personDataSets.credits.crew.map(d => ({
                id: d.id,
                media_type: d.media_type,
                vote_average: d.vote_average,
                vote_count: d.vote_count,

                genres: d.genre_ids,

                job: d.job,
                title: d.title || d.name,
                date: d.first_air_date || d.release_date,
                poster_path: d.poster_path
              })),
              cast: personDataSets.credits.cast.map(d => ({
                id: d.id,
                media_type: d.media_type,
                vote_average: d.vote_average,
                vote_count: d.vote_count,

                genres: d.genre_ids,

                job: d.job,
                title: d.title || d.name,
                date: d.first_air_date || d.release_date,
                poster_path: d.poster_path
              }))
            }
          })
        )
      }
    }
  }, [personDataSets.details])
}

export default useUpdateChartSettings
