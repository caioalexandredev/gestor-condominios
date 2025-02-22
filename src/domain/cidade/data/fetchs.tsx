import { notifyErro } from "@/lib/components/Alert";

export async function loadCidade(uf: string){
    const resultado = await fetch(`/api/cidade/select/GET?uf=${uf}`)
        .then(response => response.json());
    
    if(!resultado.data){
        notifyErro("Houveram erros na comunicação entre servidores.");
        return [];
    }

    return resultado.data.map((opcao: any) => {
        return { key: opcao.id, value: opcao.nome };
    });
}