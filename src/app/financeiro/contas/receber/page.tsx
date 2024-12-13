"use client";

import ButtonDanger from "@/components/button/ButtonDanger";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSuccess from "@/components/button/ButtonSuccess";
import H1 from "@/components/core/title/H1";
import Delete from "@/components/dialog/Delete";
import Date from "@/components/field/Date";
import Select from "@/components/field/Select";
import Text from "@/components/field/Text";
import Filter from "@/components/list/Filter";
import { DataTable } from "@/components/table/DataTable";
import { columns, dataTest, IContasReceber, tipoSelect } from "@/model/IContasReceber";
import { IModal } from "@/model/IModal";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });

    const columnsDataTable: ColumnDef<IContasReceber>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IContasReceber } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`financeiro/contas/receber/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`financeiro/contas/receber/edicao/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={open} isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }];

    function open(): void {
        setStateDialogDelete((prevValues: IModal) => { return { ...prevValues, open: true }; });
    }

    return (<>
        <Delete state={stateDialogDelete} setState={setStateDialogDelete} />

        <H1>Contas a Pagar</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/financeiro/contas/receber/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter>
            <Text label="Descrição" id="descricao" />
            <Select label="Tipo" id="tipo" data={tipoSelect} />
            <Date label="Ínicio" />
            <Date label="Fim" />
        </Filter>

        <DataTable columns={columnsDataTable} data={dataTest} />
    </>);
}