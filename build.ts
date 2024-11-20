process.stdout.write(`bundling... `)
console.time("")
const data = await Bun.build({
  entrypoints: ["./src/index.tsx"],
  extensions: {
    css: "text",
  },
  footer: `// TODO(PoolloverNathan): witty footer comment`,
  minify: true,
  outdir: "./dist",
  root: "./src",
  sourcemap: "linked",
  splitting: true,
  target: "browser",
  watch: process.env.watch && process.env.watch != "",
})
if (!data.success) {
  console.log("\x1b[31mfailed!\x1b[39m")
  for (let log of data.logs) console.error(log)
  process.exit(1)
}
process.stdout.write(`done `)
console.timeEnd("")
