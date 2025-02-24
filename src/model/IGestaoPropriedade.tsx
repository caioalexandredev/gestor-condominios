import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IGestaoPropriedade {
    id: string
}

export const dataTest = [
    {
        id: "762plm58",
        proprietario: "Felipe Santos",
        tipo: "Lote",
        endereco: "Av. dos Devs, N° 353 - Distrito de Paraíso",
        inclusao: "28/09/2024 11:00:00"
    },
    {
        id: "982gdh34",
        proprietario: "Ana Maria Oliveira",
        tipo: "Casa",
        endereco: "Rua das Palmeiras, N° 125 - Jardim das Flores",
        inclusao: "15/09/2024 09:15:00"
    },
    {
        id: "453wkm12",
        proprietario: "João Pedro Lima",
        tipo: "Apartamento",
        endereco: "Condomínio Solar, Bloco B, Apto 202",
        inclusao: "20/09/2024 16:45:00"
    },
    {
        id: "384nxh09",
        proprietario: "Camila Ferreira",
        tipo: "Lote",
        endereco: "Av. Central, Quadra 5, Lote 20",
        inclusao: "25/09/2024 14:30:00"
    },
    {
        id: "567pol78",
        proprietario: "Ricardo Almeida",
        tipo: "Sala Comercial",
        endereco: "Edifício Empresarial Alfa, Sala 302",
        inclusao: "12/09/2024 10:00:00"
    },
    {
        id: "741xqd21",
        proprietario: "Beatriz Souza",
        tipo: "Lote",
        endereco: "Rua Nova Esperança, N° 78",
        inclusao: "18/09/2024 08:50:00"
    },
    {
        id: "621zpk45",
        proprietario: "Carlos Eduardo",
        tipo: "Casa",
        endereco: "Estrada do Sol, N° 67 - Vila Aurora",
        inclusao: "22/09/2024 19:10:00"
    },
    {
        id: "459mlk82",
        proprietario: "Mariana Castro",
        tipo: "Apartamento",
        endereco: "Residencial Bela Vista, Bloco A, Apto 305",
        inclusao: "10/09/2024 12:25:00"
    }
];

export const tipoSelect: keyValueOption[] = [
    {
        key: 1,
        value: "Casa",
    },
    {
        key: 2,
        value: "Lote",
    },
    {
        key: 3,
        value: "Apartamento",
    },
    {
        key: 4,
        value: "Garagem",
    },
    {
        key: 5,
        value: "Sala Comercial",
    },
    {
        key: 6,
        value: "Área Comum",
    }
];

export const columns: ColumnDef<IGestaoPropriedade>[] = [
    {
        accessorKey: "proprietario",
        header: "Proprietário",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        accessorKey: "endereco",
        header: "Endereço",
    },
    {
        accessorKey: "dt_inclusao",
        header: "Inclusão",
    }
];