import { NextRequest } from "next/server";
import { addQueryParam } from "@/lib/util/Server";
import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET(req: NextRequest) {
    const queryParams = req.nextUrl.searchParams;

    let paramsApi = "";

    if (queryParams.get('uf')) {
        paramsApi = addQueryParam(paramsApi, "uf", queryParams.get('uf'));
    }

    return FetchWithServer({
        action: "cidade/select" + paramsApi,
        init: {
            method: "GET"
        }
    });
}