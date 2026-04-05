import { createClient } from '@supabase/supabase-js'

export function getServerSupabase() {
    return createClient(
      "https://giomurhtsumtshqcsxwd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpb211cmh0c3VtdHNocWNzeHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjQ3MTYsImV4cCI6MjA5MDkwMDcxNn0.sCJzIgv-X1BwsEwXPspSc5Mkwua72-hh3CrDGmYHsOI"
)
}

