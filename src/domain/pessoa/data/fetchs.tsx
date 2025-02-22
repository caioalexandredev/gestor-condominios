import { notifyErro } from "@/lib/components/Alert";

export async function loadPessoaList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/pessoaList`
        + `?pagina=${page}`
        + `&cpf=${filters?.cpf ?? ""}`
        + `&rg=${filters?.rg ?? ""}`
        + `&nome=${filters?.nome ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}