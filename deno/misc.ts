export function format(formatString: string, ...args: unknown[]): string {
	// Yoinked from: https://stackoverflow.com/a/4673436
	return formatString.replace(/\{(\d+)\}/g, (substring, index) => {
		return typeof args[index] !== "undefined"
			? (args[index] as string)
			: substring;
	});
}

export function println(message: string, ...args: unknown[]): void {
	console.log(format(message, ...args));
}

export function assert(expression: boolean, errorMessage?: string): void {
	if (!expression) {
		throw new TypeError(errorMessage ?? "Assertion failed.");
	}
}
