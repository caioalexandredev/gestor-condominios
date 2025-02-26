import FormContaReceber from "@/domain/conta/receber/front/FormContaReceber";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormContaReceber 
            id={parseInt(paramsAwaited.id)}
            isView={true}
            title="Visualizar Conta a Receber"
        />
    )
}