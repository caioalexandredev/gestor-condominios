import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonDanger from "../button/ButtonDanger";
import ButtonSecondary from "../button/ButtonSecondary";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { faBackspace, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { defaultValues, IModal } from "@/model/IModal";

type Props = {
    state: IModal;
    setState: (value: IModal | ((prevState: IModal) => IModal)) => void;
};

export default function Delete({
    state,
    setState
}: Props) {
    
    function close(): void
    {
        setState((prevValues: IModal) => { return {...prevValues, open: false};});
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
                        <ButtonDanger><FontAwesomeIcon icon={faXmarkCircle} /> Confirmar</ButtonDanger>
                        <ButtonSecondary onClick={ close }><FontAwesomeIcon icon={faBackspace} /> Cancelar</ButtonSecondary>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>)
}