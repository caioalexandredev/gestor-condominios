import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cpf, senha } = await req.json();

  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cpf, senha }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const { status, erro, data } = await response.json();

  const cookie = await cookies();
  const token = cookie.set("token", data.key);

  const res = NextResponse.json({ token: data.key });
  res.cookies.set("token", data.key, {
    httpOnly: true, // Protege contra acesso no client-side
    secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
    path: "/", // Disponível em todo o site
    sameSite: "lax", // Previne CSRF sem bloquear requisições normais
    maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias
  });

  return res;
}