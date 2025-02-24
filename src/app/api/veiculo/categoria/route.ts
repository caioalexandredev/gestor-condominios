import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "veiculo/categoria/select",
        init: {
            method: "GET"
        }
    });
}