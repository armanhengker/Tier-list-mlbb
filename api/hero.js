import { supabase } from "../supabaseClient.js";

export default async function handler(req, res) {
  const id = req.query.id;

  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error });

  res.json({ success: true, data });
}
