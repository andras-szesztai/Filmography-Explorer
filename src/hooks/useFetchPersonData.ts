/* eslint-disable @typescript-eslint/camelcase */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePrevious } from 'react-use'
import axios from 'axios'
import { sortBy, flattenDeep, uniq, uniqBy } from 'lodash'

// Actions
import { fetchNameCredits, fetchNameCreditsSuccess, fetchNameCreditsFail } from '../reducer/personReducer/actions'

// Constants
import { API_ROOT } from '../constants/url'

// Helpers
import { makeFilteredData, makeUniqData } from '../utils/dataHelpers'

interface Props {
  activeNameID: number
}

const useFetchPersonData = ({ activeNameID }: Props) => {
  const dispatch = useDispatch()
  const prevActiveNameID = usePrevious(activeNameID)

  useEffect(() => {
    if (typeof prevActiveNameID === 'number' && activeNameID !== prevActiveNameID) {
      dispatch(fetchNameCredits())
      axios
        .all([
          axios.get(`${API_ROOT}/person/${activeNameID}?api_key=${process.env.MDB_API_KEY}&language=en-US`),
          axios.get(`${API_ROOT}/person/${activeNameID}/combined_credits?api_key=${process.env.MDB_API_KEY}&language=en-US`)
        ])
        .then(
          axios.spread((details, credits) => {
            const filteredCast = makeFilteredData({ data: credits.data.cast, type: 'cast' })
            const filteredCrew = makeFilteredData({ data: credits.data.crew, type: 'crew' })

            const allGenres = flattenDeep([...filteredCast, ...filteredCrew].map(d => d.genre_ids))
            const uniqGenres = uniq(allGenres)
            const genreCount = uniqGenres.map(id => ({ id, count: allGenres.filter(d => d === id).length }))
            const sortedGenres = sortBy(genreCount, o => -o.count)
            const cast = makeUniqData({ data: filteredCast, type: 'cast' })
            const crew = makeUniqData({ data: filteredCrew, type: 'crew' })
            dispatch(
              fetchNameCreditsSuccess({
                details: details.data,
                credits: {
                  cast,
                  crew
                },
                genres: sortedGenres,
                allTitles: sortBy(
                  uniqBy(
                    [...cast, ...crew].map(t => ({
                      id: t.id,
                      original_title: t.original_title,
                      original_name: t.original_name,
                      unified_date: t.first_air_date || t.release_date,
                      media_type: t.media_type,
                      vote_average: t.vote_average,
                      vote_count: t.vote_count,
                      genres: t.genre_ids,
                      poster_path: t.poster_path
                    })),
                    'id'
                  ),
                  t => new Date(t.unified_date)
                )
              })
            )
          })
        )
        .catch(() => dispatch(fetchNameCreditsFail()))
    }
  }, [activeNameID])
}

export default useFetchPersonData
