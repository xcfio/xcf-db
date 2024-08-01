import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { existsSync, rmSync } from "node:fs"
import { database, db } from "./index"
import path from "path"

// Define a temporary database path for testing
const testPath = path.join(__dirname, "test_database")

// Cleanup function to remove the test database directory after each test
const cleanup = () => existsSync(testPath) && rmSync(testPath, { recursive: true, force: true })

// Setup and teardown
beforeEach(() => {
    cleanup()
})

afterAll(() => {
    cleanup()
})

describe("Database", () => {
    let dbInstance: db<any>

    beforeEach(() => {
        dbInstance = database({ path: testPath })
    })

    it("should set and get a value", () => {
        dbInstance.set("key1", { foo: "bar" })
        expect(dbInstance.get("key1")).toEqual({ foo: "bar" })
    })

    it("should return null if key does not exist and exist flag is false", () => {
        expect(dbInstance.get("nonexistentKey")).toBeNull()
    })

    it("should throw error if key does not exist and exist flag is true", () => {
        expect(() => dbInstance.get("nonexistentKey", true)).toThrowError("Property nonexistentKey not found.")
    })

    it("should delete a value", () => {
        dbInstance.set("key2", { baz: "qux" })
        expect(dbInstance.delete("key2")).toBe(true)
        expect(dbInstance.get("key2")).toBeNull()
    })

    it("should return false if delete fails", () => {
        expect(dbInstance.delete("nonexistentKey")).toBe(false)
    })

    it("should check if a value exists", () => {
        dbInstance.set("key3", { hello: "world" })
        expect(dbInstance.has("key3")).toBe(true)
        expect(dbInstance.has("nonexistentKey")).toBe(false)
    })

    it("should clear all values", () => {
        dbInstance.set("key4", { data: "value" })
        dbInstance.clear()
        expect(dbInstance.size()).toBe(0)
    })

    it("should return all entries", () => {
        dbInstance.set("key5", { item: "one" })
        dbInstance.set("key6", { item: "two" })
        expect(dbInstance.entries()).toEqual([
            ["key5.json", { item: "one" }],
            ["key6.json", { item: "two" }]
        ])
    })

    it("should return all keys", () => {
        dbInstance.set("key7", { data: "test" })
        expect(dbInstance.keys()).toEqual(["key7"])
    })

    it("should return all values", () => {
        dbInstance.set("key8", { example: "value" })
        expect(dbInstance.values()).toEqual([{ example: "value" }])
    })

    it("should return the size of the database", () => {
        dbInstance.set("key9", { test: "size" })
        expect(dbInstance.size()).toBe(1)
    })

    it("should return a map of all entries", () => {
        dbInstance.set("key10", { map: "entry" })
        const map = dbInstance.map()
        expect(map.get("key10")).toEqual({ map: "entry" })
    })

    it("should iterate over all entries with forEach", () => {
        const results: any[] = []
        dbInstance.set("key11", { data: "iteration" })
        dbInstance.forEach((value, key) => {
            results.push({ key, value })
        })
        expect(results).toEqual([{ key: "key11", value: { data: "iteration" } }])
    })
})
