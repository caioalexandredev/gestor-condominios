import { notifyErro } from "@/lib/components/Alert";

export async function loadContaTipo(){
    const resultado = await fetch(`/api/conta/tipo`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}

export async function loadContaStatus(){
    const resultado = await fetch(`/api/conta/status`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data;
}