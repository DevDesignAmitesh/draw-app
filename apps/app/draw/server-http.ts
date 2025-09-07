import { cookies } from "next/headers";
import { HTTP_URL } from "@/lib/utils";

// ✅ Get all rooms
export async function getAllRooms(): Promise<any[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return [];

  try {
    const res = await fetch(`${HTTP_URL}/room`, {
      method: "GET",
      headers: {
        Cookie: `${token}`,
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

export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("token inside the server http");
  console.log(token);

  console.log(HTTP_URL);
  console.log("token inside the server http");

  if (!token) return null;

  try {
    const res = await fetch(`${HTTP_URL}/who`, {
      method: "GET",
      headers: {
        Cookie: `${token}`,
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
