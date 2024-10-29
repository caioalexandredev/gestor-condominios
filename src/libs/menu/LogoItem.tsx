'use client';

import Image from "next/image";

type Props = {
    isMinimized?: boolean
}

export default function LogoItem({
    isMinimized = false
}: Props) {
    return (
        <div className="flex items-center pb-2 border-b border-sky-600 text-white">
            <div className={`${isMinimized ? '' : 'mr-2'} rounded-sm`}><Image src="/assets/logo.png" alt="logo" width={70} height={70}/></div>
            <div>
                <div className={`text-2xl leading-5 ${isMinimized ? 'hidden' : 'block'}`}><strong>Fênix</strong></div>
                <div className={`text-sm ${isMinimized ? 'hidden' : 'block'}`}>Gestão de Condomínio</div>
            </div>
        </div>
    )
}