export function extractSearchParams(query: string) {
    return query
        .substring(1)
        .split("&")
        .reduce((queryParams, param) => {
            const [key, value] = param.split("=");

            queryParams[key] = value;
        }, {} as any);
}
