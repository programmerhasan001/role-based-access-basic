import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "your-secret-key";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { role } = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ role });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
