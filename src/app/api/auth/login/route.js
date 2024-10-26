import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key";

export async function POST(request) {
  const { username, password } = await request.json();

  // Replace this with actual authentication logic
  const role = username === "admin" ? "admin" : "viewer";

  const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: "1h" });

  const response = NextResponse.json({ message: "Logged in" });
  response.cookies.set("token", token, { httpOnly: true, secure: true });
  return response;
}
