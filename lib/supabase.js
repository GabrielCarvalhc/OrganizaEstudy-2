// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// 1. Validação das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
  Variáveis de ambiente do Supabase não configuradas!
  Verifique seu arquivo .env.local e certifique-se que:
  NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas
  `)
}

// 2. Criação do cliente com configuração adicional
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Recomendado para Next.js
    autoRefreshToken: true
  }
})