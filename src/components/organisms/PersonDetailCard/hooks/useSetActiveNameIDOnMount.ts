import React from 'react'
import last from 'lodash/last'
import { useDispatch } from 'react-redux'

// Actions
import { setActiveNameID, updateFavoritePersons } from '../../../../reducer/personReducer/actions'

// Types
import { FavoritePersonsObject } from '../../../../types/person'

interface Params {
  favoritePersons?: FavoritePersonsObject
  isPopulated: boolean
}

function useSetActiveNameIDOnMount({ favoritePersons, isPopulated }: Params) {
  const dispatch = useDispatch()
  const init = React.useRef(true)
  React.useEffect(() => {
    if (init.current) {
      init.current = false
      if (favoritePersons && Object.keys(favoritePersons).length) {
        const lastID = last(Object.keys(favoritePersons))
        if (lastID) {
          dispatch(setActiveNameID(+lastID))
          if (!isPopulated) {
            dispatch(updateFavoritePersons(favoritePersons))
          }
        }
      }
    }
  })
}

export default useSetActiveNameIDOnMount
