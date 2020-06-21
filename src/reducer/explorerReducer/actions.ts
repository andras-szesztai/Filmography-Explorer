export const SET_ACTIVE_NAME_ID = 'SET_ACTIVE_NAME_ID'
export const FETCH_NAME_CREDITS_BY_ID = 'FETCH_NAME_CREDITS_BY_ID'
export const FETCH_NAME_CREDITS_BY_ID_SUCCESS = 'FETCH_NAME_CREDITS_BY_ID_SUCCESS'
export const FETCH_NAME_CREDITS_BY_ID_FAIL = 'FETCH_NAME_CREDITS_BY_ID_FAIL'
export const OPEN_PERSON_DETAILS_CARD = 'OPEN_PERSON_DETAILS_CARD'
export const CLOSE_PERSON_DETAILS_CARD = 'CLOSE_PERSON_DETAILS_CARD'

export function setActiveNameID(id: number) {
  return {
    type: SET_ACTIVE_NAME_ID,
    payload: id
  }
}

export type Action = ReturnType<typeof setActiveNameID>
