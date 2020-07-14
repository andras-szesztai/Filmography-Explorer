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
import { width, space, height, colors, tooltipOffset, fontSize, fontWeight, dropShadow } from '../../../styles/variables'
import { ScrollableContainerStyle } from '../../organisms/FavoritePersonsList/style'
import { containerStyle, infoSectionStyle } from './styles'

interface Props {
  activeMovieID: number
  xScale: ScaleTime<number, number>
  withRole: boolean
  isBookmarkChart: boolean
}

export default function MoviesTooltip({ activeMovieID, xScale, withRole, isBookmarkChart }: Props) {
  const { personCreditsChartReducer, bookmarkedChartReducer } = useSelector((state: CombinedState) => state)
  const hovered = isBookmarkChart ? bookmarkedChartReducer.bookmarkedHoveredMovie : personCreditsChartReducer.hoveredMovie
  if (!hovered.id || !xScale) return null
  const { data, xPosition, yPosition } = hovered
  const xPos = xScale(new Date(data.date))
  return (
    <div
      css={css`
        ${containerStyle}
        left: ${xPosition ? xPos - width.tooltipWidth - tooltipOffset + 28 : xPos + tooltipOffset + 35}px;
        top: ${yPosition === 0 && 0}px;
        bottom: ${yPosition === 1 && 0}px;
        filter: drop-shadow(${dropShadow.header.ternary});
      `}
    >
      <div
        css={css`
          height: ${height.tooltip}px;
          overflow: hidden;
          border-radius: ${space[1]}px;
        `}
      >
        <Image url={data.poster_path} alt={`${data.title || data.title}-poster`} />
      </div>
      <div css={infoSectionStyle}>
        <div
          css={css`
            font-size: ${fontSize.md};
            font-weight: ${fontWeight.lg};
            color: ${colors.textColorSecondary};
            letter-spacing: 0.6px;
          `}
        >
          {data.title || data.title}
        </div>
        <div className="section">
          Release year: <span>{data.date}</span>
        </div>
        <div className="section">
          Media type: <span>{capitalize(data.media_type)}</span>
        </div>
        {withRole && (
          <div className="section">
            Role: <span>{data.job && (data.job.filter(Boolean).length ? data.job.join(', ') : 'N/A')}</span>
          </div>
        )}
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
        <div
          className="section"
          css={css`
            height: ${space[4]}px;
            position: relative;
          `}
        >
          <div
            css={css`
              ${ScrollableContainerStyle}
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 2px;
            `}
          />
          <div
            css={css`
              position: absolute;
              width: ${data.vote_average * 10}%;
              height: 100%;
              background-color: ${colors.textColorSecondary};
              border-radius: 2px 0 0 2px;
            `}
          />
        </div>
        <AnimatePresence>
          {activeMovieID !== hovered.id && (
            <motion.div className="section hint" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Click<span> to explore!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
