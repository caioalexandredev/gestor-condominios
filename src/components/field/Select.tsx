import { SelectHTMLAttributes } from "react";

export type keyValueOption = { key: number, value: string };

type Props = {
    label?: string;
    data?: keyValueOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
    label,
    data = [],
    ...rest
}: Props) {
    return (
        <div>
            <label className={`block ${label ? "mb-2" : ""} text-sm font-medium text-gray-900 dark:text-white`}>
                {label}
            </label>
            <select {...rest} defaultValue="" className="bg-gray-50 h-11 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Selecione...</option>
                {
                    data && data.map((option) => {
                        return (
                            <option key={option.key} value={option.key} title={option.value} >{option.value}</option>
                        );
                    })
                }
            </select>
        </div>
    )
}