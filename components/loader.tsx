'use client'

import { animated, useSpring } from '@react-spring/web'

export default function Loader() {
  const springs = useSpring({
    from: { x: 0 },
    to: [{ x: 370 }, { x: 0 }],
    loop: true,
    config: {
      duration: 1200,
    },
  })

  return (
    <div id='loader' className='relative mt-5 flex w-full'>
      <div className='bg-loader h-2 w-full rounded-sm'></div>
      {/* <div className='absolute left-0 top-0 h-2 w-12 rounded-sm bg-primary'></div> */}
      <animated.div
        className='absolute left-0 top-0 h-2 w-24 rounded-sm bg-primary'
        style={{
          ...springs,
        }}
      />
    </div>
  )
}
