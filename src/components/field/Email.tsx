type Props = {
    label: any | unknown;
    errors?: any | unknown
    [x: string]: any | unknown;
};

export default function Email({
    label,
    errors,
    ...rest
}: Props) {
    const errorMessage = errors?.[rest.name]?.message;
    const isInvalid = errors?.[rest.name];
    
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white font-bold">
                {label}
            </label>
            <input
                type="email"
                {...rest}
                aria-invalid={errors?.[rest.name] ? "true" : "false"}
                className={`bg-gray-50 h-11 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            <small className="text-red-500">{errorMessage}</small>
        </div>
    )
}