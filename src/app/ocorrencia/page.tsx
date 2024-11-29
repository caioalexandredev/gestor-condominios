"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { columns, dataTest, IOcorrencia } from "@/model/IOcorrencia";
import { useState } from "react";
import { IModal } from "@/model/IModal";
import Link from "next/link";
import ButtonSuccess from "@/components/button/ButtonSuccess";
import ButtonDanger from "@/components/button/ButtonDanger";
import Delete from "@/components/dialog/Delete";
import H1 from "@/components/core/title/H1";
import Card from "@/components/card/Card";
import H4 from "@/components/core/title/H4";
import Fields from "@/components/field/Fields";
import Text from "@/components/field/Text";
import Select from "@/components/field/Select";
import { DataTable } from "@/components/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";

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
                <Link href={`gestao/pessoa/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`gestao/pessoa/edicao/${row.original.id}`}>
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
            <Link href="/gestao/pessoa/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Card>
            <H4 className="text-slate-700">Filtros</H4>
            <hr className="mb-3" />
            <form>
                <Fields>
                    <Text label="Solicitante" id="solicitante" />
                    <Text label="Assunto" id="assunto" />
                </Fields>
                <ButtonPrimary isIcon={false}>
                    <FontAwesomeIcon icon={faFilter} /> Filtrar
                </ButtonPrimary>
            </form>
        </Card>

        <DataTable columns={columnsDataTable} data={dataTest} />
    </>);
}