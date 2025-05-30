import { HTTP_URL, Shapes } from "@/lib/utils";
import axios from "axios";

export async function getAllShapes(slug: string): Promise<Shapes[]> {
  try {
    const res = await axios.get(`${HTTP_URL}/shapes/${slug}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(res.data.shapes);
    return res.data.shapes ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
