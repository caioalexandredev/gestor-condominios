import Select from "@/components/field/Select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { faArrowRightFromBracket, faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopMenu() {
    return (
        <div className="flex items-center justify-end w-full px-4 h-16 bg-sky-600 text-white shadow-md">
            <nav className="flex gap-4">
                <Select defaultValue="1" data={[
                    { key: 1, value: "Administrador" },
                    { key: 2, value: "Proprietário" },
                    { key: 3, value: "Inquilino" }
                ]} />
                <DropdownMenu>
                    <Avatar>
                        <AvatarImage src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <DropdownMenuTrigger>Caio Alexandre de Sousa Ramos <FontAwesomeIcon icon={faCaretDown} /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><FontAwesomeIcon icon={faUser} />Perfil</DropdownMenuItem>
                        <DropdownMenuLabel>Sistema</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><FontAwesomeIcon icon={faArrowRightFromBracket} />Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    );
}