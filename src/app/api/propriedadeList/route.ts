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
  if (queryParams.get('endereco')) {
    paramsApi = addQueryParam(paramsApi, "endereco", queryParams.get('endereco'));
  }
  if (queryParams.get('tipo')) {
    paramsApi = addQueryParam(paramsApi, "tipo", queryParams.get('tipo'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "propriedade/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}