import React from 'react'
import useWhatInput from 'react-use-what-input'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircle } from 'react-icons/io'
import { css } from '@emotion/core'

import {
  buttonPadding,
  colors,
  fontWeight,
  space,
  buttonNoFocus,
  buttonFocus,
  buttonStyle,
  filterDropdownStyle
} from '../../../styles/variables'
import SelectableListItem from '../SelectableListItem/SelectableListItem'
import { ListEndPlaceHolder } from '../../atoms'

// Actions
import { emptyMovieDetails } from '../../../reducer/movieReducer/actions'
import { updatePersonFilter } from '../../../reducer/bookmarkedChartReducer/actions'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import { horizontalScrollableStyle } from '../../organisms/MovieDetailCards/styles'

interface Props {
  isPersonOpen: boolean
  setIsPersonOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTitleOpen: boolean
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSettingsOpen: boolean
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  isGenreOpen: boolean
}

const PersonFilter = ({
  setIsGenreOpen,
  setIsTitleOpen,
  isPersonOpen,
  setIsPersonOpen,
  setIsSettingsOpen,
  isTitleOpen,
  isSettingsOpen,
  isGenreOpen
}: Props) => {
  const { personFilter, personList } = useSelector((state: CombinedState) => state.bookmarkedChartReducer)

  const dispatch = useDispatch()
  const [currentInput] = useWhatInput()

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <>
      <motion.button
        type="button"
        initial={{ background: isPersonOpen ? colors.accentSecondary : colors.bgColorSecondary }}
        animate={{ background: isPersonOpen ? colors.accentSecondary : colors.bgColorSecondary }}
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsPersonOpen(!isPersonOpen)
          if (isTitleOpen) {
            setIsTitleOpen(false)
          }
          if (isGenreOpen) {
            setIsGenreOpen(false)
          }
          if (isSettingsOpen) {
            setIsSettingsOpen(false)
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

          margin-left: ${space[3]}px;
          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}
        `}
      >
        <motion.span animate={{ scale: isHovered ? 1.3 : 1 }}>
          <FaFilter color={colors.bgColorPrimary} size={12} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Filter for favorites&nbsp;
          <motion.span
            animate={{
              color: !personFilter.length ? colors.textColorSecondary : colors.accentPrimary
            }}
          >
            ({personFilter.length})
          </motion.span>
        </span>
      </motion.button>
      {isPersonOpen && (
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
                      padding: 0;
              `}
              whileHover={{ originY: 0.1, scale: 1.3 }}
              onClick={() => setIsPersonOpen(!isPersonOpen)}
            >
              <IoIosCloseCircle color={colors.bgColorPrimary} size={24} />
            </motion.button>
          </div>
          <div
            css={css`
              ${horizontalScrollableStyle}
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
    </>
  )
}

export default PersonFilter
