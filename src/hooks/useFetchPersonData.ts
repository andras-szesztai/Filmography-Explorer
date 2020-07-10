import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePrevious } from 'react-use'
import axios from 'axios'
import { sortBy, flattenDeep, uniq } from 'lodash'

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
            dispatch(
              fetchNameCreditsSuccess({
                details: details.data,
                credits: {
                  cast: makeUniqData({ data: filteredCast, type: 'cast' }),
                  crew: makeUniqData({ data: filteredCrew, type: 'crew' })
                },
                genres: sortedGenres
              })
            )
          })
        )
        .catch(() => dispatch(fetchNameCreditsFail()))
    }
  }, [activeNameID])
}

export default useFetchPersonData
