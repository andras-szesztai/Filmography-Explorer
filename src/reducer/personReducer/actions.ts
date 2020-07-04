import { PersonDetails, FormattedPersonCreditDataObject, FavoritePersonsObject } from '../../types/person'

export const SET_ACTIVE_NAME_ID = 'SET_ACTIVE_NAME_ID'
export const FETCH_NAME_CREDITS_BY_ID = 'FETCH_NAME_CREDITS_BY_ID'
export const FETCH_NAME_CREDITS_BY_ID_SUCCESS = 'FETCH_NAME_CREDITS_BY_ID_SUCCESS'
export const FETCH_NAME_CREDITS_BY_ID_FAIL = 'FETCH_NAME_CREDITS_BY_ID_FAIL'
export const UPDATE_FAVORITE_PERSONS = 'UPDATE_FAVORITE_PERSONS'

export function setActiveNameID(id: number) {
  return {
    type: SET_ACTIVE_NAME_ID,
    id
  } as const
}

export function fetchNameCredits() {
  return {
    type: FETCH_NAME_CREDITS_BY_ID
  } as const
}

interface Data {
  details: PersonDetails[]
  credits: {
    cast: FormattedPersonCreditDataObject[]
    crew: FormattedPersonCreditDataObject[]
  }
}

export function fetchNameCreditsSuccess(data: Data) {
  return {
    type: FETCH_NAME_CREDITS_BY_ID_SUCCESS,
    data
  } as const
}

export function fetchNameCreditsFail() {
  return {
    type: FETCH_NAME_CREDITS_BY_ID_FAIL
  } as const
}

export function updateFavoritePersons(favoritesObject: FavoritePersonsObject) {
  return {
    type: UPDATE_FAVORITE_PERSONS,
    favoritesObject
  } as const
}
