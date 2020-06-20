import AwesomeDebouncePromise from 'awesome-debounce-promise'
import useConstant from 'use-constant'
import { useAsync } from 'react-async-hook'
import { useState } from 'react'

const useDebouncedSearch = (searchFunction: (text: string) => void, debounceTime: number) => {
  const [inputText, setInputText] = useState('')

  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, debounceTime))

  useAsync(async () => {
    if (inputText.length > 0) {
      return debouncedSearchFunction(inputText)
    }
    return debouncedSearchFunction('')
  }, [debouncedSearchFunction, inputText])

  return {
    inputText,
    setInputText
  }
}

export default useDebouncedSearch
