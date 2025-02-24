import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "propriedade/tipo/select",
        init: {
            method: "GET"
        }
    });
}