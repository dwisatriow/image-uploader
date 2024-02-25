import ShareButton from '@/components/share-button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

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
      <Card className='mx-auto grid h-[320px] w-full max-w-[540px] items-center rounded-lg p-3 sm:h-[360px]'>
        {/* Image preview */}
        <CardContent className='relative flex h-full flex-col items-center'>
          <Image
            src={src}
            alt={fileName}
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-lg'
          />
        </CardContent>
      </Card>
      <ShareButton downloadUrl={src} />
    </div>
  )
}
