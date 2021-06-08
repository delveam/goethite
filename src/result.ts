const enum ResultType {
	Ok,
	Err,
}

export default class Result<T, E> {
	readonly #meta: ResultType;
	readonly #contents: T | E;

	private constructor(meta: ResultType, contents: T | E) {
		this.#meta = meta;
		this.#contents = contents;
	}

	public isOk(): boolean {
		return this.#meta === ResultType.Ok;
	}

	public isErr(): boolean {
		return this.#meta === ResultType.Err;
	}

	public expect(errorMessage: string): T {
		switch (this.#meta) {
			case ResultType.Ok:
				return this.#contents as T;
			case ResultType.Err:
				throw new TypeError(`${errorMessage}: ${this.#contents}`);
		}
	}

	public expectErr(errorMessage: string): E {
		switch (this.#meta) {
			case ResultType.Ok:
				throw new TypeError(`${errorMessage}: ${this.#contents}`);
			case ResultType.Err:
				return this.#contents as E;
		}
	}

	public unwrap(): T {
		switch (this.#meta) {
			case ResultType.Ok:
				return this.#contents as T;
			case ResultType.Err:
				throw new Error(`${this.#contents}`);
		}
	}

	public unwrapErr(): E {
		switch (this.#meta) {
			case ResultType.Ok:
				throw new Error(`${this.#contents}`);
			case ResultType.Err:
				return this.#contents as E;
		}
	}

	public unwrapOr(fallbackValue: T): T {
		switch (this.#meta) {
			case ResultType.Ok:
				return this.#contents as T;
			case ResultType.Err:
				return fallbackValue;
		}
	}

	public unwrapOrElse(onError: () => T): T {
		switch (this.#meta) {
			case ResultType.Ok:
				return this.#contents as T;
			case ResultType.Err:
				return onError();
		}
	}

	public map<U>(onSuccess: (value: T) => U): Result<U, E> {
		switch (this.#meta) {
			case ResultType.Ok:
				return Result.ok<U, E>(onSuccess(this.#contents as T));
			case ResultType.Err:
				return Result.err<U, E>(this.#contents as E);
		}
	}

	public mapOr<U>(fallbackValue: U, onSuccess: (value: T) => U): U {
		switch (this.#meta) {
			case ResultType.Ok:
				return onSuccess(this.#contents as T);
			case ResultType.Err:
				return fallbackValue;
		}
	}

	public mapOrElse<U>(onError: (error: E) => U, onSuccess: (value: T) => U): U {
		switch (this.#meta) {
			case ResultType.Ok:
				return onSuccess(this.#contents as T);
			case ResultType.Err:
				return onError(this.#contents as E);
		}
	}

	public andThen<U>(onSuccess: (value: T) => Result<U, E>): Result<U, E> {
		switch (this.#meta) {
			case ResultType.Ok:
				return onSuccess(this.#contents as T);
			case ResultType.Err:
				return Result.err<U, E>(this.#contents as E);
		}
	}

	public eq(other: Result<T, E>): boolean {
		return this.#meta === other.#meta && this.#contents === other.#contents;
	}

	public toString(): string {
		switch (this.#meta) {
			case ResultType.Ok:
				return `Ok(${JSON.stringify(this.#contents)})`;
			case ResultType.Err:
				return `Err(${JSON.stringify(this.#contents)})`;
		}
	}

	public static ok<T, E>(value: T): Result<T, E> {
		return new Result<T, E>(ResultType.Ok, value);
	}

	public static err<T, E>(value: E): Result<T, E> {
		return new Result<T, E>(ResultType.Err, value);
	}
}

export function ok<T, E>(value: T): Result<T, E> {
	return Result.ok<T, E>(value);
}

export function err<T, E>(value: E): Result<T, E> {
	return Result.err<T, E>(value);
}
