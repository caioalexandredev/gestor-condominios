import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "veiculo/cor/select",
        init: {
            method: "GET"
        }
    });
}