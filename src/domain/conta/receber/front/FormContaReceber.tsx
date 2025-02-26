"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Select from "@/components/field/Select";
import Text from "@/components/field/Text";
import Column from "@/components/layout/Column";
import Row from "@/components/layout/Row";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { notifySucess, notifyWarning } from "@/lib/components/Alert";
import { useRouter } from "next/navigation";
import Loading from "@/lib/loading/Loading";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import Link from "next/link";
import { loadContaReceber, loadContaReceberCategoria } from "../data/fetchs";
import { loadContaStatus, loadContaTipo } from "../../data/fetchs";
import Date from "@/components/field/Date";
import { loadPropriedadeSelect } from "@/domain/propriedade/data/fetchs";
import { loadPessoaSelect } from "@/domain/pessoa/data/fetchs";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormContaReceber({
    id,
    isView = false,
    title = "Cadastrar Conta a Receber",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        status: [],
        tipo: [],
        categoria: [],
        propriedade: [],
        pessoa: []
    });

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            id ? loadContaReceber(id) : Promise.resolve(),
            loadContaTipo(),
            loadContaStatus(),
            loadContaReceberCategoria(),
            loadPropriedadeSelect(),
            loadPessoaSelect()
        ];

        Promise.all(promises)
            .then(([contaReceber, tipo, status, categoria, propriedade, pessoa]) => {
                setSelectData({
                    status: status,
                    tipo: tipo,
                    categoria: categoria,
                    propriedade: propriedade,
                    pessoa: pessoa
                });

                if (contaReceber) {
                    reset({
                        ...contaReceber.data
                    });
                }
            })
            .finally(() => {
                setIsLoadingPage(false);
            });
    }, []);

    const onSubmit = async (data: any | unknown) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/conta/receber/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/financeiro/contas/receber");
            } else {
                notifyWarning("Falha ao salvar o registro");
            }
        } catch (error) {
            notifyWarning("Falha ao salvar o registro: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingPage) {
        return (<Loading />);
    }

    return (<>
        <H1>{title}</H1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mt-3">
                <H4 className="text-slate-700">Informações da Conta</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={4}>
                        <Text
                            label="Descrição*"
                            id="descricao"
                            {...register("descricao", {
                                ...createValidationRule('Descrição', "required", true),
                                ...createValidationRule('Descrição', "maxLength", 150)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={4}>
                        <Text
                            label="Valor*"
                            id="valor"
                            type="number"
                            step="0.01"
                            {...register("valor", {
                                ...createValidationRule('Valor', "required", true),
                                ...createValidationRule('Valor', "min", 0.01)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Select
                            label="Tipo*"
                            id="tipo"
                            data={selectData.tipo}
                            {...register("tipo", {
                                ...createValidationRule('Tipo', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={6}>
                        <Date
                            label="Data de Vencimento*"
                            id="vencimento"
                            {...register("vencimento", {
                                ...createValidationRule('Data de Vencimento', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Select
                            label="Status da Conta*"
                            id="status"
                            data={selectData.status}
                            {...register("status", {
                                ...createValidationRule('Status', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>

            <Card>
                <H4 className="text-slate-700">Informações do Proprietário</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Select
                            label="Proprietário*"
                            id="proprietario"
                            {...register("proprietario", {
                                ...createValidationRule('Proprietário', "required", true)
                            })}
                            data={selectData.pessoa}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Select
                            label="Apartamento/Unidade*"
                            id="unidade"
                            {...register("propriedade", {
                                ...createValidationRule('Apartamento/Unidade', "required", true)
                            })}
                            data={selectData.propriedade}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>

            <Card>
                <H4 className="text-slate-700">Categoria e Observações</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Select
                            label="Categoria*"
                            id="categoria"
                            data={selectData.categoria}
                            {...register("categoria", {
                                ...createValidationRule('Categoria', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Text
                            label="Observações"
                            id="observacao"
                            {...register("observacao")}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>
            <div className="flex justify-end space-x-2">
                {!isView && (
                    <ButtonPrimary disabled={isLoading}>
                        <FontAwesomeIcon icon={faSave} /> {isLoading ? ("Salvando...") : ("Salvar")}
                    </ButtonPrimary>
                )}
                <Link href={'/financeiro/contas/receber'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}