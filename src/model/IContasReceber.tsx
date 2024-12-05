import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IContasReceber {
    id: string
}

export const dataTest = [
    {
        id: "a01d7fbc",
        descricao: "Condomínio do mês 10/2024",
        tipo: "Fixo",
        valor: "R$ 344,45",
        vencimento: "30/11/2024",
        inclusao: "02/10/2024 15:23:12"
    },
    {
        id: "b56f3e4d",
        descricao: "Condomínio do mês 11/2024",
        tipo: "Fixo",
        valor: "R$ 355,00",
        vencimento: "30/12/2024",
        inclusao: "02/10/2024 15:25:45"
    },
    {
        id: "9d6c28d9",
        descricao: "Condomínio do mês 12/2024",
        tipo: "Fixo",
        valor: "R$ 366,75",
        vencimento: "31/01/2025",
        inclusao: "02/10/2024 15:27:10"
    },
    {
        id: "c32d7e53",
        descricao: "Condomínio do mês 01/2025",
        tipo: "Fixo",
        valor: "R$ 380,00",
        vencimento: "28/02/2025",
        inclusao: "02/10/2024 15:29:08"
    },
    {
        id: "d489a2db",
        descricao: "Condomínio do mês 02/2025",
        tipo: "Fixo",
        valor: "R$ 395,50",
        vencimento: "31/03/2025",
        inclusao: "02/10/2024 15:30:50"
    },
    {
        id: "e0a6875b",
        descricao: "Condomínio do mês 03/2025",
        tipo: "Fixo",
        valor: "R$ 400,10",
        vencimento: "30/04/2025",
        inclusao: "02/10/2024 15:32:35"
    },
    {
        id: "f13c86ad",
        descricao: "Condomínio do mês 04/2025",
        tipo: "Fixo",
        valor: "R$ 412,75",
        vencimento: "31/05/2025",
        inclusao: "02/10/2024 15:34:20"
    },
    {
        id: "45d6f7c1",
        descricao: "Condomínio do mês 05/2025",
        tipo: "Fixo",
        valor: "R$ 420,00",
        vencimento: "30/06/2025",
        inclusao: "02/10/2024 15:36:05"
    }
];

export const tipoSelect: keyValueOption[] = [
    {
        key: 1,
        value: "Fixo",
    },
    {
        key: 2,
        value: "Variável"
    }
];

export const columns: ColumnDef<IContasReceber>[] = [
    {
        accessorKey: "descricao",
        header: "Descrição",
    },
    {
        accessorKey: "tipo",
        header: "Tipo",
    },
    {
        accessorKey: "valor",
        header: "Valor",
    },
    {
        accessorKey: "vencimento",
        header: "Vencimento",
    },
    {
        accessorKey: "inclusao",
        header: "Inclusão",
    }
];