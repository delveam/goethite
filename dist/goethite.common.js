"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

// Yoinked from: https://stackoverflow.com/a/4673436
function stringFormat(format, ...args) {
	return format.replace(/\{(\d+)\}/g, (substring, index) => {
		return typeof args[index] !== "undefined" ? args[index] : substring;
	});
}
function println(format, ...args) {
	console.log(stringFormat(format, ...args));
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

var __classPrivateFieldSet$1 =
	(undefined && undefined.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
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
	};
var __classPrivateFieldGet$1 =
	(undefined && undefined.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
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
	};
var _Option_meta, _Option_contents;
class Option {
	constructor(meta, contents) {
		_Option_meta.set(this, void 0);
		_Option_contents.set(this, void 0);
		__classPrivateFieldSet$1(this, _Option_meta, meta, "f");
		__classPrivateFieldSet$1(this, _Option_contents, contents, "f");
	}
	isSome() {
		return __classPrivateFieldGet$1(this, _Option_meta, "f") == 0 /* Some */;
	}
	isNone() {
		return __classPrivateFieldGet$1(this, _Option_meta, "f") == 1 /* None */;
	}
	expect(errorMessage) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return __classPrivateFieldGet$1(this, _Option_contents, "f");
			case 1 /* None */:
				throw new TypeError(errorMessage);
		}
	}
	unwrap() {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return __classPrivateFieldGet$1(this, _Option_contents, "f");
			case 1 /* None */:
				throw new TypeError("Attempted to unwrap 'None' value.");
		}
	}
	unwrapOr(fallbackValue) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return __classPrivateFieldGet$1(this, _Option_contents, "f");
			case 1 /* None */:
				return fallbackValue;
		}
	}
	unwrapOrElse(onError) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return __classPrivateFieldGet$1(this, _Option_contents, "f");
			case 1 /* None */:
				return onError();
		}
	}
	map(onSuccess) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return Option.some(
					onSuccess(__classPrivateFieldGet$1(this, _Option_contents, "f"))
				);
			case 1 /* None */:
				return Option.none();
		}
	}
	mapOr(fallbackValue, onSuccess) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return onSuccess(__classPrivateFieldGet$1(this, _Option_contents, "f"));
			case 1 /* None */:
				return fallbackValue;
		}
	}
	mapOrElse(onError, onSuccess) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return onSuccess(__classPrivateFieldGet$1(this, _Option_contents, "f"));
			case 1 /* None */:
				return onError();
		}
	}
	andThen(onSuccess) {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return onSuccess(__classPrivateFieldGet$1(this, _Option_contents, "f"));
			case 1 /* None */:
				return Option.none();
		}
	}
	eq(other) {
		return (
			__classPrivateFieldGet$1(this, _Option_meta, "f") ===
				__classPrivateFieldGet$1(other, _Option_meta, "f") &&
			__classPrivateFieldGet$1(this, _Option_contents, "f") ===
				__classPrivateFieldGet$1(other, _Option_contents, "f")
		);
	}
	toString() {
		switch (__classPrivateFieldGet$1(this, _Option_meta, "f")) {
			case 0 /* Some */:
				return `Some(${JSON.stringify(
					__classPrivateFieldGet$1(this, _Option_contents, "f")
				)})`;
			case 1 /* None */:
				return `None`;
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

var __classPrivateFieldSet =
	(undefined && undefined.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
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
	};
var __classPrivateFieldGet =
	(undefined && undefined.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
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
	};
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
			case 0 /* Ok */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
			case 1 /* Err */:
				throw new TypeError(
					`${errorMessage}: ${__classPrivateFieldGet(
						this,
						_Result_contents,
						"f"
					)}`
				);
		}
	}
	expectErr(errorMessage) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				throw new TypeError(
					`${errorMessage}: ${__classPrivateFieldGet(
						this,
						_Result_contents,
						"f"
					)}`
				);
			case 1 /* Err */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
		}
	}
	unwrap() {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
			case 1 /* Err */:
				throw new Error(
					`${__classPrivateFieldGet(this, _Result_contents, "f")}`
				);
		}
	}
	unwrapErr() {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				throw new Error(
					`${__classPrivateFieldGet(this, _Result_contents, "f")}`
				);
			case 1 /* Err */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
		}
	}
	unwrapOr(fallbackValue) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
			case 1 /* Err */:
				return fallbackValue;
		}
	}
	unwrapOrElse(onError) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return __classPrivateFieldGet(this, _Result_contents, "f");
			case 1 /* Err */:
				return onError();
		}
	}
	map(onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return Result.ok(
					onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"))
				);
			case 1 /* Err */:
				return Result.err(__classPrivateFieldGet(this, _Result_contents, "f"));
		}
	}
	mapOr(fallbackValue, onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			case 1 /* Err */:
				return fallbackValue;
		}
	}
	mapOrElse(onError, onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			case 1 /* Err */:
				return onError(__classPrivateFieldGet(this, _Result_contents, "f"));
		}
	}
	andThen(onSuccess) {
		switch (__classPrivateFieldGet(this, _Result_meta, "f")) {
			case 0 /* Ok */:
				return onSuccess(__classPrivateFieldGet(this, _Result_contents, "f"));
			case 1 /* Err */:
				return Result.err(__classPrivateFieldGet(this, _Result_contents, "f"));
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
			case 0 /* Ok */:
				return `Ok(${JSON.stringify(
					__classPrivateFieldGet(this, _Result_contents, "f")
				)})`;
			case 1 /* Err */:
				return `Err(${JSON.stringify(
					__classPrivateFieldGet(this, _Result_contents, "f")
				)})`;
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

exports.Option = Option;
exports.Result = Result;
exports.assert = assert;
exports.err = err;
exports.none = none;
exports.ok = ok;
exports.println = println;
exports.some = some;
