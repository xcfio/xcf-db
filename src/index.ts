import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs"

/**
 * Creates a database instance with methods to interact with a file-based key-value store.
 * @param {Option} [option] - Optional configuration object.
 * @param {string} [option.path] - The path where the database files are stored.
 * @returns {db} A database instance with methods to set, get, remove, check existence, and clear data.
 */
export function database(option?: Option) {
    const obj = { path: "database" }

    if (option && option.path) obj.path = option.path
    if (!existsSync(obj.path)) mkdirSync(obj.path, { recursive: true })

    return {
        set: <T extends Object>(key: string, value: T) => {
            const path = `${obj.path}/${key}.json`
            writeFileSync(path, JSON.stringify(value, null, 4))
            return value
        },

        get: <T extends Object>(key: string) => {
            const path = `${obj.path}/${key}.json`
            return JSON.parse(readFileSync(path).toString()) as T
        },

        remove: (key: string) => {
            const path = `${obj.path}/${key}.json`
            if (existsSync(path)) {
                rmSync(path, { force: true, recursive: true })
                return true
            } else {
                return false
            }
        },

        has: (key: string) => {
            const path = `${obj.path}/${key}.json`
            return existsSync(path)
        },

        clear: () => {
            rmSync(obj.path, { force: true, recursive: true })
            mkdirSync(obj.path, { recursive: true })
        }
    } as db
}

/**
 * Configuration options for the database.
 */
export type Option = {
    path?: string
}

/**
 * A database instance with methods to interact with a file-based key-value store.
 */
export type db = {
    /**
     * Sets a value in the database.
     * @template T
     * @param {string} key - The key under which the value will be stored.
     * @param {T} value - The value to store.
     * @returns {T} The stored value.
     */
    set: <T extends Object>(key: string, value: T) => T

    /**
     * Gets a value from the database.
     * @template T
     * @param {string} key - The key of the value to retrieve.
     * @returns {T} The retrieved value.
     */
    get: <T extends Object>(key: string) => T

    /**
     * Removes a value from the database.
     * @param {string} key - The key of the value to remove.
     * @returns {boolean} True if the value was successfully removed, false otherwise.
     */
    remove: (key: string) => boolean

    /**
     * Checks if a value exists in the database.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} True if the value exists, false otherwise.
     */
    has: (key: string) => boolean

    /**
     * Clears all values in the database.
     * @returns {void}
     */
    clear: () => void
}
