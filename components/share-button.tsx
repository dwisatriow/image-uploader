'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function ShareButton({ downloadUrl }: { downloadUrl: string }) {
  const pathname = usePathname()
  const [isCopied, setIsCopied] = useState(false)

  // Notify text copied
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isCopied])

  // Copy image url to clipboard
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_BASE_URL + pathname,
      )
    } catch (err) {
      console.error('Failed to copy: ', err)
    } finally {
      setIsCopied(true)
    }
  }

  return (
    <div className='mt-4 grid grid-cols-2 gap-3'>
      {/* Share button */}
      <Button
        size='sm'
        onClick={() => {
          if (!isCopied) {
            copyUrl()
          }
        }}
      >
        {!isCopied ? (
          <>
            <Image
              src='/link.svg'
              alt='Share'
              width={16}
              height={16}
              className='-ml-2 mr-1'
            />{' '}
            Share
          </>
        ) : (
          <>
            <CheckIcon className='-ml-3 h-5 w-5' />
            Copied
          </>
        )}
        {/* Download button */}
      </Button>
      <a href={downloadUrl} download>
        <Button size='sm'>
          <Image
            src='/download.svg'
            alt='Download'
            width={16}
            height={16}
            className='-ml-1 mr-1'
          />{' '}
          Download
        </Button>
      </a>
    </div>
  )
}
