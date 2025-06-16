import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  console.log(token);
  console.log("seceret", process.env.JWT_SECRET);

  try {
    const res = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!),
      {
        algorithms: ["HS256"],
      }
    );
    console.log(res);
    if (res.payload) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signup", req.url));
    }
  } catch (e) {
    console.log("jwt verify error message", e);
    return NextResponse.redirect(new URL("/signup", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/canvas/:path*", "/create/:path*"],
};
