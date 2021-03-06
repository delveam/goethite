function format(formatString, ...args) {
	// Yoinked from: https://stackoverflow.com/a/4673436
	return formatString.replace(/\{(\d+)\}/g, (substring, index) => {
		return typeof args[index] !== "undefined" ? args[index] : substring;
	});
}
function println(message, ...args) {
	console.log(format(message, ...args));
}
function assert(expression, errorMessage) {
	if (!expression) {
		throw new TypeError(
			errorMessage !== null && errorMessage !== void 0
				? errorMessage
				: "Assertion failed."
		);
	}
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f)
		throw new TypeError("Private accessor was defined without a getter");
	if (
		typeof state === "function"
			? receiver !== state || !f
			: !state.has(receiver)
	)
		throw new TypeError(
			"Cannot read private member from an object whose class did not declare it"
		);
	return kind === "m"
		? f
		: kind === "a"
		? f.call(receiver)
		: f
		? f.value
		: state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f)
		throw new TypeError("Private accessor was defined without a setter");
	if (
		typeof state === "function"
			? receiver !== state || !f
			: !state.has(receiver)
	)
		throw new TypeError(
			"Cannot write private member to an object whose class did not declare it"
		);
	return (
		kind === "a"
			? f.call(receiver, value)
			: f
			? (f.value = value)
			: state.set(receiver, value),
		value
	);
}

var _Option_meta, _Option_contents;
class Option {
	constructor(meta, contents) {
		_Option_meta.set(this, void 0);
		_Option_contents.set(this, void 0);
		__classPrivateFieldSet(this, _Option_meta, meta, "f");
		__classPrivateFieldSet(this, _Option_contents, contents, "f");
	}
	isSome() {
		return __classPrivateFieldGet(this, _Option_meta, "f") == 0 /* Some */;
	}
	isNone() {
		return __classPrivateFieldGet(this, _Option_meta, "f") == 1 /* None */;
	}
	expect(errorMessage) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return __classPrivateFieldGet(this, _Option_contents, "f");
			}
			case 1 /* None */: {
				throw new TypeError(errorMessage);
			}
		}
	}
	unwrap() {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return __classPrivateFieldGet(this, _Option_contents, "f");
			}
			case 1 /* None */: {
				throw new TypeError("Attempted to unwrap 'None' value.");
			}
		}
	}
	unwrapOr(fallbackValue) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return __classPrivateFieldGet(this, _Option_contents, "f");
			}
			case 1 /* None */: {
				return fallbackValue;
			}
		}
	}
	unwrapOrElse(onError) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return __classPrivateFieldGet(this, _Option_contents, "f");
			}
			case 1 /* None */: {
				return onError();
			}
		}
	}
	map(onSuccess) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return Option.some(
					onSuccess(__classPrivateFieldGet(this, _Option_contents, "f"))
				);
			}
			case 1 /* None */: {
				return Option.none();
			}
		}
	}
	mapOr(fallbackValue, onSuccess) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return onSuccess(__classPrivateFieldGet(this, _Option_contents, "f"));
			}
			case 1 /* None */: {
				return fallbackValue;
			}
		}
	}
	mapOrElse(onError, onSuccess) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return onSuccess(__classPrivateFieldGet(this, _Option_contents, "f"));
			}
			case 1 /* None */: {
				return onError();
			}
		}
	}
	andThen(onSuccess) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return onSuccess(__classPrivateFieldGet(this, _Option_contents, "f"));
			}
			case 1 /* None */: {
				return Option.none();
			}
		}
	}
	filter(predicate) {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				if (predicate(__classPrivateFieldGet(this, _Option_contents, "f"))) {
					return Option.some(
						__classPrivateFieldGet(this, _Option_contents, "f")
					);
				}
				return Option.none();
			}
			case 1 /* None */: {
				return Option.none();
			}
		}
	}
	eq(other) {
		return (
			__classPrivateFieldGet(this, _Option_meta, "f") ===
				__classPrivateFieldGet(other, _Option_meta, "f") &&
			__classPrivateFieldGet(this, _Option_contents, "f") ===
				__classPrivateFieldGet(other, _Option_contents, "f")
		);
	}
	toString() {
		switch (__classPrivateFieldGet(this, _Option_meta, "f")) {
			case 0 /* Some */: {
				return `Some(${JSON.stringify(
					__classPrivateFieldGet(this, _Option_contents, "f")
				)})`;
			}
			case 1 /* None */: {
				return `None`;
			}
		}
	}
	static some(value) {
		if (value === null || value === undefined) {
			throw new TypeError(
				"An Option cannot contain a 'null' or 'undefiend' value; use 'Option.none()' to represent an empty value instead."
			);
		}
		return new Option(0 /* Some */, value);
	}
	static none() {
		return new Option(1 /* None */, null);
	}
}
(_Option_meta = new WeakMap()), (_Option_contents = new WeakMap());
function some(value) {
	return Option.some(value);
}
function none() {
	return Option.none();
}

var _Result_meta, _Result_contents;
class Result {
	constructor(meta, contents) {
		_Result_meta.set(this, void 0);
		_Result_contents.set(this, void 0);
		__classPrivateFieldSet(this, _Result_meta, meta, "f");
		__classPrivateFieldSet(this, _Result_contents, contents, "f");
	}
	isOk() {
		return __classPrivateFieldGet(this, _Result_meta, "f") === 0 /* Ok */;
	}
	isErr() {
		return __classPrivateFieldGet(this, _Result_meta, "f") === 1 /* Err */;
	}
	expect(errorMessage) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
			case 1 /* Err */: {
				throw new TypeError(`${errorMessage}`);
			}
		}
	}
	expectErr(errorMessage) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				throw new TypeError(`${errorMessage}`);
			}
			case 1 /* Err */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
		}
	}
	unwrap() {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
			case 1 /* Err */: {
				throw new TypeError("Attempted to call `unwrap` on an `Err` value.");
			}
		}
	}
	unwrapErr() {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				throw new TypeError("Attempted to call `unwrapErr` on an `Ok` value.");
			}
			case 1 /* Err */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
		}
	}
	unwrapOr(fallbackValue) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
			case 1 /* Err */: {
				return fallbackValue;
			}
		}
	}
	unwrapOrElse(onError) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return __classPrivateFieldGet(this, _Result_contents, "f");
			}
			case 1 /* Err */: {
				return onError();
			}
		}
	}
	map(onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return Result.ok(
					onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"))
				);
			}
			case 1 /* Err */: {
				return Result.err(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
		}
	}
	mapOr(fallbackValue, onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
			case 1 /* Err */: {
				return fallbackValue;
			}
		}
	}
	mapOrElse(onError, onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
			case 1 /* Err */: {
				return onError(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
		}
	}
	andThen(onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
			case 1 /* Err */: {
				return Result.err(__classPrivateFieldGet(this, _Result_contents, "f"));
			}
		}
	}
	eq(other) {
		return (
			__classPrivateFieldGet(this, _Result_meta, "f") ===
				__classPrivateFieldGet(other, _Result_meta, "f") &&
			__classPrivateFieldGet(this, _Result_contents, "f") ===
				__classPrivateFieldGet(other, _Result_contents, "f")
		);
	}
	toString() {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */: {
				return `Ok(${JSON.stringify(
					__classPrivateFieldGet(this, _Result_contents, "f")
				)})`;
			}
			case 1 /* Err */: {
				return `Err(${JSON.stringify(
					__classPrivateFieldGet(this, _Result_contents, "f")
				)})`;
			}
		}
	}
	static ok(value) {
		return new Result(0 /* Ok */, value);
	}
	static err(value) {
		return new Result(1 /* Err */, value);
	}
}
(_Result_meta = new WeakMap()), (_Result_contents = new WeakMap());
function ok(value) {
	return Result.ok(value);
}
function err(value) {
	return Result.err(value);
}

export { Option, Result, assert, err, format, none, ok, println, some };
