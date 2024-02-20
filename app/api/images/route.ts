import supabase from '@/utils/supabase'
import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  // Get the image file
  const formData = await request.formData()
  const file = formData.get('file') as File
  const { name: fileName } = file
  const fileExtension = fileName.split('.').pop()

  // Upload image to storage
  const date = moment().format('YYYYMMDD')
  const time = moment().format('HHmmss')
  const formattedFileName = `${fileName.replace(`.${fileExtension}`, '')}_${date}_${time}.${fileExtension}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(`public/${formattedFileName}`, file)

  if (!uploadError) {
    // If upload image success, response with image url
    return NextResponse.json(
      {
        message: 'Image upload successful',
        // url: urlData.publicUrl,
        data: uploadData,
      },
      {
        status: 200,
      },
    )
  } else {
    // If upload image failed, response with error
    console.error('Error upload image: ', uploadError)
    return NextResponse.json(
      {
        message: 'Failed to upload image',
      },
      {
        status: 500,
      },
    )
  }
}
