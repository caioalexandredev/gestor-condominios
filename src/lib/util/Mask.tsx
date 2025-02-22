export function maskCpf(value: string | null | undefined){
    if(value == undefined || value == null){
        return "";
    }

    const rawValue = value.replace(/\D/g, '');
        
    if (rawValue.length <= 3) {
        return rawValue;
    } else if (rawValue.length <= 6) {
        return `${rawValue.slice(0, 3)}.${rawValue.slice(3)}`;
    } else if (rawValue.length <= 9) {
        return `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6)}`;
    }

    return `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6, 9)}-${rawValue.slice(9, 11)}`;
}

export function maskCelular(value: string | null | undefined): string
{
    if(value == undefined || value == null){
        return "";
    }
    
    const unmaskedValue = value.replace(/\D/g, '');

    if (unmaskedValue.length <= 2) {
        return unmaskedValue;
    } else if (unmaskedValue.length <= 3) {
        return `(${unmaskedValue.slice(0, 2)}) ${unmaskedValue.slice(2)}`;
    } else if (unmaskedValue.length <= 7) {
        return `(${unmaskedValue.slice(0, 2)}) ${unmaskedValue.slice(2, 3)} ${unmaskedValue.slice(3)}`;
    }

    return `(${unmaskedValue.slice(0, 2)}) ${unmaskedValue.slice(2, 3)} ${unmaskedValue.slice(3, 7)}-${unmaskedValue.slice(7, 11)}`;;
}

export function maskTelefone(value: string | null | undefined): string
{
    if(value == undefined || value == null){
        return "";
    }
    
    const unmaskedValue = value.replace(/\D/g, '');

    if (unmaskedValue.length <= 2) {
        return unmaskedValue;
    } else if (unmaskedValue.length <= 6) {
        return `(${unmaskedValue.slice(0, 2)}) ${unmaskedValue.slice(2)}`;
    }

    return `(${unmaskedValue.slice(0, 2)}) ${unmaskedValue.slice(2, 6)}-${unmaskedValue.slice(6, 10)}`;
}