import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from "node:fs"

/**
 * Creates a database instance with methods to interact with a file-based key-value store.
 * @template type The type of the values stored in the database.
 * @param {Option} [option] - Optional configuration object.
 * @param {string} [option.path] - The path where the database files are stored.
 * @returns {db<type>} A database instance with methods to set, get, remove, check existence, and clear data.
 */
export function database<type = Object>(option: Option = {}): db<type> {
    if (!option.path) option.path = "database"
    if (!existsSync(option.path)) mkdirSync(option.path, { recursive: true })

    const object: db<type> = {
        set: (key: string, value: type) => {
            const path = `${option.path}/${key}.json`
            writeFileSync(path, JSON.stringify(value, null, 4))
            return object
        },

        get: (key: string, exist?: boolean) => {
            const path = `${option.path}/${key}.json`
            if (existsSync(path)) {
                return JSON.parse(readFileSync(path).toString())
            } else if (exist) {
                throw new Error(`Property ${key} not found.`)
            } else {
                return null
            }
        },

        delete: (key: string) => {
            const path = `${option.path}/${key}.json`
            if (existsSync(path)) {
                rmSync(path, { force: true })
                return true
            } else {
                return false
            }
        },

        has: (key: string) => {
            const path = `${option.path}/${key}.json`
            return existsSync(path)
        },

        clear: () => {
            rmSync(option.path!, { force: true, recursive: true })
            mkdirSync(option.path!, { recursive: true })
            return object
        },

        entries: () => {
            const dir = readdirSync(option.path!)
            return dir.map((file) => [file, JSON.parse(readFileSync(`${option.path}/${file}`).toString())])
        },

        keys: () => readdirSync(option.path!).map((key) => key.replace(".json", "")),

        size: () => readdirSync(option.path!).length,

        values: () => {
            const dir = readdirSync(option.path!)
            return dir.map((file) => JSON.parse(readFileSync(`${option.path}/${file}`).toString()))
        },

        map: () => {
            const map = new Map<string, type>()
            const dir = readdirSync(option.path!).map((key) => key.replace(".json", ""))
            for (const file of dir) {
                map.set(file, JSON.parse(readFileSync(`${option.path}/${file}.json`).toString()))
            }
            return map
        },

        forEach: (callbackfn, thisArg) => object.map().forEach(callbackfn, thisArg)
    }

    return object
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
 * @template type The type of the values stored in the database.
 */
export type db<type> = {
    /**
     * Sets a value in the database.
     * @param {string} key - The key under which the value will be stored.
     * @param {type} value - The value to store.
     * @returns {db<type>} The database instance.
     */
    set: (key: string, value: type) => db<type>

    /**
     * Gets a value from the database.
     * @param {string} key - The key of the value to retrieve.
     * @param {boolean} [exist] - If true, throws an error if the key does not exist.
     * @returns {type | null} The retrieved value, or null if the key does not exist.
     */
    get: ((key: string) => type | null) & ((key: string, exist: true) => type)

    /**
     * Removes a value from the database.
     * @param {string} key - The key of the value to remove.
     * @returns {boolean} True if the value was successfully removed, false otherwise.
     */
    delete: (key: string) => boolean

    /**
     * Executes a callback function for each entry in the database.
     * @param {(value: type, key: string, map: Map<string, type>) => any} callbackfn - The function to execute for each entry.
     * @param {any} [thisArg] - Value to use as `this` when executing `callbackfn`.
     */
    forEach: (callbackfn: (value: type, key: string, map: Map<string, type>) => any, thisArg?: any) => void

    /**
     * Checks if a value exists in the database.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} True if the value exists, false otherwise.
     */
    has: (key: string) => boolean

    /**
     * Clears all values in the database.
     * @returns {db<type>} The database instance.
     */
    clear: () => db<type>

    /**
     * Retrieves all entries in the database as an array of key-value pairs.
     * @returns {Array<[string, type]>} An array of key-value pairs.
     */
    entries: () => Array<[string, type]>

    /**
     * Retrieves all keys in the database.
     * @returns {Array<string>} An array of keys.
     */
    keys: () => Array<string>

    /**
     * Retrieves all values in the database.
     * @returns {Array<type>} An array of values.
     */
    values: () => Array<type>

    /**
     * Retrieves the number of entries in the database.
     * @returns {number} The number of entries.
     */
    size: () => number

    /**
     * Retrieves all entries in the database as a Map.
     * @returns {Map<string, type>} A Map of key-value pairs.
     */
    map: () => Map<string, type>
}
