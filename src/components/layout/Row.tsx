import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    [x: string]: ReactNode | unknown;
};

export default function Row({ children, className = "", ...rest }: Props) {
    return (
        <div {...rest} className={`flex -mx-2 mb-2 ${className}`}>
            {children}
        </div>
    );
};