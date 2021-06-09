// eslint-disable-next-line -- `args` must be of any type to mimic Rust's macro system.
export function format(formatString: string, ...args: any[]): string {
	// Yoinked from: https://stackoverflow.com/a/4673436
	return formatString.replace(/\{(\d+)\}/g, (substring, index) => {
		return typeof args[index] !== "undefined" ? args[index] : substring;
	});
}

// eslint-disable-next-line -- `args` must be of any type to mimic Rust's macro system.
export function println(message: string, ...args: any[]): void {
	console.log(format(message, ...args));
}

export function assert(expression: boolean, errorMessage?: string): void {
	if (!expression) {
		throw new TypeError(errorMessage ?? "Assertion failed.");
	}
}
