# xcf-db

`xcf-db` is a lightweight, file-based key-value database library for local storage and management of data.

## Installation

You can install `xcf-db` using npm:

```sh
npm install xcf-db
```

## Usage

To use `xcf-db`, import the `database` function and create an instance of the database.

### JavaScript Example

#### Creating a Database Instance

```javascript
const { database } = require("xcf-db")

const db = database()
```

If you want to use a custom path for your database, you can pass the `path` option:

```javascript
const db = database({ path: "Your Custom Path" })
```

#### Setting Data

To set data in the database, use the `set` method:

```javascript
db.set("cool", { data: "This is data" })
// Returns: { data: "This is data" }
```

#### Getting Data

To retrieve data from the database, use the `get` method:

```javascript
db.get("cool")
// Returns: { data: "This is data" }
```

#### Removing Data

To remove data from the database, use the `delete` method:

```javascript
db.delete("cool")
// Returns: true if data exists, otherwise returns false
```

#### Checking Data Existence

To check if a key exists in the database, use the `has` method:

```javascript
db.has("cool")
// Returns: true if the key exists, otherwise false
```

#### Clearing the Database

To clear all data in the database, use the `clear` method:

```javascript
db.clear()
// Clears all data in the database
```

### TypeScript Example

#### Creating a Database Instance

```typescript
import { database } from "xcf-db"

const db = database<{ data: string }>()
```

If you want to use a custom path for your database, you can pass the `path` option:

```typescript
const db = database<{ data: string }>({ path: "Your Custom Path" })
```

#### Setting Data

To set data in the database, use the `set` method:

```typescript
db.set("cool", { data: "This is data" })
// Returns: { data: "This is data" }
```

#### Getting Data

To retrieve data from the database, use the `get` method:

```typescript
const data = db.get("cool")
// Returns: { data: "This is data" }
```

#### Removing Data

To remove data from the database, use the `delete` method:

```typescript
const removed = db.delete("cool")
// Returns: true if data exists, otherwise returns false
```

#### Checking Data Existence

To check if a key exists in the database, use the `has` method:

```typescript
const exists = db.has("cool")
// Returns: true if the key exists, otherwise false
```

#### Clearing the Database

To clear all data in the database, use the `clear` method:

```typescript
db.clear()
// Clears all data in the database
```

## API

### `database(options?)`

Creates a new database instance.

-   `options` (optional): An object containing configuration options.
    -   `path` (optional): A string specifying the custom path for the database.

### `db.set(key, value)`

Sets the value for the specified key in the database.

-   `key`: A string representing the key.
-   `value`: The value to set.

### `db.get(key, exist?)`

Gets the value for the specified key from the database.

-   `key`: A string representing the key.
-   `exist` (optional): A boolean indicating whether to throw an error if the key does not exist.

### `db.delete(key)`

Removes the value for the specified key from the database.

-   `key`: A string representing the key.

### `db.has(key)`

Checks if the specified key exists in the database.

-   `key`: A string representing the key.

### `db.clear()`

Clears all data from the database.

### `db.entries()`

Retrieves all entries in the database as an array of key-value pairs.

-   Returns: An array of key-value pairs.

### `db.keys()`

Retrieves all keys in the database.

-   Returns: An array of keys.

### `db.values()`

Retrieves all values in the database.

-   Returns: An array of values.

### `db.size()`

Retrieves the number of entries in the database.

-   Returns: The number of entries.

### `db.map()`

Retrieves all entries in the database as a `Map`.

-   Returns: A `Map` of key-value pairs.

### `db.forEach(callbackfn, thisArg?)`

Executes a callback function for each entry in the database.

-   `callbackfn`: A function to execute for each entry.
-   `thisArg` (optional): Value to use as `this` when executing `callbackfn`.

## Example

### JavaScript Example

```javascript
const { database } = require("xcf-db")

const db = database()

// Set data
db.set("cool", { data: "This is data" })
// Returns: { data: "This is data" }

// Get data
db.get("cool")
// Returns: { data: "This is data" }

// Check if data exists
db.has("cool")
// Returns: true

// Remove data
db.delete("cool")
// Returns: true if data exists, otherwise returns false

// Clear the database
db.clear()
// Clears all data
```

### TypeScript Example

```typescript
import { database } from "xcf-db"

const db = database<{ data: string }>()

// Set data
db.set("cool", { data: "This is data" })
// Returns: { data: "This is data" }

// Get data
const data = db.get("cool")
// Returns: { data: "This is data" }

// Check if data exists
const exists = db.has("cool")
// Returns: true

// Remove data
const removed = db.delete("cool")
// Returns: true if data exists, otherwise returns false

// Clear the database
db.clear()
// Clears all data
```

## License

This project is licensed under the Apache-2.0 License.
