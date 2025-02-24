import FetchWithServer from "@/lib/server/FetchWithServer";

export async function GET() {
    return FetchWithServer({
        action: "propriedade/select",
        init: {
            method: "GET"
        }
    });
}