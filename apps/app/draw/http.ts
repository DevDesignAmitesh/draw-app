import { HTTP_URL, Shapes } from "@/lib/utils";
import axios from "axios";

export async function getAllRooms(slug: string): Promise<Shapes[]> {
  try {
    const res = await axios.get(`${HTTP_URL}/shapes/${slug}`);
    console.log(res.data.shapes);
    return res.data.shapes ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
