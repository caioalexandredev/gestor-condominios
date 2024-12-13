"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Select from "@/components/field/Select";
import Row from "@/components/layout/Row";
import Column from "@/components/layout/Column";
import { createValidationRule } from "@/lib/helper/validationHelpers";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import TextArea from "@/components/field/TextArea";
import { visibilidadeSelect } from "@/model/IInformativo";

export default function ReceiveAccountRegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any | unknown) => console.log(data);

    return (
        <>
            <H1>Cadastro de Informativo</H1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-3">
                    <H4 className="text-slate-700">Informativo</H4>
                    <hr className="mb-3" />
                    <Row>
                        <Column size={4}>
                            <TextArea
                                label="Informação*"
                                id="informacao"
                                {...register("informacao", {
                                    ...createValidationRule('Informação', "required", true),
                                    ...createValidationRule('Informação', "maxLength", 1000)
                                })}
                                errors={errors}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column size={6}>
                            <Select
                                label="Visibilidade*"
                                id="visibilidade"
                                data={visibilidadeSelect}
                                {...register("visibilidade", {
                                    ...createValidationRule('Visibilidade', "required", true)
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
