import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IContasPagar {
    id: string
}

export const dataTest = [
    {
        id: "728ed52f",
        descricao: "Conta de energia do mês 10/2024",
        tipo: "Fixo",
        valor: "R$ 344,45",
        vencimento: "30/11/2024",
        inclusao: "02/10/2024 15:23:12"
    },
    {
        id: "42acb6f2",
        descricao: "Conta de água do mês 10/2024",
        tipo: "Fixo",
        valor: "R$ 128,90",
        vencimento: "30/11/2024",
        inclusao: "03/10/2024 08:45:22"
    },
    {
        id: "9be3a50d",
        descricao: "Internet e telefone do mês 10/2024",
        tipo: "Fixo",
        valor: "R$ 180,75",
        vencimento: "05/12/2024",
        inclusao: "04/10/2024 09:12:33"
    },
    {
        id: "d49f5c79",
        descricao: "Aluguel de imóvel - outubro/2024",
        tipo: "Fixo",
        valor: "R$ 1.500,00",
        vencimento: "10/11/2024",
        inclusao: "05/10/2024 14:03:50"
    },
    {
        id: "c3752eac",
        descricao: "Seguro de vida - outubro/2024",
        tipo: "Fixo",
        valor: "R$ 350,00",
        vencimento: "15/11/2024",
        inclusao: "06/10/2024 10:25:07"
    },
    {
        id: "b8d11e3f",
        descricao: "Assinatura de streaming - outubro/2024",
        tipo: "Fixo",
        valor: "R$ 49,90",
        vencimento: "20/11/2024",
        inclusao: "07/10/2024 16:34:58"
    },
    {
        id: "fa7f4b89",
        descricao: "Mensalidade de academia - outubro/2024",
        tipo: "Fixo",
        valor: "R$ 120,00",
        vencimento: "25/11/2024",
        inclusao: "08/10/2024 11:48:03"
    },
    {
        id: "c083adfc",
        descricao: "Pagamento do cartão de crédito - outubro/2024",
        tipo: "Fixo",
        valor: "R$ 980,50",
        vencimento: "28/11/2024",
        inclusao: "09/10/2024 17:01:14"
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

export const columns: ColumnDef<IContasPagar>[] = [
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
        cell: ({ row }) => {
            const valor = row.getValue<number>("valor");
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(valor);
        },
    },
    {
        accessorKey: "dt_vencimento",
        header: "Vencimento",
    },
    {
        accessorKey: "dt_inclusao",
        header: "Inclusão",
    }
];