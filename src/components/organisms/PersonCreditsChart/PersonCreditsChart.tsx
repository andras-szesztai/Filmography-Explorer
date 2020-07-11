import React from 'react'
import { css } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'

// Components
import { DateAxis, BubbleChart, TitleSearch, GenreFilter } from '../../molecules'

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
  useUpdateChartSettings(personDataSets)
  const [isFirstEntered, setIsFirstEntered] = React.useState(true)
  const genreFilter = useSelector((state: CombinedState) => state.personCreditsChartReducer.genreFilter)

  const isCastMain = personDataSets.credits.cast.length >= personDataSets.credits.crew.length

  const [isGenreOpen, setIsGenreOpen] = React.useState(false)
  const [isTitleOpen, setIsTitleOpen] = React.useState(false)

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
          height: 80%;
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
          <TitleSearch
            titles={personDataSets.allTitles}
            setIsGenreOpen={setIsGenreOpen}
            setIsTitleOpen={setIsTitleOpen}
            isTitleOpen={isTitleOpen}
          />
          <GenreFilter
            genres={personDataSets.genres}
            setIsTitleOpen={setIsTitleOpen}
            setIsGenreOpen={setIsGenreOpen}
            isGenreOpen={isGenreOpen}
          />
        </div>
        {!!chartState.nameId && (
          <div
            key={chartState.nameId}
            css={css`
              display: grid;
              grid-template-rows: ${chartState.isBoth ? '1fr 35px 1fr' : '1fr 35px'};
            `}
          >
            <BubbleChart
              xScaleDomain={chartState.scales.xScaleDomain}
              sizeScaleDomain={chartState.scales.sizeScaleDomain}
              isYDomainSynced={chartState.isYDomainSynced}
              isSizeDynamic={chartState.isSizeDynamic}
              data={
                personDataSets.credits.cast.length >= personDataSets.credits.crew.length
                  ? personDataSets.credits.cast
                  : personDataSets.credits.crew
              }
              activeMovieID={activeMovieID}
              type="main" // Can be isMain
              title={isCastMain ? 'cast' : 'crew'}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              tooltipYPosition={chartState.isBoth ? 0 : 1}
              hoveredMovieID={chartState.hoveredMovie.id}
              genreFilter={genreFilter}
            />
            <DateAxis
              xScaleDomain={chartState.scales.xScaleDomain}
              dataSets={personDataSets.credits}
              isBoth={chartState.isBoth}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              activeMovieID={activeMovieID}
              hoveredMovieID={chartState.hoveredMovie.id}
              genreFilter={genreFilter}
            />
            {chartState.isBoth && (
              <BubbleChart
                xScaleDomain={chartState.scales.xScaleDomain}
                sizeScaleDomain={chartState.scales.sizeScaleDomain}
                isYDomainSynced={chartState.isYDomainSynced}
                isSizeDynamic={chartState.isSizeDynamic}
                data={isCastMain ? personDataSets.credits.crew : personDataSets.credits.cast}
                title={isCastMain ? 'crew' : 'cast'}
                activeMovieID={activeMovieID}
                type="sub"
                isFirstEntered={isFirstEntered}
                setIsFirstEntered={setIsFirstEntered}
                tooltipYPosition={1}
                hoveredMovieID={chartState.hoveredMovie.id}
                genreFilter={genreFilter}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonCreditsChart
