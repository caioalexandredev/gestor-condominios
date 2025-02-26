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
import { loadContaTipo } from "@/domain/conta/data/fetchs";
import { loadContaReceberList } from "@/domain/conta/receber/data/fetchs";
import { notifyErro } from "@/lib/components/Alert";
import Loading from "@/lib/loading/Loading";
import LoadingPage from "@/lib/loading/LoadingPage";
import { columns, IContasReceber } from "@/model/IContasReceber";
import { IModal } from "@/model/IModal";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });
    const [list, setList] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(36);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        tipo: []
    });

    const defaultFilters = {
        descricao: "",
        tipo: "",
        dt_inicio_vencimento: "",
        dt_fim_vencimento: ""
    }

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            loadContaTipo()
        ];

        Promise.all(promises)
            .then(([tipo]) => {
                setSelectData({
                    tipo: tipo
                });
            })
            .finally(() => {
                setIsLoadingPage(false);
            });
    }, []);

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

            const listApi = await loadContaReceberList(isClear ? {} : filters, 1);
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
            loadContaReceberList(filters, currentPage)
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

    const columnsDataTable: ColumnDef<IContasReceber>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IContasReceber } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`/financeiro/contas/receber/visualizar/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`/financeiro/contas/receber/editar/${row.original.id}`}>
                    <ButtonPrimary isIcon={true}>
                        <FontAwesomeIcon icon={faEdit} />
                    </ButtonPrimary>
                </Link>
                <ButtonDanger onClick={() => open(parseInt(row.original.id))} isIcon={true}>
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonDanger>
            </div >)
        }
    }];

    function open(id: number): void {
        setStateDialogDelete((prevValues: IModal) => { return { ...prevValues, open: true, id: id }; });
    }

    if (isLoadingPage) {
        return (<Loading />);
    }

    return (<>
        <Delete
            action="/api/conta/receber"
            state={stateDialogDelete}
            setState={setStateDialogDelete}
            fetchData={fetchDados}
        />

        <H1>Contas a Receber</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/financeiro/contas/receber/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter onClickFilter={() => { fetchDados(false) }} onClickClear={() => { fetchDados(true) }}>
            <Text
                label="Descrição"
                id="descricao"
                value={filters.descricao} onChange={(e: any) => { setFilters({ ...filters, descricao: e.target.value }); }}
            />
            <Select
                label="Tipo"
                id="tipo"
                data={selectData.tipo}
                onChange={(e: any) => { setFilters({ ...filters, tipo: e.target.value }); }}
            />
            <Date
                label="Vencimento | Início"
                id="dt_inicio_vencimento"
                value={filters.dt_inicio_vencimento}
                onChange={(e: any) => { setFilters({ ...filters, dt_inicio_vencimento: e.target.value }); }}
            />
            <Date
                label="Vencimento | Fim"
                id="dt_fim_vencimento"
                value={filters.dt_fim_vencimento}
                onChange={(e: any) => { setFilters({ ...filters, dt_fim_vencimento: e.target.value }); }}
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