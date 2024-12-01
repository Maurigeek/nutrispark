import { foods } from "@/data";

// Type pour les paramètres dynamiques
export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  // Fonction utilitaire pour normaliser le nom des aliments
  const normalizeName = (name: string) =>
    name.toLowerCase().replace(/ /g, "-");

  // Recherche de l'aliment correspondant
  const index = foods.findIndex(
    (food) => normalizeName(food.name) === normalizeName(params.name)
  );

  // Si l'aliment est trouvé
  if (index !== -1) {
    return new Response(JSON.stringify(foods[index]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } else {
    // Si l'aliment n'est pas trouvé
    return new Response(JSON.stringify({ error: "Food not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }
}
