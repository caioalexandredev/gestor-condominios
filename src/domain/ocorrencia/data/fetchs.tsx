import { notifyErro } from "@/lib/components/Alert";

export async function loadOcorrenciaList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/ocorrenciaList`
        + `?pagina=${page}`
        + `&assunto=${filters?.assunto ?? ""}`
        + `&solicitante=${filters?.solicitante ?? ""}`
        + `&dt_inicio_ocorrencia=${filters?.dt_inicio_ocorrencia ?? ""}`
        + `&dt_fim_ocorrencia=${filters?.dt_fim_ocorrencia ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}

export async function loadOcorrencia(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/ocorrencia/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadOcorrenciaTipoSelect(){
    const resultado = await fetch(`/api/ocorrencia/tipo`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}