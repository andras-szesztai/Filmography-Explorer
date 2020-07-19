import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle } from 'react-icons/io'
import { css } from '@emotion/core'

import { useClickAway } from 'react-use'
import {
  buttonPadding,
  colors,
  fontWeight,
  space,
  buttonNoFocus,
  buttonFocus,
  buttonStyle,
  filterDropdownStyle,
  dentedStyleDark
} from '../../../styles/variables'
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { ListEndPlaceHolder, FilterBridge } from '../../atoms'

// Actions
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'
import { updatePersonFilter } from '../../../reducer/bookmarkedChartReducer/actions'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'

const PersonFilter = () => {
  const { personFilter, personList } = useSelector((state: CombinedState) => state.bookmarkedChartReducer)

  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLDivElement>(null)
  useClickAway(ref, () => {
    setIsOpen(false)
  })

  return (
    <div ref={ref}>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        css={css`
          ${buttonPadding}
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;

          background: ${colors.bgColorPrimaryLight};
          color: ${colors.textColorPrimary};

          margin-left: ${space[3]}px;
          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

          position: relative;
        `}
      >
        <FilterBridge isOpen={isOpen} />
        <motion.span
          animate={{ scale: isHovered ? 1.3 : 1, color: personFilter.length ? colors.accentSecondary : colors.textColorPrimary }}
        >
          <FaFilter size={12} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Filter for favorites ({personFilter.length})
        </span>
      </button>
      {isOpen && (
        <div css={filterDropdownStyle}>
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
                Your favorites
              </span>
              <AnimatePresence>
                {personFilter.length && (
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
                      handleSelect={() => dispatch(updatePersonFilter([]))}
                      icon={IoIosCloseCircle}
                      iconSize={18}
                      paddingSpace={space[8]}
                      text="Reset selection"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              type="button"
              css={css`
                display: flex;
                ${buttonStyle}
                ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
              `}
              initial={{ y: -2, x: 6 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoIosCloseCircle color={colors.bgColorSecondary} size={24} />
            </motion.button>
          </div>
          <div
            css={css`
              ${horizontalScrollableStyle} ::-webkit-scrollbar-track {
                background: ${colors.bgColorSecondary};
              }
              ${dentedStyleDark}
            `}
          >
            {personList &&
              personList.map(favPerson => {
                return (
                  <SelectableListItem
                    key={favPerson.id}
                    icon={FaFilter}
                    iconSize={12}
                    text={`${favPerson.name} (${favPerson.count})`}
                    handleSelect={() => {
                      if (personFilter.includes(favPerson.id)) {
                        dispatch(updatePersonFilter(personFilter.filter(id => id !== favPerson.id)))
                      } else if (Object.values(personList).length === personFilter.length + 1) {
                        dispatch(updatePersonFilter([]))
                      } else {
                        dispatch(updatePersonFilter([...personFilter, favPerson.id]))
                      }
                      dispatch(emptyMovieDetails())
                    }}
                    isActive={personFilter.length ? personFilter.includes(favPerson.id) : true}
                  />
                )
              })}
            <ListEndPlaceHolder />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonFilter
