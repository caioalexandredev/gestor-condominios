"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Text from "@/components/field/Text";
import TextArea from "@/components/field/TextArea";
import Date from "@/components/field/Date";
import Select from "@/components/field/Select";
import Column from "@/components/layout/Column";
import Row from "@/components/layout/Row";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any | unknown) => {console.log(data)};

    return (
        <>
            <H1>Cadastrar Ocorrência</H1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-3">
                    <H4 className="text-slate-700">Dados da Ocorrência</H4>
                    <hr className="mb-3" />
                    <Row>
                        <Column size={6}>
                            <Text
                                label="Título*"
                                id="titulo"
                                {...register("titulo", {
                                    ...createValidationRule("Título", "required", true),
                                })}
                                maxLength="100"
                                errors={errors}
                            />
                        </Column>
                        <Column size={6}>
                            <Date
                                label="Data da Ocorrência*"
                                id="data_ocorrencia"
                                {...register("data_ocorrencia", {
                                    ...createValidationRule("Data da Ocorrência", "required", true),
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Select
                                id="tipo"
                                label="Tipo de Ocorrência*"
                                data={[
                                    { key: "seguranca", value: "Segurança" },
                                    { key: "ruido", value: "Ruído" },
                                    { key: "outros", value: "Outros" },
                                ]}
                                {...register("tipo", {
                                    ...createValidationRule("Tipo de Ocorrência", "required", true),
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <TextArea
                                id="descricao"
                                label="Descrição*"
                                {...register("descricao", {
                                    ...createValidationRule("Descrição", "required", true),
                                })}
                                maxLength="500"
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
