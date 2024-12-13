"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { columns, dataTest, IInformativo, visibilidadeSelect } from "@/model/IInformativo";
import { useState } from "react";
import { IModal } from "@/model/IModal";
import Link from "next/link";
import ButtonSuccess from "@/components/button/ButtonSuccess";
import ButtonDanger from "@/components/button/ButtonDanger";
import Delete from "@/components/dialog/Delete";
import H1 from "@/components/core/title/H1";
import Text from "@/components/field/Text";
import Select from "@/components/field/Select";
import { DataTable } from "@/components/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Filter from "@/components/list/Filter";

export default function Page() {
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });

    const columnsDataTable: ColumnDef<IInformativo>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IInformativo } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`informativo/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`informativo/edicao/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={open} isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }]

    function open(): void {
        setStateDialogDelete((prevValues: IModal) => { return { ...prevValues, open: true }; });
    }

    return (<>
        <Delete state={stateDialogDelete} setState={setStateDialogDelete} />

        <H1>Gestão de Informativos</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/informativo/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter>
            <Text label="Titulo" id="titulo" />
            <Select label="Visibilidade" id="visibilidade" data={visibilidadeSelect} />
        </Filter>

        <DataTable columns={columnsDataTable} data={dataTest} />
    </>);
}