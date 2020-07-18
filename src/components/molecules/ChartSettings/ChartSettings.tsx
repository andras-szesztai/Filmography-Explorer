import React from 'react'
import { motion } from 'framer-motion'
import { IoMdSettings, IoIosCloseCircle } from 'react-icons/io'
import { css } from '@emotion/core'
import useWhatInput from 'react-use-what-input'
import Switch from 'react-switch'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { toggleIsYAxisSynced } from '../../../reducer/chartSettingsReducer/actions'

// Types
import { CombinedState } from '../../../types/state'

// Styles
import {
  colors,
  buttonPadding,
  space,
  fontWeight,
  buttonNoFocus,
  buttonFocus,
  filterDropdownStyle,
  buttonStyle,
  fontSize
} from '../../../styles/variables'

interface Props {
  isSettingsOpen: boolean
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsGenreOpen: React.Dispatch<React.SetStateAction<boolean>>
  isGenreOpen: boolean
  setIsTitleOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTitleOpen: boolean
  setIsPersonOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isPersonOpen?: boolean
}

const ChartSettings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  setIsGenreOpen,
  setIsTitleOpen,
  setIsPersonOpen,
  isGenreOpen,
  isTitleOpen,
  isPersonOpen
}: Props) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const dispatch = useDispatch()
  const isYDomainSynced = useSelector((state: CombinedState) => state.chartSettingsReducer.isYAxisSynced)

  const [currentInput] = useWhatInput()

  return (
    <>
      <button
        type="button"
        onMouseOver={() => setIsHovered(true)}
        onFocus={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onClick={() => {
          setIsSettingsOpen(!isSettingsOpen)
          if (isGenreOpen) {
            setIsGenreOpen(false)
          }
          if (isTitleOpen) {
            setIsTitleOpen(false)
          }
          if (setIsPersonOpen && isPersonOpen) {
            setIsPersonOpen(false)
          }
        }}
        css={css`
          ${buttonPadding}
          background: ${colors.bgColorPrimaryLight};
          border: none;
          cursor: pointer;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          color: ${colors.textColorPrimary};

          margin-left: ${space[3]}px;
          font-weight: ${fontWeight.sm};
          user-select: none;
          border-radius: ${space[1]}px;
          ${currentInput === 'mouse' ? buttonNoFocus : buttonFocus}

          position: relative;
        `}
      >
        {isSettingsOpen && (
          <span
            css={css`
              position: absolute;
              background: ${colors.bgColorPrimaryLight};
              width: ${space[8]}px;
              height: ${space[2]}px;
              bottom: -${space[2]}px;
              left: calc(50% - ${space[4]}px);
              z-index: 1;
            `}
          />
        )}
        <motion.span initial={{ y: 2 }} animate={{ scale: isHovered ? 1.3 : 1 }}>
          <IoMdSettings color={colors.textColorPrimary} size={15} />
        </motion.span>
        <span
          css={css`
            margin-left: ${space[2]}px;
          `}
        >
          Update chart settings
        </span>
      </button>
      {isSettingsOpen && (
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
                Chart settings
              </span>
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
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <IoIosCloseCircle color={colors.textColorPrimary} size={24} />
            </motion.button>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;

              .react-switch-bg {
                border: 1px solid ${colors.bgColorPrimary};
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Switch
                checked={isYDomainSynced}
                onChange={() => dispatch(toggleIsYAxisSynced())}
                uncheckedIcon={false}
                checkedIcon={false}
                width={40}
                height={20}
                handleDiameter={16}
                onColor={colors.bgColorPrimary}
                offHandleColor={colors.bgColorSecondary}
                offColor={colors.bgColorPrimaryLight}
              />
              <span
                css={css`
                  margin-left: ${space[2]}px;
                  font-size: ${fontSize.sm};
                `}
              >
                Vertical axis for user score axis is from 0 to 10
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

ChartSettings.defaultProps = {
  setIsPersonOpen: undefined,
  isPersonOpen: false
}

export default ChartSettings
