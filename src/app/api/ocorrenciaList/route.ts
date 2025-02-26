import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  let paramsApi = "";

  if (queryParams.get('assunto')) {
    paramsApi = addQueryParam(paramsApi, "assunto", queryParams.get('assunto'));
  }
  if (queryParams.get('solicitante')) {
    paramsApi = addQueryParam(paramsApi, "solicitante", queryParams.get('solicitante'));
  }
  if (queryParams.get('dt_inicio_ocorrencia')) {
    paramsApi = addQueryParam(paramsApi, "dt_inicio_ocorrencia", queryParams.get('dt_inicio_ocorrencia'));
  }
  if (queryParams.get('dt_fim_ocorrencia')) {
    paramsApi = addQueryParam(paramsApi, "dt_fim_ocorrencia", queryParams.get('dt_fim_ocorrencia'));
  }
  if (queryParams.get('pagina')) {
    paramsApi = addQueryParam(paramsApi, "pagina", queryParams.get('pagina'));
  }

  return FetchWithServer({
    action: "ocorrencia/listagem" + paramsApi,
    init: {
      method: "GET"
    }
  });
}