import { Application } from "https://deno.land/x/oak@v6.2.0/mod.ts"
import * as path from "https://deno.land/std@0.66.0/path/mod.ts"
import { etaEngine } from "./mod.ts"

declare module "https://deno.land/x/oak@v6.2.0/mod.ts" {
  interface Context {
    render: (fileName: string, data?: object) => void
  }
}

const __dirname = new URL(".", import.meta.url).pathname

const app = new Application()

app.use(
  etaEngine({
    views: path.join(__dirname, "views"),
    cache: false
  })
)

app.use((ctx) => {
  ctx.render("template", {
    favorite: "cake",
    number: Math.floor(Math.random() * 100) + 1
  })
})

console.log("Listening on http://localhost:8000")

await app.listen({ port: 8000 })
