'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AppLogo() {
  const { theme } = useTheme()

  return (
    <Link href='/'>
      <Image
        src={theme === 'light' ? '/logo-light.svg' : '/logo-dark.svg'}
        alt='Image Uploader logo'
        width={120}
        height={26}
      />
    </Link>
  )
}
