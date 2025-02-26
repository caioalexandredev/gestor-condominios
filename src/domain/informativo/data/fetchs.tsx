import { notifyErro } from "@/lib/components/Alert";

export async function loadInformativoList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/informativoList`
        + `?pagina=${page}`
        + `&assunto=${filters?.assunto ?? ""}`
        + `&visibilidade=${filters?.visibilidade ?? ""}`
        + `&dt_inicio_inclusao=${filters?.dt_inicio_inclusao ?? ""}`
        + `&dt_fim_inclusao=${filters?.dt_fim_inclusao ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}

export async function loadInformativo(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/informativo/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadInformativoVisibilidadeSelect(){
    const resultado = await fetch(`/api/informativo/visibilidade`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}