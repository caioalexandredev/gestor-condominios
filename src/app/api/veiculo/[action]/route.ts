import { NextRequest, NextResponse } from "next/server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function PUT(req: NextRequest,
  { params }: {
    params: {
      action: string
    }
  }
) {
  const paramsUrl = await params;

  return FetchWithServer({
    action: `veiculo/${paramsUrl.action}`,
    init: {
      method: "PUT"
    },
    body: JSON.stringify(await req.json())
  });
}

export async function POST(req: NextRequest) {
  return FetchWithServer({
    action: `veiculo`,
    init: {
      method: "POST"
    },
    body: JSON.stringify(await req.json())
  });
}

export async function GET(
  req: NextRequest,
  { params }: {
    params: {
      action: string
    }
  }
) {
  const paramsUrl = await params;
  return FetchWithServer({
    action: `veiculo/${paramsUrl.action}`,
    init: {
      method: "GET"
    }
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: {
    params: {
      action: string
    }
  }
) {
  const paramsUrl = await params;
  return FetchWithServer({
    action: `veiculo/${paramsUrl.action}`,
    init: {
      method: "DELETE"
    }
  });
}