'use client';

import LogoItem from "./LogoItem";
import { Manrope } from 'next/font/google';
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { faBars, faBarsStaggered, faBuilding, faCar, faCircleInfo, faDollar, faFileInvoiceDollar, faFileLines, faFolderOpen, faHandHoldingDollar, faHome, faTriangleExclamation, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const manrope = Manrope({ subsets: ['latin'] });

export interface MenuItem {
    link: string,
    icon: IconDefinition,
    text: string
};

export interface MenuGroup {
    group: string;
    items: MenuItem[]
};

export default function Sidebar() {

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const pathname = usePathname();

    const menuList = [
        {
            group: "Geral",
            items: [
                {
                    link: "/",
                    icon: faHome,
                    text: "Pagina Inicial"
                },
                {
                    link: "/gestao/pessoa",
                    icon: faUsers,
                    text: "Gestão Pessoas"
                },
                {
                    link: "/gestao/propriedade",
                    icon: faBuilding,
                    text: "Gestão de Propriedades"
                },
                {
                    link: "/gestao/veiculo",
                    icon: faCar,
                    text: "Gestão de Veículos"
                }
            ]
        },
        {
            group: "Financeiro",
            items: [
                {
                    link: "/financeiro/contas/pagar",
                    icon: faDollar,
                    text: "Contas a Pagar"
                },
                {
                    link: "/financeiro/contas/receber",
                    icon: faHandHoldingDollar,
                    text: "Contas a Receber"
                },
                {
                    link: "/financeiro/cobranca",
                    icon: faFileInvoiceDollar,
                    text: "Gestão de Cobrança"
                },
            ]
        },
        {
            group: "Informações e Ocorrências",
            items: [
                {
                    link: "/informativo",
                    icon: faCircleInfo,
                    text: "Informativos"
                },
                {
                    link: "/ocorrencia",
                    icon: faTriangleExclamation,
                    text: "Livro de Ocorrências"
                },
                {
                    link: "/relatorio",
                    icon: faBarsStaggered,
                    text: "Relatórios"
                },
                {
                    link: "/documento",
                    icon: faFolderOpen,
                    text: "Documentos"
                },
                {
                    link: "/gestao/documento",
                    icon: faFileLines,
                    text: "Gestão de Documento"
                }
            ]
        }
    ]

    return (
        <div className="relative flex">
            <div className={`flex flex-col gap-2 ${isMinimized ? 'w-20' : 'w-[300px]'} min-w-20 min-h-screen p-4 bg-sky-500 transition-all duration-300 ease-in-out ${manrope.className}`}>
                <div>
                    <LogoItem isMinimized={isMinimized} />
                </div>
                <div className="grow">
                    <Command className="bg-transparent">
                        <CommandList>
                            {menuList.map((menu: MenuGroup, key: number) => (
                                <CommandGroup key={key} heading={!isMinimized ? menu.group : ' '}>
                                    {menu.items.map((option: MenuItem, optionKey: number) => {
                                        const isActive = pathname === option.link;
                                        return (
                                            <Link href={option.link} key={optionKey}>
                                                <CommandItem
                                                    className={`flex gap-2 cursor-pointer ${isActive ? 'bg-accent text-accent-foreground' : ''}`}
                                                >
                                                    <FontAwesomeIcon icon={option.icon ?? faHome} />
                                                    {!isMinimized ? <span>{option.text}</span> : <span></span>}
                                                </CommandItem>
                                            </Link>
                                        );
                                    })}
                                </CommandGroup>))}
                        </CommandList>
                    </Command>
                </div>
                <div className={`text-xs text-white`}>
                    {isMinimized ? 'v14.2.0.1' : 'Tester Build v14.2.0.1'}
                </div>
            </div>
            <button
                onClick={toggleSidebar}
                className="absolute top-4 -right-8 text-white p-2 rounded-full transition-all duration-300"
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    )
}