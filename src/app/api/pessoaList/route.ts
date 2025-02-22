import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  let paramsApi = "";

  if (queryParams.get('cpf')) {
    paramsApi = addQueryParam(paramsApi, "cpf", queryParams.get('cpf'));
  }
  if (queryParams.get('nome')) {
    paramsApi = addQueryParam(paramsApi, "nome", queryParams.get('nome'));
  }
  if (queryParams.get('rg')) {
    paramsApi = addQueryParam(paramsApi, "rg", queryParams.get('rg'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "pessoa/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}