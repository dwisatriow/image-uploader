import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import moment from 'moment'
import supabase from '@/utils/supabase'

export const POST = async (request: NextRequest) => {
  // Get the image file
  const formData = await request.formData()
  const file = formData.get('file') as File
  const { name: fileName } = file
  const fileExtension = fileName.split('.').pop()
  // console.log('file:', file)

  // Upload image to storage
  const date = moment().format('YYYYMMDD')
  const time = moment().format('HHmmss')
  const formattedFileName = `${fileName.replace(`.${fileExtension}`, '')}_${date}_${time}.${fileExtension}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(`public/${formattedFileName}`, file)

  // If upload image success
  if (!uploadError) {
    // Insert data to db
    // const { data, error } = await supabase
    //   .from('images')
    //   .insert({
    //     file_path: uploadData.path,
    //   })
    //   .select()
    console.log('data', uploadData)

    // If insert data success
    // if (!error) {
    // Get image public url
    // const { data: urlData } = supabase.storage
    //   .from('images')
    //   .getPublicUrl(data[0].file_path)

    // Response with image url
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
    // } else {
    //   // If insert data failed, response with error
    //   console.error('Error insert data:', error)
    //   return NextResponse.json(
    //     {
    //       message: 'Failed to upload image',
    //     },
    //     {
    //       status: 500,
    //     },
    //   )
    // }
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
