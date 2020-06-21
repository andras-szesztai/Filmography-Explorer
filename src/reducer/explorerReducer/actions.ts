export const SET_NAME_ACTIVE_ID = 'SET_NAME_ACTIVE_ID'
export const FETCH_NAME_INFO_BY_ID = 'FETCH_NAME_INFO_BY_ID'
export const FETCH_NAME_INFO_BY_ID_SUCCESS = 'FETCH_NAME_INFO_BY_ID_SUCCESS'
export const FETCH_NAME_INFO_BY_ID_FAIL = 'FETCH_NAME_INFO_BY_ID_FAIL'
export const OPEN_PERSON_DETAILS_CARD = 'OPEN_PERSON_DETAILS_CARD'
export const CLOSE_PERSON_DETAILS_CARD = 'CLOSE_PERSON_DETAILS_CARD'

export function setActiveNameID(id: number, isActiveMovieClicked?: boolean) {
  return {
    type: SET_NAME_ACTIVE_ID,
    payload: {
      id,
      isActiveMovieClicked
    }
  }
}
