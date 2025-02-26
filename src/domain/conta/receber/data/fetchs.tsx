import { notifyErro } from "@/lib/components/Alert";

export async function loadContaReceber(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/conta/receber/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadContaReceberList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/conta/receberList`
        + `?pagina=${page}`
        + `&descricao=${filters?.descricao ?? ""}`
        + `&tipo=${filters?.tipo ?? ""}`
        + `&dt_inicio_vencimento=${filters?.dt_inicio_vencimento ?? ""}`
        + `&dt_fim_vencimento=${filters?.dt_fim_vencimento ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}

export async function loadContaReceberCategoria(){
    const resultado = await fetch(`/api/conta/receber/categoria`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}