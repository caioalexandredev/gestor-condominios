import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    title: string;
    icon: IconProp;
    description: string;
    footer: string;
}

export default function CardInfoValue({
    title,
    icon,
    description,
    footer
}: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">{title}</CardTitle>
                <FontAwesomeIcon icon={icon} />
            </CardHeader>
            <CardContent className="text-sky-500">
                <p className="text-2xl font-bold">
                    {description}
                </p>
                <p className="text-xs text-muted-foreground">
                    {footer}
                </p>
            </CardContent>
        </Card>
    )
}