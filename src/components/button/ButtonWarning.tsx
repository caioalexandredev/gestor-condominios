import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    isIcon?: boolean;
    [x: string]: any;
};

export default function ButtonWarning({ children, isIcon = false, ...rest }: Props) {
    return (
        <span
            {...rest}
            className={`cursor-pointer bg-amber-500 p-2 text-white rounded-sm inline-flex items-center justify-center gap-x-2 ${
                isIcon ? 'text-lg' : ''
            }`}
        >
            {children}
        </span>
    );
}