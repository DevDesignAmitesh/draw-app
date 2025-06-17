import { cookies } from "next/headers";
import { HTTP_URL, Shapes } from "@/lib/utils";

// ✅ Get all rooms
export async function getAllRooms(): Promise<
  { name: string; id: string; slug: string }[]
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${HTTP_URL}/room`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (res.status === 201) {
      const data = await res.json();
      return data.rooms;
    }

    return [];
  } catch (error) {
    console.log("Error fetching rooms:", error);
    return [];
  }
}

// ✅ Get all shapes for a specific slug


// ✅ Get user ID from backend
export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${HTTP_URL}/who`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (res.status === 201) {
      const data = await res.json();
      return data.message.userId;
    }

    return null;
  } catch (error) {
    console.log("Error fetching user ID:", error);
    return null;
  }
}
