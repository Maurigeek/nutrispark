import { foods } from "@/data";

// Définir la fonction GET pour la route dynamique
export async function GET(
  request: Request, 
    params: { name: string } 
): Promise<Response> {
  // Normalisation du nom
  const normalizeName = (name: string) =>
    name.toLowerCase().replace(/ /g, "-");

  // Recherche de l'aliment correspondant
  const index = foods.findIndex(
    (food) => normalizeName(food.name) === normalizeName(params.name)
  );

  if (index !== -1) {
    return new Response(JSON.stringify(foods[index]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: "Food not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }
}
