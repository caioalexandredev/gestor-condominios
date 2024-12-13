"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { columns, dataTest, IOcorrencia } from "@/model/IOcorrencia";
import { useState } from "react";
import { IModal } from "@/model/IModal";
import Link from "next/link";
import ButtonSuccess from "@/components/button/ButtonSuccess";
import ButtonDanger from "@/components/button/ButtonDanger";
import Delete from "@/components/dialog/Delete";
import H1 from "@/components/core/title/H1";
import Text from "@/components/field/Text";
import { DataTable } from "@/components/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Filter from "@/components/list/Filter";

export default function Page() {
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });

    const columnsDataTable: ColumnDef<IOcorrencia>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IOcorrencia } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`ocorrencia/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`ocorrencia/edicao/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={ open } isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }]

    function open(): void
    {
        setStateDialogDelete((prevValues: IModal) => { return {...prevValues, open: true};});
    }

    return (<>
        <Delete state={stateDialogDelete} setState={setStateDialogDelete} />
        
        <H1>Livro de Ocorrências</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/ocorrencia/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter>
            <Text label="Solicitante" id="solicitante" />
            <Text label="Assunto" id="assunto" />
        </Filter>

        <DataTable columns={columnsDataTable} data={dataTest} />
    </>);
}