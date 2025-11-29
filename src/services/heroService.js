import { supabase } from "../../supabaseClient";

/**
 * options: { search, role, lane, range: [from,to] }
 */
export async function getHeroes(options = {}) {
  const { search, role, lane, range } = options;
  let q = supabase.from("heroes").select("*", { count: "exact" });

  if (search) q = q.ilike("hero_name", `%${search}%`);
  if (role) q = q.ilike("role", `%${role}%`);

  if (lane) {
    // try contains (for jsonb array). If backend rejects, fallback to ilike
    try {
      q = q.contains("lane", [lane]);
    } catch (e) {
      q = q.ilike("lane", `%${lane}%`);
    }
  }

  if (range && range.length === 2) {
    q = q.range(range[0], range[1]);
  }

  // ✅ URUT SESUAI DATABASE (BERDASARKAN ID)
  q = q.order("id", { ascending: true });

  const { data, error, count } = await q;
  return { data, error, count };
}

export async function getHeroById(id) {
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
