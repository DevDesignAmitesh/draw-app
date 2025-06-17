import { HTTP_URL, Shapes } from "@/lib/utils";

export async function getAllShapes(slug: string): Promise<Shapes[]> {
  try {
    const res = await fetch(`${HTTP_URL}/shapes/${slug}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return [];

    const data = await res.json();
    let shape: Shapes[] = [];

    data.shapes.forEach((item: any) => {
      const parsed = JSON.parse(item.message);
      shape.push({
        id: item.id,
        ...parsed,
      });
    });

    return shape;
  } catch (error) {
    console.log("Error fetching shapes:", error);
    return [];
  }
}
