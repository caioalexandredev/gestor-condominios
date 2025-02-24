import FormVeiculo from "@/domain/veiculo/front/FormVeiculo";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormVeiculo
            id={parseInt(paramsAwaited.id)}
            isView={true}
            title="Visualizar Veículo"
        />
    )
}