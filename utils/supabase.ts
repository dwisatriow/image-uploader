import { Database } from '@/types/database.types'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string,
)

export default supabase
