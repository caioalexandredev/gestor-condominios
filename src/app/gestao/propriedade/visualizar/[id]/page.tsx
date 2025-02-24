import FormPropriedade from "@/domain/propriedade/front/FormPropriedade";

export default async function Page({ params }: { params: { id: string } }) {
    const paramsAwaited = await params;
    return (
        <FormPropriedade 
            id={parseInt(paramsAwaited.id)}
            isView={true}
            title="Visualizar Propriedade"
        />
    )
}