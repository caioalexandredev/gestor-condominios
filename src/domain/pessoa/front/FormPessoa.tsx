"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Date from "@/components/field/Date";
import Select from "@/components/field/Select";
import Text from "@/components/field/Text";
import Column from "@/components/layout/Column";
import Row from "@/components/layout/Row";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Email from "@/components/field/Email";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { notifySucess, notifyWarning } from "@/lib/components/Alert";
import { useRouter } from "next/navigation";
import { loadEstado } from "@/domain/estado/data/fetchs";
import { loadCidade } from "@/domain/cidade/data/fetchs";
import { maskCelular, maskCpf, maskTelefone } from "@/lib/util/Mask";
import Loading from "@/lib/loading/Loading";
import { loadPessoa } from "../data/fetchs";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import Link from "next/link";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormPessoa({
    id, 
    isView = false,
    title = "Cadastrar Pessoa",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        estado: [],
        cidade: []
    });

    const [uf, setUf] = useState("");

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            loadEstado(),
            id ? loadPessoa(id) : Promise.resolve()
        ];

        Promise.all(promises)
            .then(([estado, pessoa]) => {

                if (pessoa) {
                    setSelectData({
                        cidade: pessoa.data.select_cidade,
                        estado: estado
                    });
                    reset({...pessoa.data,
                        cpf: maskCpf(pessoa.data.cpf),
                        telefone: maskTelefone(pessoa.data.telefone),
                        celular: maskCelular(pessoa.data.celular),
                        cidade: "12523"
                    });
                }else {
                    setSelectData({
                        cidade: [],
                        estado: estado
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
            const response = await fetch(`/api/pessoa/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/gestao/pessoa");
            } else {
                notifyWarning("Falha ao salvar o registro");
            }
        } catch (error) {
            notifyWarning("Falha ao salvar o registro: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    const onInputForm: any = (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if ((event.target as HTMLInputElement).id === 'cpf') {
            (event.target as HTMLInputElement).value = maskCpf(value);
        } else if ((event.target as HTMLInputElement).id === 'celular') {
            (event.target as HTMLInputElement).value = maskCelular(value);
        } else if ((event.target as HTMLInputElement).id === 'telefone') {
            (event.target as HTMLInputElement).value = maskTelefone(value);
        }
    };

    if (isLoadingPage) {
        return (<Loading />);
    }

    return (<>
        <H1>{title}</H1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mt-3">
                <H4 className="text-slate-700">Dados Pessoais</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Text
                            label="Nome*"
                            id="nome"
                            {...register("nome", {
                                ...createValidationRule('Nome', "required", true),
                                ...createValidationRule('Nome', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Text
                            label="Sobrenome*"
                            id="sobrenome"
                            {...register("sobrenome", {
                                ...createValidationRule('Sobrenome', "required", true),
                                ...createValidationRule('Sobrenome', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Date
                            label="Data de Nascimento*"
                            id="dt_nascimento"
                            {...register("dt_nascimento", {
                                ...createValidationRule('Data de Nascimento', "required", true),
                                ...createValidationRule('Data de Nascimento', "min", '1900-01-01')
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Select
                            id="sexo"
                            label="Sexo*"
                            data={[
                                { key: "F", value: "Feminino" },
                                { key: "M", value: "Masculino" },
                                { key: "O", value: "Outro" }
                            ]}
                            {...register("sexo", {
                                ...createValidationRule('Sexo', "required", true)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="cpf"
                            label="CPF*"
                            {...register("cpf", {
                                ...createValidationRule('CPF', "required", true),
                                ...createValidationRule('CPF', "minLength", 14),
                                ...createValidationRule('CPF', "maxLength", 14)
                            })}
                            onInput={onInputForm}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="naturalidade"
                            label="Naturalidade*"
                            {...register("naturalidade", {
                                ...createValidationRule('Naturalidade', "required", true),
                                ...createValidationRule('Naturalidade', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Text
                            id="rg"
                            label="RG*"
                            {...register("rg", {
                                ...createValidationRule('RG', "required", true),
                                ...createValidationRule('RG', "maxLength", 20)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Date
                            id="dt_emissao"
                            label="Data de Emissão*"
                            {...register("dt_emissao", {
                                ...createValidationRule('Data de Emissão', "required", true),
                                ...createValidationRule('Data de Emissão', "min", '1900-01-01')
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="orgao_emissao"
                            label="Órgão de Emissão*"
                            {...register("orgao_emissao", {
                                ...createValidationRule('Órgão de Emissão', "required", true),
                                ...createValidationRule('Órgão de Emissão', "maxLength", 50)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>

            <Card>
                <H4 className="text-slate-700">Contatos</H4>
                <hr className="mb-3" />
                <Row>
                    <Column>
                        <Text
                            id="telefone"
                            label="Telefone*"
                            {...register("telefone", {
                                ...createValidationRule('Telefone', "required", true),
                                ...createValidationRule('Telefone', "maxLength", 255)
                            })}
                            onInput={onInputForm}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="celular"
                            label="Celular*"
                            {...register("celular", {
                                ...createValidationRule('Celular', "required", true),
                                ...createValidationRule('Celular', "maxLength", 255)
                            })}
                            onInput={onInputForm}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Email
                            id="email"
                            label="Email*"
                            {...register("email", {
                                ...createValidationRule('Email', "required", true),
                                ...createValidationRule('Email', "maxLength", 255)
                            })}
                            disabled={isView}
                            errors={errors}
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
                <Link href={'/gestao/pessoa'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}