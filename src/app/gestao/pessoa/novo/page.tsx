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
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import IMask from 'imask';

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    const inputCPF = useRef(null);

    useEffect(() => {
        if (inputCPF.current) {
            IMask(inputCPF.current, {
                mask: '000.000.000-00',
            });
        }
    }, []);

    return (<>
        <H1>Cadastrar Pessoa</H1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mt-3">
                <H4 className="text-slate-700">Dados Pessoais</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Text
                            label="Nome"
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
                            label="Sobrenome"
                            id="sobrenome"
                            {...register("sobrenome", {
                                ...createValidationRule('Sobrenome', "required", true)
                            })}
                            maxLength="150"
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Date
                            label="Data de Nascimento"
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
                            label="Sexo"
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
                            label="CPF"
                            minLength="14"
                            {...register("cpf", {
                                ...createValidationRule('CPF', "required", true)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Text
                            id="naturalidade"
                            label="Naturalidade"
                            {...register("naturalidade", {
                                ...createValidationRule('Naturalidade', "required", true),
                                ...createValidationRule('Naturalidade', "minLength", 100)
                            })}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Text
                            id="rg"
                            label="RG"
                            {...register("rg", {
                                ...createValidationRule('RG', "required", true),
                                ...createValidationRule('RG', "minLength", 50)
                            })}
                            errors={errors}
                        />
                    </Column>
                    <Column>
                        <Date
                            id="dt_emissao"
                            label="Data de Emissão"
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
                            label="Órgão de Emissão"
                            {...register("orgao_emissao", {
                                ...createValidationRule('Órgão de Emissão', "required", true),
                                ...createValidationRule('Órgão de Emissão', "minLength", 50)
                            })}
                            errors={errors}
                        />
                    </Column>
                </Row>
            </Card>

            <Card>
                <H4 className="text-slate-700">Contatos</H4>
                <hr className="mb-3" />
            </Card>

            <Card>
                <H4 className="text-slate-700">Endereço</H4>
                <hr className="mb-3" />
            </Card>

            <ButtonPrimary>
                Salvar
            </ButtonPrimary>
        </form>
    </>)
}