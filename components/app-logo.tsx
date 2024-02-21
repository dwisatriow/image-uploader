'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

export default function AppLogo() {
  const { theme } = useTheme()

  return (
    <div className=''>
      <Link href='/'>
        <Image
          src='/logo-light.svg'
          alt='Image Uploader logo'
          width={120}
          height={26}
          className='block dark:hidden'
        />
      </Link>
      <Link href='/'>
        <Image
          src='/logo-dark.svg'
          alt='Image Uploader logo'
          width={120}
          height={26}
          className='hidden dark:block'
        />
      </Link>
    </div>
  )

  // return theme === 'light' ? (
  //   <Link href='/'>
  //     <Image
  //       src='/logo-light.svg'
  //       alt='Image Uploader logo'
  //       width={120}
  //       height={26}
  //     />
  //   </Link>
  // ) : (
  //   <Link href='/'>
  //     <Image
  //       src='/logo-dark.svg'
  //       alt='Image Uploader logo'
  //       width={120}
  //       height={26}
  //     />
  //   </Link>
  // )
}
