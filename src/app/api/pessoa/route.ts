import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const response = await fetch("http://localhost:8080/api/pessoa", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(await req.json())
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
