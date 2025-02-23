import FormPessoa from "@/domain/pessoa/front/FormPessoa";

export default async function Page({ params }: { params: { id: string } }) {
    const paramsAwaited = await params;
    return (
        <FormPessoa 
            id={parseInt(paramsAwaited.id)}
            isView={false}
            title="Editar Pessoa"
            method="PUT"
        />
    )
}