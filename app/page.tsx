'use client'

import Loader from '@/components/loader'
import Notification from '@/components/notification'
import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export default function ImageUploadPage() {
  const router = useRouter()

  // Loader state
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Callback function to handle file drop
  const onDrop = useCallback(async (acceptedFiles: any) => {
    setIsLoading(true)

    // If file selected or dropped
    if (acceptedFiles.length) {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])

      // Upload the file
      try {
        const res = await axios.post(`/api/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (res.status === 200) {
          // If upload success, show success notif
          toast.custom(() => (
            <Notification
              type='success'
              description='Image uploaded successfully'
            />
          ))
          setIsRedirecting(true)

          const path = res.data.data.path.replace('public/', '')
          router.push(`/image/${path}`)
        } else {
          // If upload failed, show error notif
          toast.custom(() => (
            <Notification
              type='error'
              description='An error occured when uploading data'
            />
          ))
          setIsLoading(false)
        }
      } catch (error) {
        // If upload failed, show error notif
        toast.custom(() => (
          <Notification type='error' description='Internal server error' />
        ))
      } finally {
        setIsLoading(false)
      }
    } else {
      // If file not accepted, show warning notif
      toast.custom(() => (
        <Notification
          type='warning'
          description='Please ensure your file is in a supported format and smaller than 2MB'
        />
      ))
      setIsLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Setup dropzone config
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jgp'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize: 2 * 1000_000, // 2MB
  })

  return (
    <div className='container flex h-[calc(100vh-85px)] items-center justify-center'>
      {/* Card container */}
      {!isLoading && !isRedirecting ? (
        // Image input
        <Card className='mx-auto grid h-[360px] w-[540px] items-center rounded-lg p-3'>
          {/* Dropzone area */}
          <div
            {...getRootProps()}
            className='grid h-full cursor-pointer items-center rounded-lg border-2 border-dashed dark:border-secondary'
          >
            {/* Dropzone input */}
            <input {...getInputProps()} />

            <CardContent className='flex flex-col items-center'>
              {/* Upload icon */}
              <Image
                src='/exit.svg'
                alt='Upload image'
                width={32}
                height={32}
              />
              {/* Upload instruction */}
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
      ) : !isRedirecting ? (
        // Uploading indicator
        <Card className='mx-auto grid h-[140px] w-[540px] items-center rounded-lg p-3'>
          <CardContent className='flex flex-col items-center'>
            <p className='text-center'>
              <span className='font-medium'>Uploading,</span> please wait...
            </p>
            <Loader />
          </CardContent>
        </Card>
      ) : (
        // Loading indicator
        <Card className='mx-auto grid h-[360px] w-[540px] items-center rounded-lg p-3'>
          <CardContent className='flex flex-col items-center'>
            <Image
              src='/loader.svg'
              alt='Loading...'
              width={60}
              height={60}
              className='duration-[1200ms] my-auto animate-spin'
              priority
            />
          </CardContent>
        </Card>
      )}
    </div>
  )

  // return <Loader />
}
