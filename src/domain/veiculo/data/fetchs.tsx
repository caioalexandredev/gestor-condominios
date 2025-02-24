import { notifyErro } from "@/lib/components/Alert";

export async function loadVeiculoList(
    filters: any  = {},
    page: number = 1
): Promise<any> {
    const resultado = await fetch(`/api/veiculoList`
        + `?pagina=${page}`
        + `&categoria=${filters?.categoria ?? ""}`
        + `&placa=${filters?.placa ?? ""}`
        + `&modelo=${filters?.modelo ?? ""}`
        + `&nome=${filters?.nome ?? ""}`
    )
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado;
}

export async function loadVeiculo(
    id: number
): Promise<any> {
    const resultado = await fetch(`/api/veiculo/${id}`)
        .then(response => response.json());

    if (!resultado.data) {
        notifyErro("Houveram erros na comunicação entre servidores.");
        return {};
    }

    return resultado;
}

export async function loadCorSelect(){
    const resultado = await fetch(`/api/veiculo/cor`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}

export async function loadMarcaSelect(){
    const resultado = await fetch(`/api/veiculo/marca`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}

export async function loadCategoriaSelect(){
    const resultado = await fetch(`/api/veiculo/categoria`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}