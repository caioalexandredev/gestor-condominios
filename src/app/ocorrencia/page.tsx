"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { columns, IOcorrencia } from "@/model/IOcorrencia";
import { useEffect, useState } from "react";
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
import { loadOcorrenciaList } from "@/domain/ocorrencia/data/fetchs";
import { notifyErro } from "@/lib/components/Alert";
import Date from "@/components/field/Date";
import LoadingPage from "@/lib/loading/LoadingPage";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });
    const [list, setList] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(36);

    const defaultFilters = {
        assunto: "",
        solicitante: "",
        dt_inicio_ocorrencia: "",
        dt_fim_ocorrencia: ""
    }

    const [filters, setFilters] = useState(defaultFilters);

    const fetchDados = async (isClear: boolean = false, pageInternal: number | undefined = 1) => {
        try {
            setIsLoading(true);

            if (pageInternal) {
                setCurrentPage(pageInternal);
            }

            if (isClear) {
                setFilters(defaultFilters);
            }

            const listApi = await loadOcorrenciaList(isClear ? {} : filters, 1);
            setList(listApi);
            setTotalItems(listApi?.data?.total ?? 0);
        } catch (error) {
            notifyErro("Houveram erros durante a pesquisa.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const promises = [
            loadOcorrenciaList(filters, currentPage)
        ];

        Promise.all(promises)
            .then(([listApi]) => {
                setList(listApi);
                setTotalItems(listApi?.data?.total ?? 0);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentPage]);

    const columnsDataTable: ColumnDef<IOcorrencia>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IOcorrencia } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`ocorrencia/visualizar/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`ocorrencia/editar/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={() => open(parseInt(row.original.id))} isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }]

    function open(id: number): void {
        setStateDialogDelete((prevValues: IModal) => { return { ...prevValues, open: true, id: id }; });
    }

    return (<>
        <Delete
            action="/api/ocorrencia"
            state={stateDialogDelete}
            setState={setStateDialogDelete}
            fetchData={fetchDados}
        />

        <H1>Livro de Ocorrências</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/ocorrencia/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter onClickFilter={() => { fetchDados(false) }} onClickClear={() => { fetchDados(true) }}>
            <Text
                label="Assunto"
                id="assunto"
                value={filters.assunto} onChange={(e: any) => { setFilters({ ...filters, assunto: e.target.value }); }}
            />
            <Date
                label="Ocorrência | Início"
                id="dt_inicio_ocorrencia"
                value={filters.dt_inicio_ocorrencia}
                onChange={(e: any) => { setFilters({ ...filters, dt_inicio_ocorrencia: e.target.value }); }}
            />
            <Date
                label="Ocorrência | Fim"
                id="dt_fim_ocorrencia"
                value={filters.dt_fim_ocorrencia}
                onChange={(e: any) => { setFilters({ ...filters, dt_fim_ocorrencia: e.target.value }); }}
            />
        </Filter>

        {isLoading ? (<LoadingPage />) : (
            <DataTable
                columns={columnsDataTable}
                data={list?.data?.resultado ?? []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
            />
        )}
    </>);
}