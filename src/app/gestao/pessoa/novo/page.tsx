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
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { notifySucess, notifyWarning } from "@/lib/components/Alert";
import { useRouter } from "next/navigation";
import { loadEstado } from "@/domain/estado/data/fetchs";
import { loadCidade } from "@/domain/cidade/data/fetchs";

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [select, setSelect] = useState({
        estado: [],
        cidade: []
    });

    const [uf, setUf] = useState("");

    useEffect(() => {
        setIsLoadingPage(true);
    
        const promises = [
            loadEstado()
        ];
    
        Promise.all(promises)
            .then(([estado]) => {
                setSelect({
                    ...select,
                    estado: estado
                })
            })
            .finally(() => {
                setIsLoadingPage(false);
            });
    }, []);

    useEffect(() => {
        const promises = [
            loadCidade(uf)
        ];
    
        Promise.all(promises)
            .then(([cidade]) => {
                setSelect({
                    ...select,
                    cidade: cidade
                })
            })
            .finally(() => {
                setIsLoadingPage(false);
            });
    }, [uf]);

    const onSubmit = async (data: any | unknown) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/pessoa", {
                method: "POST",
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

    return (<>
        <H1>Cadastrar Pessoa</H1>

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
                                ...createValidationRule('Nome', "required", true)
                            })}
                            maxLength="150"
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Text
                            label="Sobrenome*"
                            id="sobrenome"
                            {...register("sobrenome", {
                                ...createValidationRule('Sobrenome', "required", true),
                                ...createValidationRule('Naturalidade', "maxLength", 150)
                            })}
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
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="cpf"
                            label="CPF*"
                            {...register("cpf", {
                                ...createValidationRule('CPF', "required", true),
                                ...createValidationRule('Naturalidade', "minLength", 14),
                                ...createValidationRule('Naturalidade', "maxLength", 14)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="naturalidade"
                            label="Naturalidade*"
                            {...register("naturalidade", {
                                ...createValidationRule('Naturalidade', "required", true),
                                ...createValidationRule('Naturalidade', "maxLength", 100)
                            })}
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
                                ...createValidationRule('RG', "maxLength", 50)
                            })}
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
                            label="Telefone"
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="celular"
                            label="Celular*"
                            {...register("celular", {
                                ...createValidationRule('Celular', "required", true)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Email
                            id="email"
                            label="Email*"
                            {...register("Email", {
                                ...createValidationRule('Email', "required", true)
                            })}
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
                                ...createValidationRule('CEP', "required", true)
                            })}
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
                            data={select.estado}
                            onChange={(e: any)=>{setUf(e.target.value);}}
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
                            data={select.cidade}
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
                                ...createValidationRule('Logradouro', "required", true)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="bairro"
                            label="Bairro*"
                            {...register("bairro", {
                                ...createValidationRule('Bairro', "required", true)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="numero"
                            label="Número*"
                            {...register("numero", {
                                ...createValidationRule('Número', "required", true)
                            })}
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
                                ...createValidationRule('Complemento', "required", true)
                            })}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>

            <div className="flex justify-end">
                <ButtonPrimary disabled={isLoading}>
                    <FontAwesomeIcon icon={faSave} /> {isLoading ? ("Salvando...") : ("Salvar")}
                </ButtonPrimary>
            </div>
        </form>
    </>)
}