import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'

// Components
import { DateAxis, BubbleChart, TitleSearch, GenreFilter, ChartSettings } from '../../molecules'

// Types
import { CombinedState } from '../../../types/state'

// Hooks
import { useUpdateChartSettings } from './hooks'

// Styles
import { space, colors, fontSize } from '../../../styles/variables'

const PersonCreditsChart = () => {
  const chartState = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const personDataSets = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const { activeMovieID } = useSelector((state: CombinedState) => state.movieReducer)
  // useUpdateChartSettings(personDataSets)
  const [isFirstEntered, setIsFirstEntered] = React.useState(true)
  const genreFilter = useSelector((state: CombinedState) => state.personCreditsChartReducer.genreFilter)

  // TODO finish up simplifying bubble chart and date axis
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        onMouseLeave={() => setIsFirstEntered(true)}
        css={css`
          height: 75%;
          background: ${colors.bgColorPrimary};
          width: calc(100% - ${space[13]}px);
          transform: translateY(${space[7]}px);
          border-radius: ${space[1]}px;
          display: grid;
          grid-template-rows: 50px auto;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;

            color: ${colors.textColorPrimary};
            background: ${colors.bgColorPrimary};
            font-size: ${fontSize.md};
            letter-spacing: 1px;

            position: relative;
            z-index: 100;
          `}
        >
          {!!chartState.nameId && (
            <>
              <TitleSearch titles={personDataSets.allTitles} isBookmarkChart={false} />
              <GenreFilter genres={personDataSets.genres} isBookmarkChart={false} />
              <ChartSettings />
            </>
          )}
        </div>
        {/* {!!chartState.nameId && (
          <div
            css={css`
              display: grid;
              grid-template-rows: 1fr 35px;
            `}
          >
            <BubbleChart
              xScaleDomain={chartState.scales.xScaleDomain}
              sizeScaleDomain={chartState.scales.sizeScaleDomain}
              isSizeDynamic={chartState.isSizeDynamic}
              data={chartState.dataSets.cast}
              activeMovieID={activeMovieID}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              hoveredMovieID={chartState.hoveredMovie.id}
              genreFilter={genreFilter}
              isBookmarkChart={false}
            />
            <DateAxis
              xScaleDomain={chartState.scales.xScaleDomain}
              dataSets={chartState.dataSets.cast}
              isBoth={chartState.isBoth}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              activeMovieID={activeMovieID}
              hoveredMovieID={chartState.hoveredMovie.id}
              genreFilter={genreFilter}
              tooltipWithRole
              isBookmarkChart={false}
            />
          </div>
        )} */}
      </div>
    </div>
  )
}

export default PersonCreditsChart
