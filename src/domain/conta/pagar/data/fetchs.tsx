import { notifyErro } from "@/lib/components/Alert";

export async function loadContaPagar(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/conta/pagar/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadContaPagarList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/conta/pagarList`
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

export async function loadContaPagarCategoria(){
    const resultado = await fetch(`/api/conta/pagar/categoria`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}