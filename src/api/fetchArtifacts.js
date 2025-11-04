import { supabase } from '../lib/supabaseClient'

export async function fetchBritishArtifacts() {
  const { data, error } = await supabase
    .from('british')
    .select('*')

  if (error) {
    console.error('Error fetching British artifacts:', error)
    return []
  }
  return data
}

export async function fetchMauryaArtifacts() {
  const { data, error } = await supabase
    .from('Maurya')
    .select('*')

  if (error) {
    console.error('Error fetching Maurya artifacts:', error)
    return []
  }
  return data
}

export async function fetchCivilizationArtifacts() {
  const { data, error } = await supabase
    .from('civilization')
    .select('*')

  if (error) {
    console.error('Error fetching Civilization artifacts:', error)
    return []
  }
  return data
}
