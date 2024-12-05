import { ColumnDef } from "@tanstack/react-table";

export interface IOcorrencia {
    id: string
}

export const dataTest = [
    {
        id: "728ed52f",
        nome: "Caio Alexandre de Sousa Ramos",
        assunto: "Reclamação sobre barulho",
        inclusao: "02/10/2024 15:23:12"
    },
    {
        id: "839ad74g",
        nome: "Juliana Pereira da Silva",
        assunto: "Solicitação de liberação de entrada",
        inclusao: "12/09/2024 09:12:45"
    },
    {
        id: "921bf85h",
        nome: "Ricardo Mendes Oliveira",
        assunto: "Manutenção de equipamentos",
        inclusao: "15/10/2024 14:08:33"
    },
    {
        id: "654ce96i",
        nome: "Ana Clara Martins",
        assunto: "Pedido de troca de lâmpadas",
        inclusao: "20/10/2024 10:45:22"
    },
    {
        id: "387df07j",
        nome: "Fernando Luiz Costa",
        assunto: "Visita agendada",
        inclusao: "25/09/2024 16:34:11"
    },
    {
        id: "473eg18k",
        nome: "Maria Eduarda Gomes",
        assunto: "Reparo na cerca elétrica",
        inclusao: "01/11/2024 11:50:18"
    },
    {
        id: "921bf85h",
        nome: "Ricardo Mendes Oliveira",
        assunto: "Troca de filtro na academia",
        inclusao: "15/10/2024 14:08:33"
    },
    {
        id: "654ce96i",
        nome: "Ana Clara Martins",
        assunto: "Solicitação de nova chave",
        inclusao: "20/10/2024 10:45:22"
    }
];

export const columns: ColumnDef<IOcorrencia>[] = [
    {
        accessorKey: "nome",
        header: "Solicitante",
    },
    {
        accessorKey: "assunto",
        header: "Assunto",
    },
    {
        accessorKey: "inclusao",
        header: "Inclusão",
    }
];