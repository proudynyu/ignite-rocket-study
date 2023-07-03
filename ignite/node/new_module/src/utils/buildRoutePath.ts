export function buildRoutePath(path: string) {
    const routeParamsRegex = /:([a-zA-z]+)/g;

    const pathWithParams = path.replace(routeParamsRegex, "(?<$1>[a-z0-9-_]+)");

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
    return pathRegex;
}
