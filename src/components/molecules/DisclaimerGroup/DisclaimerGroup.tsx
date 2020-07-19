import React from 'react'
import { useWindowSize } from 'react-use'

// Components
import { Disclaimer } from '../../atoms'

// Hooks
import { useDetectDeviceType } from '../../../hooks'

function DisclaimerGroup({ breakpoint }: { breakpoint: number }) {
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const device = useDetectDeviceType()

  return (
    <div>
      {windowWidth < breakpoint && (
        <Disclaimer
          bigText="Sorry, the dashboard has not yet been optimized for smaller screen size."
          smallText="Please set your browser's width bigger if possible, or open it on a
      wider screen, thank you!"
          height={windowHeight}
          width={windowWidth}
        />
      )}
      {(device === 'mobile' || device === 'tablet') && (
        <Disclaimer
          bigText={`Sorry, the dashboard has not yet been optimized for ${device === 'mobile' ? 'mobile devices' : 'tablet'}.`}
          smallText={`Please use it in your desktop browser until ${device === 'mobile' ? 'mobile' : 'tablet'} layout will be added!`}
          height={windowHeight}
          width={windowWidth}
        />
      )}
    </div>
  )
}

export default DisclaimerGroup
