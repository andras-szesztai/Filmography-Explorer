import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { IoIosSearch, IoIosClose } from 'react-icons/io'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer } from '../../atoms'

// Styles
import { height, width, space, colors, fontSize, fontWeight } from '../../../styles/variables'
import { transition } from '../../../styles/animation'

interface Props {
  placeholder: string
}

const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)

  return (
    <SearchBarContainer>
      <SearchBarInput placeholder={placeholder} searchIsFocused={searchIsFocused} setSearchIsFocused={setSearchIsFocused} />
      <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
        <IoIosSearch size={22} color={colors.textColorPrimary} />
      </SearchIconContainer>
      <SearchIconContainer isVisible={searchIsFocused} animateProps={{ x: 10, rotateY: 75 }}>
        <IoIosClose size={22} color={colors.accentPrimary} />
      </SearchIconContainer>
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
