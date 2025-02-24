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
import { loadEstado } from "@/domain/estado/data/fetchs";
import { loadCidade } from "@/domain/cidade/data/fetchs";
import { maskCelular, maskCpf, maskTelefone } from "@/lib/util/Mask";
import Loading from "@/lib/loading/Loading";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import Link from "next/link";
import { loadPropriedade, loadTipoSelect } from "../data/fetchs";
import TextArea from "@/components/field/TextArea";
import { loadPessoaSelect } from "@/domain/pessoa/data/fetchs";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormPropriedade({
    id,
    isView = false,
    title = "Cadastrar Propriedade",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        proprietario: [],
        tipo: [],
        estado: [],
        cidade: []
    });

    const [uf, setUf] = useState("");

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            loadEstado(),
            id ? loadPropriedade(id) : Promise.resolve(),
            loadPessoaSelect(),
            loadTipoSelect()
        ];

        Promise.all(promises)
            .then(([estado, propriedade, proprietario, tipo]) => {

                if (propriedade) {
                    setSelectData({
                        cidade: propriedade.data.select_cidade,
                        estado: estado,
                        tipo: tipo,
                        proprietario: proprietario
                    });
                    reset({
                        ...propriedade.data
                    });
                } else {
                    setSelectData({
                        cidade: [],
                        estado: estado,
                        tipo: tipo,
                        proprietario: proprietario
                    });
                }
            })
            .finally(() => {
                setIsLoadingPage(false);
            });
    }, []);

    useEffect(() => {
        if (uf != "") {
            const promises = [
                loadCidade(uf)
            ];

            Promise.all(promises)
                .then(([cidade]) => {
                    setSelectData({
                        ...selectData,
                        cidade: cidade
                    })
                })
                .finally(() => {
                    setIsLoadingPage(false);
                });
        }

    }, [uf]);

    const onSubmit = async (data: any | unknown) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/propriedade/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/gestao/propriedade");
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
                <H4 className="text-slate-700">Dados Básicos</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Select
                            id="proprietario"
                            label="Proprietário*"
                            data={selectData.proprietario}
                            {...register("proprietario", {
                                ...createValidationRule('Proprietário', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Select
                            id="tipo"
                            label="Tipo*"
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
                    <Column size={12}>
                        <TextArea
                            id="observacao"
                            label="Observação*"
                            className="min-h-52"
                            data={selectData.proprietario}
                            {...register("observacao", {
                                ...createValidationRule('Observação', "required", true)
                            })}
                            disabled={isView}
                        />
                    </Column>
                </Row>
            </Card>
            
            <Card>
                <H4 className="text-slate-700">Endereço</H4>
                <hr className="mb-3" />
                <Row>
                    <Column>
                        <Text
                            id="cep"
                            label="CEP*"
                            {...register("cep", {
                                ...createValidationRule('CEP', "required", true),
                                ...createValidationRule('CEP', "maxLength", 20)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Select
                            id="uf"
                            label="UF*"
                            {...register("uf", {
                                ...createValidationRule('UF', "required", true)
                            })}
                            data={selectData.estado}
                            onChange={(e: any) => { setUf(e.target.value); }}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Select
                            id="cidade"
                            label="Cidade*"
                            {...register("cidade", {
                                ...createValidationRule('Cidade', "required", true)
                            })}
                            data={selectData.cidade}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Text
                            id="logradouro"
                            label="Logradouro*"
                            {...register("logradouro", {
                                ...createValidationRule('Logradouro', "required", true),
                                ...createValidationRule('Logradouro', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="bairro"
                            label="Bairro*"
                            {...register("bairro", {
                                ...createValidationRule('Bairro', "required", true),
                                ...createValidationRule('Bairro', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="numero"
                            label="Número*"
                            {...register("numero", {
                                ...createValidationRule('Número', "required", true),
                                ...createValidationRule('Número', "maxLength", 50)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={6}>
                        <Text
                            id="complemento"
                            label="Complemento*"
                            {...register("complemento", {
                                ...createValidationRule('Complemento', "required", true),
                                ...createValidationRule('Complemento', "maxLength", 255)
                            })}
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
                <Link href={'/gestao/propriedade'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}