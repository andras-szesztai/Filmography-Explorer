import { useState, useEffect, useRef } from 'react'
import { isTablet, isMobileOnly, isBrowser } from 'react-device-detect'

export default function useDetectDeviceType() {
  const [device, setDevice] = useState('')
  const init = useRef(true)
  useEffect(() => {
    if (init.current) {
      init.current = false
      if (!device) {
        if (isBrowser && !isMobileOnly && !isTablet) {
          setDevice('desktop')
        }
        if (!isBrowser && !isMobileOnly && isTablet) {
          setDevice('tablet')
        }
        if (!isBrowser && isMobileOnly && !isTablet) {
          setDevice('mobile')
        }
      }
    }
  })
  return device
}
