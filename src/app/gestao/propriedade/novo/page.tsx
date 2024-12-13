"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Text from "@/components/field/Text";
import Date from "@/components/field/Date";
import Select from "@/components/field/Select";
import Row from "@/components/layout/Row";
import Column from "@/components/layout/Column";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function PaymentAccountRegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any | unknown) => console.log(data);

    return (
        <>
            <H1>Cadastro de Conta a Pagar</H1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-3">
                    <H4 className="text-slate-700">Informações da Conta</H4>
                    <hr className="mb-3" />
                    <Row>
                        <Column size={6}>
                            <Text
                                label="Descrição*"
                                id="descricao"
                                {...register("descricao", {
                                    ...createValidationRule('Descrição', "required", true),
                                    ...createValidationRule('Descrição', "maxLength", 150)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Text
                                label="Valor*"
                                id="valor"
                                type="number"
                                step="0.01"
                                {...register("valor", {
                                    ...createValidationRule('Valor', "required", true),
                                    ...createValidationRule('Valor', "min", 0.01)
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column size={6}>
                            <Date
                                label="Data de Vencimento*"
                                id="data_vencimento"
                                {...register("data_vencimento", {
                                    ...createValidationRule('Data de Vencimento', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Select
                                label="Status da Conta*"
                                id="status"
                                data={[
                                    { key: "pendente", value: "Pendente" },
                                    { key: "pago", value: "Pago" },
                                    { key: "atrasado", value: "Atrasado" }
                                ]}
                                {...register("status", {
                                    ...createValidationRule('Status', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                </Card>

                <Card>
                    <H4 className="text-slate-700">Informações do Fornecedor</H4>
                    <hr className="mb-3" />
                    <Row>
                        <Column size={6}>
                            <Text
                                label="Nome do Fornecedor*"
                                id="fornecedor"
                                {...register("fornecedor", {
                                    ...createValidationRule('Nome do Fornecedor', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Text
                                label="CNPJ/CPF*"
                                id="cnpj_cpf"
                                {...register("cnpj_cpf", {
                                    ...createValidationRule('CNPJ/CPF', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column size={6}>
                            <Text
                                label="Telefone*"
                                id="telefone"
                                {...register("telefone", {
                                    ...createValidationRule('Telefone', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Text
                                label="E-mail"
                                id="email"
                                {...register("email")}
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
                                data={[
                                    { key: "agua", value: "Água" },
                                    { key: "energia", value: "Energia" },
                                    { key: "manutencao", value: "Manutenção" },
                                    { key: "servico", value: "Serviço" }
                                ]}
                                {...register("categoria", {
                                    ...createValidationRule('Categoria', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Text
                                label="Observações"
                                id="observacoes"
                                {...register("observacoes")}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                </Card>

                <div className="flex justify-end">
                    <ButtonPrimary>
                        <FontAwesomeIcon icon={faSave} /> Salvar
                    </ButtonPrimary>
                </div>
            </form>
        </>
    );
}
