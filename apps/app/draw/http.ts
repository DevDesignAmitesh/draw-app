import { HTTP_URL, Shapes } from "@/lib/utils";
import axios from "axios";

export async function getAllShapes(slug: string): Promise<Shapes[]> {
  try {
    const res = await axios.get(`${HTTP_URL}/shapes/${slug}`, {
      withCredentials: true,
    });
    console.log(res.data);
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

export async function getUserId(): Promise<string | null> {
  try {
    const res = await axios.get(`${HTTP_URL}/who`, {
      withCredentials: true,
    });

    console.log(res.data);

    if (res.status === 201) {
      return res.data.message.userId;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
