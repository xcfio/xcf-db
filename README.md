# xcf-db

`xcf-db` is a local lightweight database library for storing and managing data.

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
db.set("cool", { data: "This is data" }) // returns { data: "This is data" }
```

#### Getting Data

To retrieve data from the database, use the `get` method:

```javascript
db.get("cool") // returns { data: "This is data" }
```

#### Removing Data

To remove data from the database, use the `remove` method:

```javascript
db.remove("cool") // returns true if data exists, otherwise returns false
```

#### Checking Data Existence

To check if a key exists in the database, use the `has` method:

```javascript
db.has("cool") // returns true if the key exists, otherwise false
```

#### Clearing the Database

To clear all data in the database, use the `clear` method:

```javascript
db.clear() // clears all data in the database
```

### TypeScript Example

#### Creating a Database Instance

```typescript
import { database } from "xcf-db"

const db = database()
```

If you want to use a custom path for your database, you can pass the `path` option:

```typescript
const db = database({ path: "Your Custom Path" })
```

#### Setting Data

To set data in the database, use the `set` method:

```typescript
db.set<{ data: string }>("cool", { data: "This is data" }) // returns { data: "This is data" }
```

#### Getting Data

To retrieve data from the database, use the `get` method:

```typescript
const data = db.get<{ data: string }>("cool") // returns { data: "This is data" }
```

#### Removing Data

To remove data from the database, use the `remove` method:

```typescript
const removed = db.remove("cool") // returns true if data exists, otherwise returns false
```

#### Checking Data Existence

To check if a key exists in the database, use the `has` method:

```typescript
const exists = db.has("cool") // returns true if the key exists, otherwise false
```

#### Clearing the Database

To clear all data in the database, use the `clear` method:

```typescript
db.clear() // clears all data in the database
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

### `db.get(key)`

Gets the value for the specified key from the database.

-   `key`: A string representing the key.

### `db.remove(key)`

Removes the value for the specified key from the database.

-   `key`: A string representing the key.

### `db.has(key)`

Checks if the specified key exists in the database.

-   `key`: A string representing the key.

### `db.clear()`

Clears all data from the database.

## Example

### JavaScript Example

```javascript
const { database } = require("xcf-db")

const db = database()

// Set data
db.set("cool", { data: "This is data" }) // returns { data: "This is data" }

// Get data
db.get("cool") // returns { data: "This is data" }

// Check if data exists
db.has("cool") // returns true

// Remove data
db.remove("cool") // returns true if data exists, otherwise returns false

// Clear the database
db.clear() // clears all data
```

### TypeScript Example

```typescript
import { database } from "xcf-db"

const db = database<{ data: string }>()

// Set data
db.set("cool", { data: "This is data" }) // returns { data: "This is data" }

// Get data
const data = db.get("cool") // returns { data: "This is data" }

// Check if data exists
const exists = db.has("cool") // returns true

// Remove data
const removed = db.remove("cool") // returns true if data exists, otherwise returns false

// Clear the database
db.clear() // clears all data
```

## License

This project is licensed under the Apache-2.0 License.
