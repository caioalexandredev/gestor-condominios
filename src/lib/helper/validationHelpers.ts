import { formatInTimeZone } from 'date-fns-tz';

const formatDateToBR = (date: string | Date) => {
    const dateLocal = new Date(date)
    return formatInTimeZone(dateLocal, 'Europe/Paris', 'dd/MM/yyyy') 
};

export const createValidationRule = (field: string, type: 'minLength' | 'maxLength' | 'required' | 'pattern' | 'email' | 'min' | 'max' | 'custom', value: number | boolean | RegExp | string | undefined): any => {
    const validationMessages = {
        required: `Este campo ${field} é obrigatório`,
        minLength: (min: number) => `O campo ${field} deve ter pelo menos ${min} caracteres.`,
        maxLength: (max: number) => `O campo ${field} não pode ter mais de ${max} caracteres.`,
        pattern: (pattern: string) => `O campo ${field} deve seguir o padrão: ${pattern}`,
        email: "O campo deve ser um e-mail válido",
        min: (min: number | string) => `O valor do campo ${field} deve ser maior ou igual a ${min}`,
        max: (max: number) => `O valor do campo ${field} deve ser menor ou igual a ${max}`,
        custom: (message: string) => message,
    };

    if (type === 'required') {
        return { required: validationMessages.required };
    }

    if (type === 'minLength' && typeof value === 'number') {
        return { minLength: { value, message: validationMessages.minLength(value) } };
    }

    if (type === 'maxLength' && typeof value === 'number') {
        return { maxLength: { value, message: validationMessages.maxLength(value) } };
    }

    if (type === 'pattern' && value instanceof RegExp) {
        return { pattern: { value, message: validationMessages.pattern(value.toString()) } };
    }

    if (type === 'email') {
        return { pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: validationMessages.email } };
    }

    if (type === 'min' && typeof value === 'string') {
        const minDate = Date.parse(value);
        return {
            validate: (dateValue: string) => {
                const date = Date.parse(dateValue);
                return date >= minDate || validationMessages.min(formatDateToBR(value));
            }
        };
    }

    if (type === 'max' && typeof value === 'number') {
        return { max: { value, message: validationMessages.max(value) } };
    }

    if (type === 'custom' && typeof value === 'string') {
        return { validate: (valueToValidate: any) => valueToValidate ? true : validationMessages.custom(value) };
    }

    return {};
};
