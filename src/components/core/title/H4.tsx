import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    [x: string]: ReactNode;
};

export default function H4({
    children,
    ...rest
}: Props) {
    return (
        <h1 {...rest} className="font-medium mb-3 text-slate-700">
            {children}
        </h1>
    )
}