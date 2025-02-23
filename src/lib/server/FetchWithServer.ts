import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Props = {
    action: string,
    [init: string]: any;
}

export default async function FetchWithServer({
    action,
    init,
    body
}: Props) {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const response = await fetch(`http://localhost:8080/api/${action}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        ...init,
        body: body
    });

    if (!response.ok) {
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}