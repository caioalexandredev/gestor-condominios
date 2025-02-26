import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "informativo/visibilidade/select",
        init: {
            method: "GET"
        }
    });
}