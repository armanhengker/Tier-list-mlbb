import { supabase } from "../supabaseClient.js";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("heroes")
    .select("lane");

  if (error) return res.status(500).json({ error });

  const lanes = [
    ...new Set(data.flatMap((item) => item.lane || []))
  ];

  res.json({ success: true, data: lanes });
}
