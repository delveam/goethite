# goethite

JavaScript meets Rust

## Examples

Using the Option type:

``` javascript
import { some } from "./goethite.esm.js";

const message = some(3)
  .map((v) => v * 8)
  .map((v) => v - 3)
  .map((v) => v * 2)
  .map((v) => `The meaning of life is ${v}.`);

console.log(message.unwrapOr("For a moment, nothing happened."));

// Output: "The meaning of life is 42."
```
Using the Result type:

``` javascript
import { ok, err } from "./goethite.esm.js";

const db = new Map();

db.set(345, { name: "Lewis" });
db.set(119, { name: "Marine" });

export function getUserById(id) {
  if (!db.has(id)) {
    return err("Could not find user in database.");
  }

  return ok(db.get(id));
}
```
