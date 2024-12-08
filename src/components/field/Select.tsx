import { SelectHTMLAttributes } from "react";

export type keyValueOption = { key: number | string, value: string };

type Props = {
    label?: string;
    errors?: any
    data?: keyValueOption[];
    [x: string]: any;
};

export default function Select({
    label,
    data = [],
    errors,
    ...rest
}: Props) {
    const errorMessage = errors?.[rest.name]?.message;
    const isInvalid = errors?.[rest.name];

    return (
        <div>
            <label className={`block ${label ? "mb-2" : ""} text-sm font-medium text-gray-900 dark:text-white`}>
                {label}
            </label>
            <select 
                {...rest} 
                defaultValue="" 
                aria-invalid={errors?.[rest.name] ? "true" : "false"}
                className={`bg-gray-50 h-11 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">Selecione...</option>
                {
                    data && data.map((option) => {
                        return (
                            <option key={option.key} value={option.key} title={option.value} >{option.value}</option>
                        );
                    })
                }
            </select>
            <small className="text-red-500">{errorMessage}</small>
        </div>
    )
}