import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	output: [
		{
			format: "cjs",
			file: "dist/goethite.cjs",
		},
		{
			format: "cjs",
			file: "dist/goethite.min.cjs",
			plugins: [terser({ format: { comments: false } })],
		},
		{
			format: "es",
			file: "dist/goethite.mjs",
		},
		{
			format: "es",
			file: "dist/goethite.min.mjs",
			plugins: [terser({ format: { comments: false } })],
		},
	],
	plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
