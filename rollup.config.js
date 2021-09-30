import { terser } from "rollup-plugin-terser";

export default [
	{
		input: "./build/index.js",
		output: [
			{
				format: "cjs",
				file: "dist/goethite.cjs",
			},
			{
				format: "cjs",
				file: "dist/goethite.min.cjs",
				plugins: [terser()],
			},
			{
				format: "es",
				file: "dist/goethite.mjs",
			},
			{
				format: "es",
				file: "dist/goethite.min.mjs",
				plugins: [terser()],
			},
		],
	},
];
