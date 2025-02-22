export function addQueryParam(params: string, param: string, value: string | null) {
    if (params != "") {
        params += "&";
    } else {
        params += "?";
    }

    return params + param + '=' + value;
}