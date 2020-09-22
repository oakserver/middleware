import { renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts"

export function etaEngine(opts: object) {
  return async function (ctx: any, next: Function) {
    Object.assign(ctx, {
      render: async function (filepath: string, data?: object) {
        try {
          ctx.response.type = "html"
          ctx.response.headers.set("Content-Type", "text/html; charset=utf-8")

          ctx.response.body = await renderFile(filepath, data || {}, opts)
        } catch (e) {
          ctx.response.status = 404
          console.log(e.message)
        }
      }
    })

    await next()
  }
}
