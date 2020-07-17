import { TOGGLE_IS_Y_AXIS_SYNCED, toggleIsYAxisSynced } from './actions'
import { ChartSettingsReducer } from '../../types/state'

const initialState = {
  isYAxisSynced: true
}

type Action = ReturnType<typeof toggleIsYAxisSynced>

const chartSettingsReducer = (state: ChartSettingsReducer = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLE_IS_Y_AXIS_SYNCED:
      return {
        isYAxisSynced: !state.isYAxisSynced
      }
    default:
      return state
  }
}

export default chartSettingsReducer
