import { supabase } from "../supabaseClient.js";

export default async function handler(req, res) {
  const q = req.query.q || "";

  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .ilike("hero_name", `%${q}%`);

  if (error) return res.status(500).json({ error });

  res.json({ success: true, data });
}
