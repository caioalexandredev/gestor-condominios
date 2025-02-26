import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "conta/tipo/select",
        init: {
            method: "GET"
        }
    });
}