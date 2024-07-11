import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs"

/**
 * Creates a database instance with methods to interact with a file-based key-value store.
 * @template T The type of the values stored in the database.
 * @param {Option} [option] - Optional configuration object.
 * @param {string} [option.path] - The path where the database files are stored.
 * @returns {Database<T>} A database instance with methods to set, get, remove, check existence, and clear data.
 */
export function database<T = any>(option?: Option): Database<T> {
    const obj = { path: "database" }

    if (option && option.path) obj.path = option.path
    if (!existsSync(obj.path)) mkdirSync(obj.path, { recursive: true })

    return {
        set: (key: string, value: T) => {
            const path = `${obj.path}/${key}.json`
            writeFileSync(path, JSON.stringify(value, null, 4))
            return value
        },

        get: (key: string) => {
            const path = `${obj.path}/${key}.json`
            if (existsSync(path)) {
                return JSON.parse(readFileSync(path).toString())
            } else {
                return null
            }
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
    } as Database<T>
}

/**
 * Configuration options for the database.
 */
export type Option = {
    /**
     * The path where the database files are stored.
     */
    path?: string
}

/**
 * A database instance with methods to interact with a file-based key-value store.
 * @template V The type of the values stored in the database.
 */
export type Database<V = any> = {
    /**
     * Sets a value in the database.
     * @param {string} key - The key under which the value will be stored.
     * @param {V} value - The value to store.
     * @returns {V} The stored value.
     */
    set: (key: string, value: V) => V

    /**
     * Gets a value from the database.
     * @param {string} key - The key of the value to retrieve.
     * @returns {V | null} The retrieved value, or null if the key does not exist.
     */
    get: (key: string) => V | null

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
