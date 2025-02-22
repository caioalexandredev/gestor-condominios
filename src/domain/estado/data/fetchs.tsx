import { notifyErro } from "@/lib/components/Alert";

export async function loadEstado(){
    const resultado = await fetch(`/api/estado/select/GET`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data.map((opcao: any) => {
        return { key: opcao.uf, value: opcao.uf };
    });
}