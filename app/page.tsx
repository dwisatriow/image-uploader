'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageUploadPage() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.png', 'gif'],
    },
    maxSize: 2000,
  })

  return (
    <div className='container flex h-[calc(100vh-85px)] items-center justify-center'>
      <Card className='mx-auto grid h-[360px] w-[540px] items-center rounded-lg p-3'>
        <div
          {...getRootProps()}
          className='grid h-full cursor-pointer items-center rounded-lg border-2 border-dashed'
        >
          <input {...getInputProps()} />

          <CardContent className='flex flex-col items-center'>
            <Image src='/exit.svg' alt='Upload image' width={32} height={32} />

            <p className='mt-3 text-center font-medium'>
              Drag & drop a file or{' '}
              <span className='text-blue-600'>browse files</span>
            </p>
            <p className='mt-px text-sm'>
              JPG, PNG or GIF - Max file size is 2MB
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
