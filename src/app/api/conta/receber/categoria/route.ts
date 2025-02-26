import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "conta/receber/categoria/select",
        init: {
            method: "GET"
        }
    });
}