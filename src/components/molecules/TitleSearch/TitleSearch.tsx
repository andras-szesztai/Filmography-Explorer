import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import { css } from '@emotion/core'

import { CombinedState } from '../../../types/state'
import { FormattedPersonCreditDataObject } from '../../../types/person'
import { buttonPadding, colors, fontWeight, space, buttonNoFocus, buttonFocus, buttonStyle } from '../../../styles/variables'
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { updateGenreFilter } from '../../../reducer/personCreditsChartReducer/actions'
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'

interface TitleObject {
  id: number
  title: string
  date: string
}

interface Props {
  titles: TitleObject[]
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTitleOpen: boolean
}

const TitleSearch = ({ titles, setIsTitleOpen, isTitleOpen, setIsGenreOpen }: Props) => {
  console.log('TitleSearch -> titles', titles)
  const genreList = useSelector((state: CombinedState) => state.movieReducer.genres.data)
  const genreFilter = useSelector((state: CombinedState) => state.personCreditsChartReducer.genreFilter)

  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsTitleOpen(!isTitleOpen)
          setIsGenreOpen(false)
        }}
        onKeyDown={({ keyCode }) => {
          if (keyCode === 13) {
            setIsTitleOpen(!isTitleOpen)
            setIsGenreOpen(false)
          }
        }}
        css={css`
          padding: ${space[1] + 1}px ${space[4]}px ${space[1] + 2}px ${space[3]}px;
          background: ${colors.bgColorSecondary};
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;

          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
        `}
      >
        <motion.span initial={{ y: 2 }} animate={{ scale: isHovered ? 1.3 : 1 }}>
          <IoIosSearch color={colors.bgColorPrimary} size={16} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Find a title
        </span>
      </button>
      <AnimatePresence>
        {isTitleOpen && (
          <motion.div
            initial={{ y: 35, opacity: 0, height: 0, padding: `0px ${space[3]}px` }}
            animate={{ opacity: 1, height: space[17], padding: `${space[2]}px ${space[3]}px` }}
            exit={{ opacity: 0, height: 10, padding: `0px ${space[3]}px` }}
            css={css`
              position: absolute;

              display: grid;
              grid-template-rows: 30px 1fr;
              grid-row-gap: ${space[1]}px;

              background: ${colors.bgColorSecondary};
              width: 100%;
              border-radius: ${space[1]}px;
              color: ${colors.textColorSecondary};
              user-select: none;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
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
                  Titles
                </span>
                {/* <AnimatePresence>
                  {genreFilter.length && (
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
                </AnimatePresence> */}
              </div>
              <motion.button
                type="button"
                css={css`
                  display: flex;
                  ${buttonStyle}
                  ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
                      padding: 0;
                `}
                whileHover={{ originY: 0.1, scale: 1.3 }}
                onClick={() => setIsTitleOpen(!isTitleOpen)}
                onKeyDown={({ keyCode }) => {
                  if (keyCode === 13) {
                    setIsTitleOpen(!isTitleOpen)
                  }
                }}
              >
                <IoIosCloseCircle color={colors.bgColorPrimary} size={24} />
              </motion.button>
            </div>
            {/* <div
              css={css`
                ${horizontalScrollableStyle}
              `}
            >
              {genres.map(genre => (
                <SelectableListItem
                  key={genre.id}
                  icon={FaFilter}
                  iconSize={12}
                  text={`${genreList.find(g => g.id === genre.id)?.name} (${genre.count})`}
                  handleSelect={() => {
                    if (genreFilter.includes(genre.id)) {
                      dispatch(updateGenreFilter(genreFilter.filter(id => id !== genre.id)))
                    } else if (genres.length === genreFilter.length) {
                      dispatch(updateGenreFilter([]))
                    } else {
                      dispatch(updateGenreFilter([...genreFilter, genre.id]))
                    }
                  }}
                  isActive={genreFilter.length ? genreFilter.includes(genre.id) : true}
                />
              ))}
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TitleSearch
