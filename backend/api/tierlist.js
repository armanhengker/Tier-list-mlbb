import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  try {
    const season = parseInt(req.query.season) || 38;

    // 1) ambil entries dari tierlist
    const { data: tiers, error: err1 } = await supabase
      .from('tierlist')
      .select('*')
      .eq('season', season);
    if (err1) throw err1;

    // 2) ambil semua hero id yang diperlukan
    const heroIds = tiers.map(t => t.hero_id).filter(Boolean);
    let heroes = [];
    if (heroIds.length) {
      const { data: hdata, error: err2 } = await supabase
        .from('heroes')
        .select('id, name, role, image_url')
        .in('id', heroIds);
      if (err2) throw err2;
      heroes = hdata;
    }

    // 3) gabungkan hasil: untuk setiap tier attach hero object
    const data = tiers.map(t => ({
      tier: t.tier,
      hero: heroes.find(h => h.id === t.hero_id) || null
    }));

    return res.status(200).json({ success: true, season, data });
  } catch (err) {
    console.error('API ERROR /tierlist:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
