import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonPrimary from "../button/ButtonPrimary";
import ButtonSecondary from "../button/ButtonSecondary";
import Card from "../card/Card";
import H4 from "../core/title/H4";
import Fields from "../field/Fields";
import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    [x: string]: ReactNode;
};

export default function Filter({
    children,
    ...rest
}: Props) {
    return (
        <Card {...rest}>
            <H4 className="text-slate-700">Filtros</H4>
            <hr className="mb-3" />
            <form>
                <Fields>
                    {children}
                </Fields>
                <div className="flex space-x-2">
                    <ButtonPrimary isIcon={false}>
                        <FontAwesomeIcon icon={faFilter} /> Filtrar
                    </ButtonPrimary>
                    <ButtonSecondary isIcon={false}>
                        <FontAwesomeIcon icon={faEraser} /> Limpar
                    </ButtonSecondary>
                </div>
            </form>
        </Card>
    )
}