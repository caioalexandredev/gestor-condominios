import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    isIcon?: boolean;
    [x: string]: ReactNode;
};

export default function ButtonPrimary({ children, isIcon = false, ...rest }: Props) {
    return (
        <button {...rest} className={`cursor-pointer bg-sky-500 p-2 ${isIcon ? 'text-lg' : ''} text-white rounded-sm inline-flex items-center gap-x-2`}>
            {children}
        </button>
    );
}