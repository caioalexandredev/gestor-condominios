import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  let paramsApi = "";

  if (queryParams.get('assunto')) {
    paramsApi = addQueryParam(paramsApi, "assunto", queryParams.get('assunto'));
  }
  if (queryParams.get('dt_inicio_inclusao')) {
    paramsApi = addQueryParam(paramsApi, "dt_inicio_inclusao", queryParams.get('dt_inicio_inclusao'));
  }
  if (queryParams.get('dt_fim_inclusao')) {
    paramsApi = addQueryParam(paramsApi, "dt_fim_inclusao", queryParams.get('dt_fim_inclusao'));
  }
  if (queryParams.get('visibilidade')) {
    paramsApi = addQueryParam(paramsApi, "visibilidade", queryParams.get('visibilidade'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "informativo/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}