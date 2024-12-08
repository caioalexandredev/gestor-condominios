type Props = {
    label: any;
    errors?: any
    [x: string]: any;
};

export default function Text({
    label,
    errors,
    ...rest
}: Props) {
    const errorMessage = errors?.[rest.name]?.message;
    const isInvalid = errors?.[rest.name];
    
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                type="text"
                {...rest}
                aria-invalid={errors?.[rest.name] ? "true" : "false"}
                className={`bg-gray-50 h-11 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${isInvalid ? 'border-red-500' : 'border-gray-300'}`}
            />
            <small className="text-red-500">{errorMessage}</small>
        </div>
    )
}