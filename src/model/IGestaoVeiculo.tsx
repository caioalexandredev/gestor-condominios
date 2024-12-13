import { keyValueOption } from "@/components/field/Select";
import { ColumnDef } from "@tanstack/react-table";

export interface IGestaoVeiculo {
    id: string
}

export const dataTest = [
    {
        id: "654ce96i",
        proprietario: "Ana Clara Martins",
        placa: "HQC-8431",
        categoria: "Carro",
        modelo: "MINI STAR CE 1.0 8V 53cv (Pick-Up)",
        inclusao: "15/10/2024 14:08:33"
    },
    {
        id: "892fgh34",
        proprietario: "Carlos Eduardo Silva",
        placa: "ABC-1234",
        categoria: "Carro",
        modelo: "TOYOTA COROLLA 2.0 16V Flex",
        inclusao: "12/10/2024 10:15:00"
    },
    {
        id: "128hg834",
        proprietario: "Juliana Alves",
        placa: "XYZ-9876",
        categoria: "Moto",
        modelo: "HONDA CG 160 START",
        inclusao: "10/10/2024 08:20:45"
    },
    {
        id: "673bdk29",
        proprietario: "Lucas Pereira",
        placa: "JKL-5678",
        categoria: "Carro",
        modelo: "FIAT TORO FREEDOM 1.8 Flex",
        inclusao: "08/10/2024 16:30:15"
    },
    {
        id: "453qw764",
        proprietario: "Mariana Castro",
        placa: "GHQ-3456",
        categoria: "Carro",
        modelo: "FORD KA SE 1.5 12V Flex",
        inclusao: "05/10/2024 14:50:25"
    },
    {
        id: "875ghd32",
        proprietario: "Pedro Henrique Lima",
        placa: "MNO-4321",
        categoria: "Moto",
        modelo: "YAMAHA FAZER 250",
        inclusao: "03/10/2024 18:25:10"
    },
    {
        id: "983jd920",
        proprietario: "Renata Oliveira",
        placa: "PQR-8901",
        categoria: "Carro",
        modelo: "HYUNDAI HB20 1.0 Vision",
        inclusao: "01/10/2024 09:45:00"
    },
    {
        id: "762plm58",
        proprietario: "Felipe Santos",
        placa: "STU-4567",
        categoria: "Carro",
        modelo: "CHEVROLET ONIX 1.0 Turbo",
        inclusao: "28/09/2024 11:00:00"
    }
];

export const tipoSelect: keyValueOption[] = [
    {
        key: 1,
        value: "Carro",
    },
    {
        key: 2,
        value: "Moto",
    }
];

export const columns: ColumnDef<IGestaoVeiculo>[] = [
    {
        accessorKey: "proprietario",
        header: "Proprietário",
    },
    {
        accessorKey: "placa",
        header: "Placa",
    },
    {
        accessorKey: "categoria",
        header: "Categoria",
    },
    {
        accessorKey: "modelo",
        header: "Modelo",
    },
    {
        accessorKey: "inclusao",
        header: "Inclusão",
    }
];