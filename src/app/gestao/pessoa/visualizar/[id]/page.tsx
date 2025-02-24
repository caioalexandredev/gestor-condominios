import FormPessoa from "@/domain/pessoa/front/FormPessoa";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormPessoa 
            id={parseInt(paramsAwaited.id)}
            isView={true}
            title="Visualizar Pessoa"
        />
    )
}