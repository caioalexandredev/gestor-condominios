import FormContaPagar from "@/domain/conta/pagar/front/FormContaPagar";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormContaPagar
            id={parseInt(paramsAwaited.id)}
            isView={false}
            title="Editar Conta a Pagar"
            method="PUT"
        />
    )
}