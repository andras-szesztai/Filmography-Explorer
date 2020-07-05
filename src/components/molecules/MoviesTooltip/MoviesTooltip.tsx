import React from 'react'
import capitalize from 'lodash/capitalize'
import { AnimatePresence, motion } from 'framer-motion'
import numeral from 'numeral'
import { ScaleTime } from 'd3-scale'
import { useSelector } from 'react-redux'
import { css } from '@emotion/core'

// Components
import { Image } from '../../atoms'

// Types
import { CombinedState } from '../../../types/state'

// Style
import { width, space, colors, tooltipOffset, fontSize, fontWeight } from '../../../styles/variables'

interface Props {
  activeMovieID: number
  xScale: ScaleTime<number, number>
}

export default function MoviesTooltip({ activeMovieID, xScale }: Props) {
  const hoveredMovie = useSelector((state: CombinedState) => state.personCreditsChartReducer.hoveredMovie)
  if (!hoveredMovie.id) return null
  const { data, xPosition, yPosition } = hoveredMovie
  return (
    <div
      css={css`
        position: absolute;
        width: ${width.tooltipWidth}px;

        left: ${xPosition
          ? xScale(new Date(data.unified_date)) - width.tooltipWidth - tooltipOffset + 20
          : xScale(new Date(data.unified_date)) + tooltipOffset + 30}px;
        top: ${yPosition === 0 && 0}px;
        bottom: ${yPosition === 1 && 0}px;

        z-index: 4;
        pointer-events: none;

        padding: ${space[2]}px;

        border-radius: ${space[1]}px;
        background-color: ${colors.bgColorPrimary};

        display: grid;
        grid-template-columns: minmax(105px, min-content) 1fr;
        grid-column-gap: 12px;
      `}
    >
      <Image url={data.poster_path} alt={`${data.title || data.name}-poster`} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;

          .title {
            font-size: ${fontSize.sm};
            font-weight: ${fontWeight.lg};
            color: ${colors.textColorSecondary};
          }

          .section {
            margin-top: ${space[1]}px;
            font-size: ${fontSize.sm};
            font-weight: ${fontWeight.lg};
            color: ${colors.textColorSecondary};

            span {
              font-weight: ${fontWeight.lg};
            }
          }

          .score {
            width: 100%;
            height: 16px;
            margin-top: 6px;
            margin-bottom: 1px;
            position: relative;
          }
        `}
      >
        <div className="title">{data.title || data.name}</div>
        <div className="section">
          Release year: <span>{data.unified_year}</span>
        </div>
        <div className="section">
          Media type: <span>{capitalize(data.media_type)}</span>
        </div>
        <div className="section">
          {data.character ? 'Character' : 'Job'}: <span>{data.job && (data.job.filter(Boolean).length ? data.job.join(', ') : 'N/A')}</span>
        </div>
        <div className="section">
          <div>
            User score:{' '}
            <span>
              {numeral(data.vote_average).format('0.0')} &nbsp;
              <span>
                ({numeral(data.vote_count).format('0,0')} vote
                {data.vote_count > 1 ? 's' : ''})
              </span>
            </span>
          </div>
        </div>
        <div className="section score">
          <div
            style={{
              position: 'absolute',
              width: `${data.vote_average * 10}%`,
              height: '100%',
              backgroundColor: 'red',
              borderRadius: 2
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: `1px solid red`,
              borderRadius: 2
            }}
          />
        </div>
        <AnimatePresence>
          {activeMovieID !== hoveredMovie.id && (
            <motion.div className="section hint" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Click<span> to explore the {data.media_type}!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
