import { supabase } from "../supabaseClient.js";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("heroes")
    .select("role");

  if (error) return res.status(500).json({ error });

  const roles = [...new Set(data.map((r) => r.role))];

  res.json({ success: true, data: roles });
}
