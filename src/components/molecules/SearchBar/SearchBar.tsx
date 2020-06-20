import React from 'react'
import { css } from '@emotion/core'
import { motion } from 'framer-motion'
import { IoIosSearch, IoIosClose } from 'react-icons/io'
import axios from 'axios'

// Components
import { SearchBarContainer, SearchBarInput, SearchIconContainer } from '../../atoms'

// Styles
import { height, width, space, colors, fontSize, fontWeight } from '../../../styles/variables'
import { transition } from '../../../styles/animation'
import { useDebouncedSearch } from '../../../hooks'

// Constants
import { API_ROOT } from '../../../constants/url'

interface Props {
  placeholder: string
}

const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const [nameSearchResults, setNameSearchResults] = React.useState([])
  const [searchIsFocused, setSearchIsFocused] = React.useState(false)

  const fetchNames = (text: string) => {
    if (text) {
      return axios
        .get(`${API_ROOT}/search/person?api_key=${process.env.MDB_API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`)
        .then(response => setNameSearchResults(response.data.results.filter((el: {}, i: number) => i < 5)))
        .catch(error => console.log(error))
    }
    return setNameSearchResults([])
  }
  const { inputText, setInputText } = useDebouncedSearch(fetchNames, 500)

  return (
    <SearchBarContainer>
      <SearchBarInput
        placeholder={placeholder}
        searchIsFocused={searchIsFocused}
        setSearchIsFocused={setSearchIsFocused}
        inputValue={inputText}
        setInputText={setInputText}
      />
      <SearchIconContainer isVisible={!searchIsFocused} isLeft animateProps={{ x: -10, rotateY: -75 }}>
        <IoIosSearch size={22} color={colors.textColorPrimary} />
      </SearchIconContainer>
      <SearchIconContainer
        isVisible={searchIsFocused}
        animateProps={{ x: 10, rotateY: 75 }}
        onClick={() => {
          setInputText('')
          setNameSearchResults([])
        }}
      >
        <IoIosClose size={22} color={colors.accentPrimary} />
      </SearchIconContainer>
    </SearchBarContainer>
  )
}

export default SearchBar

// outline: none;
