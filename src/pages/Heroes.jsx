import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("heroes").select("*");
      setHeroes(data);
    };
    load();
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">All Heroes</h1>

      <div className="grid grid-cols-2 gap-4">
        {heroes.map((h) => (
          <Link
            key={h.id}
            to={`/hero/${h.id}`}
            className="bg-zinc-800 rounded-lg p-3"
          >
            <img
              src={h.image}
              className="rounded-md mb-2"
            />
            <p className="font-semibold">{h.name}</p>
            <p className="text-xs text-gray-400">{h.role}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Heroes;
