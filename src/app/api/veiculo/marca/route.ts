import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "veiculo/marca/select",
        init: {
            method: "GET"
        }
    });
}