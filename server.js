import express from "express";
import cors from "cors";
import { supabase } from "./supabaseServer.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/heroes", async (req, res) => {
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .order("id");

  if (error) return res.status(500).json({ error });

  res.json(data);
});

app.listen(3000, () => {
  console.log("API server running at http://localhost:3000");
});
