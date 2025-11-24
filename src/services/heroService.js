export const getAllHeroes = async () => {
    const res = await fetch("/api/heroes");
    return await res.json();
  };
  
  export const getHeroById = async (id) => {
    const res = await fetch(`/api/hero?id=${id}`);
    return await res.json();
  };
  
  export const searchHero = async (text) => {
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query: text }),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  };
  