"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Text from "@/components/field/Text";
import Select from "@/components/field/Select";
import Row from "@/components/layout/Row";
import Column from "@/components/layout/Column";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any | unknown) => console.log(data);

    return (
        <>
            <H1>Cadastro de Veículo</H1>

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
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Select
                                label="Marca do Veículo*"
                                id="marca"
                                data={[
                                    { key: "toyota", value: "Toyota" },
                                    { key: "honda", value: "Honda" },
                                    { key: "ford", value: "Ford" },
                                    { key: "fiat", value: "Fiat" }
                                ]}
                                {...register("marca", {
                                    ...createValidationRule('Marca', "required", true)
                                })}
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
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column size={6}>
                            <Select
                                label="Cor do Veículo*"
                                id="cor"
                                data={[
                                    { key: "branco", value: "Branco" },
                                    { key: "preto", value: "Preto" },
                                    { key: "prata", value: "Prata" },
                                    { key: "vermelho", value: "Vermelho" }
                                ]}
                                {...register("cor", {
                                    ...createValidationRule('Cor', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Select
                                label="Categoria*"
                                id="categoria"
                                data={[
                                    { key: "carro", value: "Carro" },
                                    { key: "moto", value: "Moto" },
                                    { key: "caminhonete", value: "Caminhonete" },
                                    { key: "bicicleta", value: "Bicicleta" }
                                ]}
                                {...register("categoria", {
                                    ...createValidationRule('Categoria', "required", true)
                                })}
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
                                {...register("nome_proprietario", {
                                    ...createValidationRule('Proprietário', "required", true)
                                })}
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Select
                                label="Apartamento/Unidade*"
                                id="unidade"
                                {...register("unidade", {
                                    ...createValidationRule('Apartamento/Unidade', "required", true)
                                })}
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
