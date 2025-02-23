import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonDanger from "../button/ButtonDanger";
import ButtonSecondary from "../button/ButtonSecondary";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { faBackspace, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { defaultValues, IModal } from "@/model/IModal";
import { notifyErro, notifySucess } from "@/lib/components/Alert";
import { useState } from "react";

type Props = {
    state: IModal;
    setState: (value: IModal | ((prevState: IModal) => IModal)) => void;
    action: string,
    fetchData: any
};

export default function Delete({
    state,
    setState,
    action,
    fetchData
}: Props) {

    const [isLoading, setIsLoading] = useState(false);

    function close(): void {
        setState((prevValues: IModal) => { return { ...prevValues, open: false }; });
    }

    async function deleteItem(): Promise<void> {
        try {
            setIsLoading(true);
            const resultado = await fetch(`${action}/${state.id}`, {
                method: "Delete"
            })
                .then(response => response.json());

            if (resultado.status != "success") {
                notifyErro("Houveram erros na comunicação entre servidores.");
            }else{
                notifySucess("Registro excluído com sucesso.");
                close();
                fetchData(false, undefined);
            }
        } catch (error) {
            notifyErro("Houveram erros na operação: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    return (<>
        <Dialog open={state.open} onOpenChange={() => setState(defaultValues)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Deseja confirmar esta ação?</DialogTitle>
                    <DialogDescription>
                        Você está preste a deletar um registro.
                    </DialogDescription>
                    <DialogFooter className="grid mb-6 md:grid-cols-2 text-center pt-2">
                        <ButtonDanger onClick={deleteItem}><FontAwesomeIcon icon={faXmarkCircle} /> 
                            {isLoading ? ("Confirmando...") : ("Confirmar") }
                        </ButtonDanger>
                        <ButtonSecondary onClick={close}><FontAwesomeIcon icon={faBackspace} /> Cancelar</ButtonSecondary>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>)
}