import { HTTP_URL, Shapes } from "@/lib/utils";
import axios from "axios";

export async function getAllShapes(slug: string): Promise<Shapes[]> {
  try {
    const res = await axios.get(`${HTTP_URL}/shapes/${slug}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    let shape: Shapes[] = [];
    res.data.shapes.forEach((item: any) => {
      const parsed = JSON.parse(item.message);
      shape.push({
        id: item.id,
        ...parsed,
      });
    });
    return shape;
  } catch (error) {
    console.log(error);
    return [];
  }
}
