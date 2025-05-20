import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zbchxcmfcjtvrfttsyfx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2h4Y21mY2p0dnJmdHRzeWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTE5MjksImV4cCI6MjA2MDIyNzkyOX0.rBhqyYOONeotaw08gbUnfWNm8ypF8ow2nki8-9ioGxg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
