import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  let paramsApi = "";

  if (queryParams.get('descricao')) {
    paramsApi = addQueryParam(paramsApi, "descricao", queryParams.get('descricao'));
  }
  if (queryParams.get('dt_inicio_vencimento')) {
    paramsApi = addQueryParam(paramsApi, "dt_inicio_vencimento", queryParams.get('dt_inicio_vencimento'));
  }
  if (queryParams.get('dt_fim_vencimento')) {
    paramsApi = addQueryParam(paramsApi, "dt_fim_vencimento", queryParams.get('dt_fim_vencimento'));
  }
  if (queryParams.get('tipo')) {
    paramsApi = addQueryParam(paramsApi, "tipo", queryParams.get('tipo'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "conta/receber/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}