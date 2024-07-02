export type Option = {
    path?: string
}

export type Database = {
    set: <type extends any>(key: string, value: type) => type
    get: <type extends any>(key: string) => type
    remove: (key: string) => boolean
}
