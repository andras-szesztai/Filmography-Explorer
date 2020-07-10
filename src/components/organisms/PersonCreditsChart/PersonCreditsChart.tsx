import React from 'react'
import { css } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'

// Components
import useWhatInput from 'react-use-what-input'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle } from 'react-icons/io'
import { DateAxis, BubbleChart, SelectableListItem } from '../../molecules'

import { updateGenreFilter } from '../../../reducer/personCreditsChartReducer/actions'

// Types
import { CombinedState } from '../../../types/state'

// Hooks
import { useUpdateChartSettings } from './hooks'

// Styles
import { space, colors, fontSize, buttonPadding, buttonNoFocus, buttonFocus, fontWeight } from '../../../styles/variables'
import { horizontalScrollableStyle } from '../MovieDetailCards/styles'

const PersonCreditsChart = () => {
  const chartState = useSelector((state: CombinedState) => state.personCreditsChartReducer)
  const personDataSets = useSelector((state: CombinedState) => state.personReducer.dataSets)
  const { activeMovieID, genres } = useSelector((state: CombinedState) => state.movieReducer)
  useUpdateChartSettings(personDataSets)
  const dispatch = useDispatch()
  const [isFirstEntered, setIsFirstEntered] = React.useState(true)

  const isCastMain = personDataSets.credits.cast.length >= personDataSets.credits.crew.length

  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
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
          <button
            type="button"
            onMouseOver={() => setIsHovered(true)}
            onFocus={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onBlur={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            onKeyDown={({ keyCode }) => {
              if (keyCode === 13) {
                setIsClicked(!isClicked)
              }
            }}
            css={css`
              ${buttonPadding}
              background: ${colors.bgColorSecondary};
              border: none;
              cursor: pointer;
              letter-spacing:  .8px;
              display: flex;
              align-items: center;

              font-weight: ${fontWeight.sm};
              user-select: none;
              border-radius: ${space[1]}px;
              ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
            `}
          >
            <motion.span animate={{ scale: isHovered ? 1.3 : 1 }}>
              <FaFilter size={12} />
            </motion.span>
            <span
              css={css`
                margin-left: ${space[2]}px;
              `}
            >
              Filter for genres
            </span>
          </button>
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ y: 35, opacity: 0, height: 0, padding: `0px ${space[3]}px` }}
                animate={{ opacity: 1, height: space[16], padding: `${space[2]}px ${space[3]}px` }}
                exit={{ opacity: 0, height: 10, padding: `0px ${space[3]}px` }}
                css={css`
                  z-index: 10;
                  position: absolute;

                  display: grid;
                  grid-template-rows: 25px 1fr;
                  grid-row-gap: ${space[1]}px;

                  background: ${colors.bgColorSecondary};
                  width: 100%;
                  border-radius: ${space[1]}px;
                  color: ${colors.textColorSecondary};
                `}
              >
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <span
                    css={css`
                      transform: translateY(2px);
                    `}
                  >
                    Genres
                  </span>
                  <AnimatePresence>
                    {chartState.genreFilter.length && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        css={css`
                          height: 20px;
                          align-self: flex-start;
                          margin-left: ${space[2]}px;
                        `}
                      >
                        <SelectableListItem
                          handleSelect={() => dispatch(updateGenreFilter([]))}
                          icon={IoIosCloseCircle}
                          iconSize={18}
                          text="Reset selection"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  css={css`
                    ${horizontalScrollableStyle}
                  `}
                >
                  {personDataSets.genres.map(genre => (
                    <SelectableListItem
                      icon={FaFilter}
                      iconSize={12}
                      text={`${genres.data.find(g => g.id === genre.id)?.name} (${genre.count})`}
                      handleSelect={() => {
                        if (chartState.genreFilter.includes(genre.id)) {
                          dispatch(updateGenreFilter(chartState.genreFilter.filter(id => id !== genre.id)))
                        } else if (chartState.genreFilter.length === personDataSets.genres.length) {
                          dispatch(updateGenreFilter([]))
                        } else {
                          dispatch(updateGenreFilter([...chartState.genreFilter, genre.id]))
                        }
                      }}
                      isActive={chartState.genreFilter.length ? chartState.genreFilter.includes(genre.id) : true}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            />
            <DateAxis
              xScaleDomain={chartState.scales.xScaleDomain}
              dataSets={personDataSets.credits}
              isBoth={chartState.isBoth}
              isFirstEntered={isFirstEntered}
              setIsFirstEntered={setIsFirstEntered}
              activeMovieID={activeMovieID}
              hoveredMovieID={chartState.hoveredMovie.id}
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
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonCreditsChart
