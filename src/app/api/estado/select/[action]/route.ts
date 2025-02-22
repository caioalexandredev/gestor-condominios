import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "estado/select",
        init: {
            method: "GET"
        }
    });
}