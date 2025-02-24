import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "pessoa/select",
        init: {
            method: "GET"
        }
    });
}