import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IGestaoPessoa {
    id: string
}

export const dataTest = [
    {
        id: "728ed52f",
        nome: "Caio Alexandre de Sousa Ramos",
        tipo: "Morador",
        inclusao: "02/10/2024 15:23:12"
    },
    {
        id: "839ad74g",
        nome: "Juliana Pereira da Silva",
        tipo: "Visitante",
        inclusao: "12/09/2024 09:12:45"
    },
    {
        id: "921bf85h",
        nome: "Ricardo Mendes Oliveira",
        tipo: "Prestador",
        inclusao: "15/10/2024 14:08:33"
    },
    {
        id: "654ce96i",
        nome: "Ana Clara Martins",
        tipo: "Morador",
        inclusao: "20/10/2024 10:45:22"
    },
    {
        id: "387df07j",
        nome: "Fernando Luiz Costa",
        tipo: "Visitante",
        inclusao: "25/09/2024 16:34:11"
    },
    {
        id: "473eg18k",
        nome: "Maria Eduarda Gomes",
        tipo: "Prestador",
        inclusao: "01/11/2024 11:50:18"
    },
    {
        id: "921bf85h",
        nome: "Ricardo Mendes Oliveira",
        tipo: "Prestador",
        inclusao: "15/10/2024 14:08:33"
    },
    {
        id: "654ce96i",
        nome: "Ana Clara Martins",
        tipo: "Morador",
        inclusao: "20/10/2024 10:45:22"
    },
];

export const tipoSelect: keyValueOption[] = [
    {
        key: 1,
        value: "Locatário",
    },
    {
        key: 2,
        value: "Visitante",
    },
    {
        key: 3,
        value: "Prestador",
    },
    {
        key: 4,
        value: "Inquilino",
    },
    {
        key: 5,
        value: "Proprietário",
    }
];

export const columns: ColumnDef<IGestaoPessoa>[] = [
    {
        accessorKey: "nome",
        header: "Nome Completo",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        accessorKey: "inclusao",
        header: "Inclusão",
    }
];