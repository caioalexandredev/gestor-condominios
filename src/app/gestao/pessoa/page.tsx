"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { columns, IGestaoPessoa, tipoSelect } from "@/model/IGestaoPessoa";
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
import { loadPessoaList } from "@/domain/pessoa/data/fetchs";
import LoadingPage from "@/lib/loading/LoadingPage";
import { notifyErro } from "@/lib/components/Alert";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [stateDialogDelete, setStateDialogDelete] = useState<IModal>({
        id: 0,
        open: false
    });
    const [list, setList] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(36);

    const defaultFIlters = {
        cpf: "",
        rg: "",
        nome: ""
    }

    const [filters, setFilters] = useState(defaultFIlters);

    const fetchDados = async (isClear: boolean = false, pageInternal: number|undefined = 1) => {
        try {
            setIsLoading(true);
            
            if(pageInternal){
                setCurrentPage(pageInternal);
            }

            if (isClear) {
                setFilters(defaultFIlters);
            }

            const listApi = await loadPessoaList(isClear ? {} : filters, 1);
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
            loadPessoaList(filters, currentPage)
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
    

    const columnsDataTable: ColumnDef<IGestaoPessoa>[] = [...columns, {
        id: "actions",
        header: "Ações",
        cell: ({ row }: { row: { id: string; original: IGestaoPessoa } }) => {
            return (<div className="inline-flex gap-x-2">
                <Link href={`/gestao/pessoa/visualizar/${row.original.id}`}>
                    <ButtonSuccess isIcon={true}>
                        <FontAwesomeIcon icon={faEye} />
                    </ButtonSuccess>
                </Link>
                <Link href={`/gestao/pessoa/editar/${row.original.id}`}>
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

    return (<>
        <Delete 
            action="/api/pessoa" 
            state={stateDialogDelete} 
            setState={setStateDialogDelete} 
            fetchData={fetchDados}
        />

        <H1>Gestão de Pessoas</H1>

        <div className={"flex justify-end mb-3"}>
            <Link href="/gestao/pessoa/novo">
                <ButtonPrimary><FontAwesomeIcon icon={faAdd} />Cadastrar</ButtonPrimary>
            </Link>
        </div>

        <Filter onClickFilter={() => {fetchDados(false)}} onClickClear={() => {fetchDados(true)}}>
            <Text
                label="Nome Completo"
                id="nome_completo"
                value={filters.nome} onChange={(e: any) => { setFilters({ ...filters, nome: e.target.value }); }}
            />
            <Text
                label="CPF"
                id="cpf"
                value={filters.cpf}
                onChange={(e: any) => { setFilters({ ...filters, cpf: e.target.value }); }}
            />
            <Text
                label="RG"
                id="rg"
                value={filters.rg}
                onChange={(e: any) => { setFilters({ ...filters, rg: e.target.value }); }
                } />
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