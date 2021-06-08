import { terser } from "rollup-plugin-terser";

export default [
	{
		input: "./build/index.js",
		output: [
			{
				format: "umd",
				name: "Goethite",
				file: `dist/goethite.js`,
			},
			{
				format: "umd",
				name: "Goethite",
				file: "dist/goethite.min.js",
				plugins: [terser()],
			},
			{
				format: "cjs",
				file: "dist/goethite.common.js",
			},
			{
				format: "cjs",
				file: "dist/goethite.common.min.js",
				plugins: [terser()],
			},
			{
				format: "es",
				file: "dist/goethite.esm.js",
			},
			{
				format: "es",
				file: "dist/goethite.esm.min.js",
				plugins: [terser()],
			},
		],
	},
];
