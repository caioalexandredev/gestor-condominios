"use client";

import ButtonPrimary from "@/components/button/ButtonPrimary";
import Card from "@/components/card/Card";
import H1 from "@/components/core/title/H1";
import H4 from "@/components/core/title/H4";
import Select from "@/components/field/Select";
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
import TextArea from "@/components/field/TextArea";
import { loadInformativo, loadInformativoVisibilidadeSelect } from "../data/fetchs";
import Text from "@/components/field/Text";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormInformativo({
    id,
    isView = false,
    title = "Cadastrar Informativo",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        visibilidade: []
    });

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            id ? loadInformativo(id) : Promise.resolve(),
            loadInformativoVisibilidadeSelect()
        ];

        Promise.all(promises)
            .then(([informativo, visibilidade]) => {

                setSelectData({
                    visibilidade: visibilidade
                });

                if (informativo) {
                    reset({
                        ...informativo.data
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
            const response = await fetch(`/api/informativo/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/informativo");
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
                <H4 className="text-slate-700">Informativo</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={12}>
                        <Text
                            label="Assunto*"
                            id="assunto"
                            {...register("assunto", {
                                ...createValidationRule('Informação', "required", true),
                                ...createValidationRule('Informação', "maxLength", 200)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={4}>
                        <TextArea
                            label="Informação*"
                            id="informacao"
                            {...register("informacao", {
                                ...createValidationRule('Informação', "required", true),
                                ...createValidationRule('Informação', "maxLength", 1000)
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={6}>
                        <Select
                            label="Visibilidade*"
                            id="visibilidade"
                            data={selectData.visibilidade}
                            {...register("visibilidade", {
                                ...createValidationRule('Visibilidade', "required", true)
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
                <Link href={'/informativo'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}