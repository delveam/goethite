const enum OptionType {
	Some,
	None,
}

export default class Option<T> {
	readonly #meta: OptionType;
	readonly #contents: T | null;

	private constructor(meta: OptionType, contents: T | null) {
		this.#meta = meta;
		this.#contents = contents;
	}

	public isSome(): boolean {
		return this.#meta == OptionType.Some;
	}

	public isNone(): boolean {
		return this.#meta == OptionType.None;
	}

	public expect(errorMessage: string): T {
		switch (this.#meta) {
			case OptionType.Some: {
				return this.#contents as T;
			}
			case OptionType.None: {
				throw new TypeError(errorMessage);
			}
		}
	}

	public unwrap(): T {
		switch (this.#meta) {
			case OptionType.Some: {
				return this.#contents as T;
			}
			case OptionType.None: {
				throw new TypeError("Attempted to unwrap 'None' value.");
			}
		}
	}

	public unwrapOr(fallbackValue: T): T {
		switch (this.#meta) {
			case OptionType.Some: {
				return this.#contents as T;
			}
			case OptionType.None: {
				return fallbackValue;
			}
		}
	}

	public unwrapOrElse(onError: () => T): T {
		switch (this.#meta) {
			case OptionType.Some: {
				return this.#contents as T;
			}
			case OptionType.None: {
				return onError();
			}
		}
	}

	public map<U>(onSuccess: (value: T) => U): Option<U> {
		switch (this.#meta) {
			case OptionType.Some: {
				return Option.some<U>(onSuccess(this.#contents as T));
			}
			case OptionType.None: {
				return Option.none<U>();
			}
		}
	}

	public mapOr<U>(fallbackValue: U, onSuccess: (value: T) => U): U {
		switch (this.#meta) {
			case OptionType.Some: {
				return onSuccess(this.#contents as T);
			}
			case OptionType.None: {
				return fallbackValue;
			}
		}
	}

	public mapOrElse<U>(onError: () => U, onSuccess: (value: T) => U): U {
		switch (this.#meta) {
			case OptionType.Some: {
				return onSuccess(this.#contents as T);
			}
			case OptionType.None: {
				return onError();
			}
		}
	}

	public andThen<U>(onSuccess: (value: T) => Option<U>): Option<U> {
		switch (this.#meta) {
			case OptionType.Some: {
				return onSuccess(this.#contents as T);
			}
			case OptionType.None: {
				return Option.none<U>();
			}
		}
	}

	public filter(predicate: (value: T) => boolean): Option<T> {
		switch (this.#meta) {
			case OptionType.Some: {
				if (predicate(this.#contents as T)) {
					return Option.some<T>(this.#contents as T);
				}

				return Option.none<T>();
			}
			case OptionType.None: {
				return Option.none<T>();
			}
		}
	}

	public eq(other: Option<T>): boolean {
		return this.#meta === other.#meta && this.#contents === other.#contents;
	}

	public toString(): string {
		switch (this.#meta) {
			case OptionType.Some: {
				return `Some(${JSON.stringify(this.#contents)})`;
			}
			case OptionType.None: {
				return `None`;
			}
		}
	}

	public static some<T>(value: T): Option<T> {
		if (value === null || value === undefined) {
			throw new TypeError(
				"An Option cannot contain a 'null' or 'undefiend' value; use 'Option.none()' to represent an empty value instead."
			);
		}

		return new Option<T>(OptionType.Some, value);
	}

	public static none<T>(): Option<T> {
		return new Option<T>(OptionType.None, null);
	}
}

export function some<T>(value: T): Option<T> {
	return Option.some<T>(value);
}

export function none<T>(): Option<T> {
	return Option.none<T>();
}
