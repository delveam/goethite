// Yoinked from: https://stackoverflow.com/a/4673436
function stringFormat(format: string, ...args: string[]): string {
	return format.replace(/\{(\d+)\}/g, (substring, index) => {
		return typeof args[index] !== "undefined" ? args[index] : substring;
	});
}

export function println(format: string, ...args: string[]): void {
	console.log(stringFormat(format, ...args));
}

export function assert(expression: boolean, errorMessage?: string): void {
	if (!expression) {
		throw new TypeError(errorMessage ?? "Assertion failed.");
	}
}
