import dotenv from "dotenv";
dotenv.config({ path: ".env.server" }); // WAJIB

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Pakai env dari .env.server
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

app.get("/api/heroes", async (req, res) => {
  const { data, error } = await supabase.from("heroes").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
