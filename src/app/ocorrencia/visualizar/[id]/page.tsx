import FormOcorrencia from "@/domain/ocorrencia/front/FormOcorrencia";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormOcorrencia
            id={parseInt(paramsAwaited.id)}
            isView={true}
            title="Visualizar Ocorrência"
        />
    )
}