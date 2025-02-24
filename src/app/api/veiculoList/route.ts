import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  let paramsApi = "";

  if (queryParams.get('nome')) {
    paramsApi = addQueryParam(paramsApi, "nome", queryParams.get('nome'));
  }
  if (queryParams.get('categoria')) {
    paramsApi = addQueryParam(paramsApi, "categoria", queryParams.get('categoria'));
  }
  if (queryParams.get('placa')) {
    paramsApi = addQueryParam(paramsApi, "placa", queryParams.get('placa'));
  }
  if (queryParams.get('modelo')) {
    paramsApi = addQueryParam(paramsApi, "modelo", queryParams.get('modelo'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "veiculo/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}