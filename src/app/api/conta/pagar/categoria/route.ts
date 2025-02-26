import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "conta/pagar/categoria/select",
        init: {
            method: "GET"
        }
    });
}