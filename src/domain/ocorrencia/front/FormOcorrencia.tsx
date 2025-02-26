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
import Text from "@/components/field/Text";
import { loadOcorrencia, loadOcorrenciaTipoSelect } from "../data/fetchs";
import Date from "@/components/field/Date";

type Props = {
    id?: number,
    isView?: boolean,
    title?: string,
    method?: string
}

export default function FormOcorrencia({
    id,
    isView = false,
    title = "Cadastrar Ocorrência",
    method = "POST"
}: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [selectData, setSelectData] = useState({
        tipo: []
    });

    useEffect(() => {
        setIsLoadingPage(true);

        const promises = [
            id ? loadOcorrencia(id) : Promise.resolve(),
            loadOcorrenciaTipoSelect()
        ];

        Promise.all(promises)
            .then(([ocorrencia, tipo]) => {

                setSelectData({
                    tipo: tipo
                });

                if (ocorrencia) {
                    reset({
                        ...ocorrencia.data
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
            const response = await fetch(`/api/ocorrencia/${id ? id : method}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                notifySucess("Registro salvo com sucesso");
                router.push("/ocorrencia");
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
                <H4 className="text-slate-700">Dados da Ocorrência</H4>
                <hr className="mb-3" />
                <Row>
                    <Column size={6}>
                        <Text
                            label="Assunto*"
                            id="assunto"
                            {...register("assunto", {
                                ...createValidationRule("Assunto", "required", true),
                            })}
                            maxLength="100"
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                    <Column size={6}>
                        <Date
                            label="Data da Ocorrência*"
                            id="dt_ocorrencia"
                            {...register("dt_ocorrencia", {
                                ...createValidationRule("Data da Ocorrência", "required", true),
                            })}
                            disabled={isView}
                            errors={errors}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Select
                            id="tipo"
                            label="Tipo de Ocorrência*"
                            data={selectData.tipo}
                            {...register("tipo", {
                                ...createValidationRule("Tipo de Ocorrência", "required", true),
                            })}
                            disabled={isView}
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
                <Link href={'/ocorrencia'} >
                    <ButtonSecondary type="button" isIcon={false}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                    </ButtonSecondary>
                </Link>
            </div>
        </form>
    </>)
}