import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { role } = jwt.verify(token, SECRET_KEY);

    if (url.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    request.headers.set("x-user-role", role); // Pass role to Next.js
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
