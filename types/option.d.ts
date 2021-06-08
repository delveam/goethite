export default class Option<T> {
    #private;
    private constructor();
    isSome(): boolean;
    isNone(): boolean;
    expect(errorMessage: string): T;
    unwrap(): T;
    unwrapOr(fallbackValue: T): T;
    unwrapOrElse(onError: () => T): T;
    map<U>(onSuccess: (value: T) => U): Option<U>;
    mapOr<U>(fallbackValue: U, onSuccess: (value: T) => U): U;
    mapOrElse<U>(onError: () => U, onSuccess: (value: T) => U): U;
    andThen<U>(onSuccess: (value: T) => Option<U>): Option<U>;
    eq(other: Option<T>): boolean;
    toString(): string;
    static some<T>(value: T): Option<T>;
    static none<T>(): Option<T>;
}
export declare function some<T>(value: T): Option<T>;
export declare function none<T>(): Option<T>;
//# sourceMappingURL=option.d.ts.map