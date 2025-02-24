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
import { loadPessoaSelect } from "@/domain/pessoa/data/fetchs";
import { loadCategoriaSelect, loadCorSelect, loadMarcaSelect, loadVeiculo } from "../data/fetchs";
import { loadPropriedadeSelect } from "@/domain/propriedade/data/fetchs";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormVeiculo({
    id,
    isView = false,
    title = "Cadastrar Veículo",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        proprietario: [],
        propriedade: [],
        categoria: [],
        marca: [],
        cor: []
    });

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            id ? loadVeiculo(id) : Promise.resolve(),
            loadCorSelect(),
            loadMarcaSelect(),
            loadCategoriaSelect(),
            loadPessoaSelect(),
            loadPropriedadeSelect()
        ];

        Promise.all(promises)
            .then(([veiculo, cor, marca, categoria, proprietario, propriedade]) => {
                setSelectData({
                    cor: cor,
                    marca: marca,
                    categoria: categoria,
                    proprietario: proprietario,
                    propriedade: propriedade,
                });

                if (veiculo) {
                    reset({
                        ...veiculo.data
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
            const response = await fetch(`/api/veiculo/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/gestao/veiculo");
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
                <H4 className="text-slate-700">Informações do Veículo</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Text
                            label="Placa do Veículo*"
                            id="placa"
                            maxLength="8"
                            {...register("placa", {
                                ...createValidationRule('Placa', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Select
                            label="Marca do Veículo*"
                            id="marca"
                            data={selectData.marca}
                            {...register("marca", {
                                ...createValidationRule('Marca', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={6}>
                        <Text
                            label="Modelo do Veículo*"
                            id="modelo"
                            maxLength="50"
                            {...register("modelo", {
                                ...createValidationRule('Modelo', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Text
                            label="Ano de Fabricação*"
                            id="ano"
                            type="number"
                            {...register("ano", {
                                ...createValidationRule('Ano de Fabricação', "required", true),
                                ...createValidationRule('Ano de Fabricação', "min", 1900),
                                ...createValidationRule('Ano de Fabricação', "max", new Date().getFullYear())
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={6}>
                        <Select
                            label="Cor do Veículo*"
                            id="cor"
                            data={selectData.cor}
                            {...register("cor", {
                                ...createValidationRule('Cor', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
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
                            data={selectData.proprietario}
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
            <div className="flex justify-end space-x-2">
                {!isView && (
                    <ButtonPrimary disabled={isLoading}>
                        <FontAwesomeIcon icon={faSave} /> {isLoading ? ("Salvando...") : ("Salvar")}
                    </ButtonPrimary>
                )}
                <Link href={'/gestao/veiculo'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}