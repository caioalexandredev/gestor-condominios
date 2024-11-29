import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    [x: string]: ReactNode;
};

export default function Fields({
    children,
    ...rest
}: Props) {
    return (
        <div {...rest} className="grid gap-6 mb-6 md:grid-cols-4">
            {children}
        </div>
    )
}