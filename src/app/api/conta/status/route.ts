import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "conta/status/select",
        init: {
            method: "GET"
        }
    });
}