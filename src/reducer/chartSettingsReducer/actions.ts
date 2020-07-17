export const TOGGLE_IS_Y_AXIS_SYNCED = 'TOGGLE_IS_Y_AXIS_SYNCED'

export function toggleIsYAxisSynced() {
  return {
    type: TOGGLE_IS_Y_AXIS_SYNCED
  } as const
}
