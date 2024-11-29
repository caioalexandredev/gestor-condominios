import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IInformativo {
    id: string
}

export const dataTest = [
    {
        id: "728ed52f",
        titulo: "Aviso sobre limpeza da piscina",
        visibilidade: "Privado",
        inclusao: "02/10/2024 15:23:12"
    },
    {
        id: "84a3b7c9",
        titulo: "Interrupção de energia programada",
        visibilidade: "Público",
        inclusao: "03/10/2024 09:45:00"
    },
    {
        id: "9fb2d6e1",
        titulo: "Manutenção nos elevadores",
        visibilidade: "Privado",
        inclusao: "04/10/2024 14:00:30"
    },
    {
        id: "623f9d87",
        titulo: "Reunião do condomínio",
        visibilidade: "Público",
        inclusao: "05/10/2024 10:30:45"
    },
    {
        id: "382dc5ab",
        titulo: "Nova política de reciclagem",
        visibilidade: "Interno",
        inclusao: "06/10/2024 08:15:20"
    },
    {
        id: "476a1be2",
        titulo: "Troca de lâmpadas nos corredores",
        visibilidade: "Privado",
        inclusao: "07/10/2024 11:50:05"
    },
    {
        id: "c814d29f",
        titulo: "Ajustes no portão da garagem",
        visibilidade: "Privado",
        inclusao: "08/10/2024 16:20:35"
    },
    {
        id: "f920b3c4",
        titulo: "Aviso de entrega de correspondências",
        visibilidade: "Público",
        inclusao: "09/10/2024 12:10:50"
    }
];

export const visibilidadeSelect: keyValueOption[] = [
    {
        key: 1,
        value: "Público",
    },
    {
        key: 2,
        value: "Interno",
    },
    {
        key: 3,
        value: "Privado",
    }
];

export const columns: ColumnDef<IInformativo>[] = [
    {
        accessorKey: "titulo",
        header: "Titulo",
    },
    {
        accessorKey: "visibilidade",
        header: "Visibilidade",
    },
    {
        accessorKey: "inclusao",
        header: "Inclusão",
    }
];