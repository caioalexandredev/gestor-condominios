"use client";

import ButtonDanger from "@/components/button/ButtonDanger";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSuccess from "@/components/button/ButtonSuccess";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Delete from "@/components/dialog/Delete";
import Date from "@/components/field/Date";
import Fields from "@/components/field/Fields";
import Text from "@/components/field/Text";
import { DataTable } from "@/components/table/DataTable";
import { IContasGestao } from "@/model/IContasGestao";
import { columns, dataTest, IContasPagar } from "@/model/IContasPagar";
import { IModal } from "@/model/IModal";
import { faAdd, faEdit, faEye, faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

export default function Page(){
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });

    const columnsDataTable: ColumnDef<IContasGestao>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IContasPagar } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`financeiro/gestao/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`financeiro/gestao/edicao/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={ open } isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }];

    function open(): void
    {
        setStateDialogDelete((prevValues: IModal) => { return {...prevValues, open: true};});
    }

    return (<>
        <Delete state={stateDialogDelete} setState={setStateDialogDelete} />
        
        <H1>
            Gestão de Cobrança
        </H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/financeiro/gestao/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Card>
            <H4 className="text-slate-700">Filtros</H4>
            <hr className="mb-3" />
            <form>
                <Fields>
                    <Text label="Descrição" id="descricao" />
                    <Date label="Ínicio" />
                    <Date label="Fim" />
                </Fields>
                <ButtonPrimary isIcon={false}>
                    <FontAwesomeIcon icon={faFilter} /> Filtrar
                </ButtonPrimary>
            </form>
        </Card>

        <DataTable columns={columnsDataTable} data={dataTest} />
    </>);
}