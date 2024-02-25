'use client'

import useWindowSize from '@/hooks/use-window-size'
import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
  const { width: screenWidth } = useWindowSize()
  const [springsPath, setSpringsPath] = useState(0)

  const loadingBarRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadingBarWidth = loadingBarRef.current
      ? loadingBarRef.current.offsetWidth
      : 0
    const progressBarWidth = progressBarRef.current
      ? progressBarRef.current.offsetWidth
      : 0
    if (screenWidth && loadingBarWidth) {
      setSpringsPath(loadingBarWidth - progressBarWidth)
    }
  }, [screenWidth])

  const springs = useSpring({
    from: { x: 0 },
    ...(springsPath !== 0 && {
      to: [{ x: springsPath }, { x: 0 }],
      loop: true,
      config: {
        duration: 1200,
      },
    }),
  })

  return (
    <div id='loader' className='relative mt-5 flex w-full'>
      <div
        ref={loadingBarRef}
        className='bg-loader h-2 w-full rounded-sm'
      ></div>
      <animated.div
        ref={progressBarRef}
        className='absolute left-0 top-0 h-2 w-16 rounded-sm bg-primary sm:w-20'
        style={{
          ...springs,
        }}
      />
    </div>
  )
}
