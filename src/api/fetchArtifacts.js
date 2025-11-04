import { supabase } from '../lib/supabaseClient';

// Fetch functions
export const fetchBritishArtifacts = async () => {
  const { data, error } = await supabase
    .from('british')
    .select('*')
    .order('ID', { ascending: true });
  
  if (error) {
    console.error('Error fetching British artifacts:', error);
    return [];
  }
  return data;
};

export const fetchMauryaArtifacts = async () => {
  const { data, error } = await supabase
    .from('Maurya')
    .select('*')
    .order('ID', { ascending: true });
  
  if (error) {
    console.error('Error fetching Maurya artifacts:', error);
    return [];
  }
  return data;
};

export const fetchCivilizationArtifacts = async () => {
  const { data, error } = await supabase
    .from('civilization')
    .select('*')
    .order('ArtifactID', { ascending: true }); // Changed from ID to ArtifactID
  
  if (error) {
    console.error('Error fetching Civilization artifacts:', error);
    return [];
  }
  return data;
};

// Insert functions - FIXED VERSION
export const insertBritishArtifact = async (artifactData) => {
  try {
    const { data, error } = await supabase
      .from('british')
      .insert([{
        'Artifact Name': artifactData['Artifact Name'],
        'Type': artifactData.Type,
        'Period': artifactData.Period,
        'Location': artifactData.Location
      }])
      .select();
    
    if (error) {
      console.error('Error inserting British artifact:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Catch error:', err);
    return { data: null, error: err };
  }
};

export const insertMauryaArtifact = async (artifactData) => {
  try {
    const { data, error } = await supabase
      .from('Maurya')
      .insert([{
        'Artifacts/Paintings': artifactData['Artifact Name'], // Changed key
        'Type': artifactData.Type,
        'Period': artifactData.Period,
        'Location': artifactData.Location
      }])
      .select();
    
    if (error) {
      console.error('Error inserting Maurya artifact:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Catch error:', err);
    return { data: null, error: err };
  }
};

export const insertCivilizationArtifact = async (artifactData) => {
  try {
    const { data, error } = await supabase
      .from('civilization')
      .insert([{
        'Artifacts/Paintings': artifactData['Artifact Name'], // Changed key
        'Type': artifactData.Type,
        'Period': artifactData.Period,
        'Location': artifactData.Location
      }])
      .select();
    
    if (error) {
      console.error('Error inserting Civilization artifact:', error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Catch error:', err);
    return { data: null, error: err };
  }
};
