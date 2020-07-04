import { ChartSettings } from '../../types/personCreditsChart'

export const UPDATE_CHART_SETTINGS = 'UPDATE_CHART_SETTINGS'
export const SET_IS_Y_DOMAIN_SYNCED = 'SET_IS_Y_DOMAIN_SYNCED'
export const SET_IS_SIZE_DYNAMIC = 'SET_IS_SIZE_DYNAMIC'
export const SET_HOVERED_MOVIE = 'SET_HOVERED_MOVIE'
export const SET_SELECTED_MOVIE = 'SET_HOVERED_MOVIE'

export function updateChartSettings(settings: ChartSettings) {
  return {
    type: UPDATE_CHART_SETTINGS,
    settings
  } as const
}
