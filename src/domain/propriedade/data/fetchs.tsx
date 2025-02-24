import { notifyErro } from "@/lib/components/Alert";

export async function loadPropriedadeList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/propriedadeList`
        + `?pagina=${page}`
        + `&cpf=${filters?.cpf ?? ""}`
        + `&endereco=${filters?.endereco ?? ""}`
        + `&tipo=${filters?.tipo ?? ""}`
        + `&nome=${filters?.nome ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}

export async function loadPropriedade(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/propriedade/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadTipoSelect(){
    const resultado = await fetch(`/api/propriedade/tipo`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}