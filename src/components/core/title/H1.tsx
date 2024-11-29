import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    [x: string]: ReactNode;
};

export default function H1({
    children,
    ...rest
}: Props) {
    return (
        <h1 {...rest} className="font-medium text-3xl mb-1 text-slate-700">
            {children}
        </h1>
    )
}