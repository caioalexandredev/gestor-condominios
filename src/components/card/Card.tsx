import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    [x: string]: ReactNode;
};

export default function Card({
    children,
    ...rest
}: Props) {
    const className = "p-3 bg-white border-slate-200 border rounded mb-6 drop-shadow " + rest.className;

    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
}