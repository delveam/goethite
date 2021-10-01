export default class Result<T, E> {
	#private;
	private constructor();
	isOk(): boolean;
	isErr(): boolean;
	expect(errorMessage: string): T;
	expectErr(errorMessage: string): E;
	unwrap(): T;
	unwrapErr(): E;
	unwrapOr(fallbackValue: T): T;
	unwrapOrElse(onError: () => T): T;
	map<U>(onSuccess: (value: T) => U): Result<U, E>;
	mapOr<U>(fallbackValue: U, onSuccess: (value: T) => U): U;
	mapOrElse<U>(onError: (error: E) => U, onSuccess: (value: T) => U): U;
	andThen<U>(onSuccess: (value: T) => Result<U, E>): Result<U, E>;
	eq(other: Result<T, E>): boolean;
	toString(): string;
	static ok<T, E>(value: T): Result<T, E>;
	static err<T, E>(value: E): Result<T, E>;
}
export declare function ok<T, E>(value: T): Result<T, E>;
export declare function err<T, E>(value: E): Result<T, E>;
