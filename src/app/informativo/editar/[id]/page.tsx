import FormInformativo from "@/domain/informativo/front/FormInformativo";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const paramsAwaited = await params;
    return (
        <FormInformativo
            id={parseInt(paramsAwaited.id)}
            isView={false}
            title="Editar Informativo"
            method="PUT"
        />
    )
}