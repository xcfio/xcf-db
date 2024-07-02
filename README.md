# xcf-db

`xcf-db` is a local lightweight database library for storing and managing data.

## Installation

You can install `xcf-db` using npm:

```sh
npm install xcf-db
```

## Usage

To use `xcf-db`, you need to import the `database` function and create an instance of the database.

### Creating a Database Instance

```javascript
const { database } = require("xcf-db")

const db = database()
```

If you want to use a custom path for your database, you can pass the `path` option:

```javascript
const db = database({ path: "Your Custom Path" })
```

### Setting Data

To set data in the database, use the `set` method:

```javascript
db.set("cool", { data: "This is data" }) // returns { data: "This is data" }
```

### Getting Data

To retrieve data from the database, use the `get` method:

```javascript
db.get("cool") // returns { data: "This is data" }
```

### Removing Data

To remove data from the database, use the `remove` method:

```javascript
db.remove("cool") // returns true if data exists, otherwise returns false
```

## API

### `database({options})`

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

## Example

```javascript
const { database } = require("xcf-db")

const db = database()

// Set data
db.set("cool", { data: "This is data" }) // returns { data: "This is data" }

// Get data
db.get("cool") // returns { data: "This is data" }

// Remove data
db.remove("cool") // returns true if data exists, otherwise returns false
```

## License

This project is licensed under the Apache-2.0 License.
