import React from 'react'
import first from 'lodash/first'
import { useDispatch } from 'react-redux'

// Actions
import { setActiveNameID, updateFavoritePersons } from '../../../../reducer/personReducer/actions'

// Types
import { FavoritePersonsObject } from '../../../../types/person'

interface Params {
  favoritePersons?: FavoritePersonsObject
  isPopulated: boolean
  activeNameID: number
}

function useSetActiveNameIDOnMount({ favoritePersons, isPopulated, activeNameID }: Params) {
  const dispatch = useDispatch()
  const init = React.useRef(true)
  React.useEffect(() => {
    if (init.current) {
      init.current = false
      if (!activeNameID && favoritePersons && Object.keys(favoritePersons).length) {
        const lastFavorited = first(
          Object.values(favoritePersons).sort((a, b) => new Date(b.dateFavorited).getTime() - new Date(a.dateFavorited).getTime())
        )
        if (lastFavorited && lastFavorited.id) {
          dispatch(setActiveNameID(+lastFavorited.id))
          if (!isPopulated) {
            dispatch(updateFavoritePersons(favoritePersons))
          }
        }
      }
    }
  })
}

export default useSetActiveNameIDOnMount
