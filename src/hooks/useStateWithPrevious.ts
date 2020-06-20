import React from 'react'
import { usePrevious } from 'react-use'

export default function useStateWithPrevious(initial: any) {
  const [state, setState] = React.useState(initial)
  const prevState = usePrevious(state)
  return [state, setState, prevState]
}
