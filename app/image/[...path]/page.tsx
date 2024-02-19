import ShareButton from '@/components/share-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default async function ImagePage({
  params,
}: {
  params: { path: string }
}) {
  const { path } = params
  const fileName = path[0]
  const baseUrl =
    'https://kaxmuyxxhbjuaemihtfy.supabase.co/storage/v1/object/public/images'
  const src = `${baseUrl}/public/${path}`

  return (
    <div className='container flex h-[calc(100vh-85px)] flex-col items-center justify-center'>
      {/* Card container */}
      <Card className='mx-auto grid h-[360px] w-[540px] items-center rounded-lg p-3'>
        {/* Image preview */}
        <CardContent className='relative flex h-full flex-col items-center'>
          <Image
            src={src}
            alt={fileName}
            style={{
              objectFit: 'cover',
            }}
            fill
            priority
            className='rounded-lg'
          />
        </CardContent>
      </Card>
      <ShareButton downloadUrl={src} fileName={fileName} />
    </div>
  )
}
