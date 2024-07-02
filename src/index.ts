import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs"
import type { Database, Option } from "./type"
export type * from "./type"

export function database(option?: Option) {
    const obj = { path: "database" }
    const db: Database = { set, get, remove }

    if (option && option.path) obj.path = option.path
    if (!existsSync(obj.path)) mkdirSync(obj.path, { recursive: true })

    function set<type extends any>(key: string, value: type) {
        const path = `${obj.path}/${key}.json`
        writeFileSync(path, JSON.stringify(value, null, 4))
        return value
    }

    function get<type extends any>(key: string) {
        const path = `${obj.path}/${key}.json`
        return JSON.parse(readFileSync(path).toString()) as type
    }

    function remove(key: string) {
        const path = `${obj.path}/${key}.json`
        if (existsSync(path)) {
            rmSync(path, { force: true, recursive: true })
            return true
        } else {
            return false
        }
    }

    return db
}
