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
      <SearchIconContainer
        css={css`
          right: ${space[1]}px;
        `}
        isVisible={!searchIsFocused}
        isLeft
        animateProps={{ x: 0, rotateY: 0 }}
      >
        <IoIosSearch size={22} color="#FFF" />
      </SearchIconContainer>
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
