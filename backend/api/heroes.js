// backend/api/heroes.js
import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.from('heroes').select('*');
    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
