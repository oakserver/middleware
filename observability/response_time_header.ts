// Copyright 2020 the oak authors. All rights reserved. MIT license.

import { Middleware } from "../deps.ts";

/** A middleware that will set the response time for other middleware in
 * milliseconds as `X-Response-Time` which can be used for diagnostics and other
 * instrumentation of an application.  Utilise the middleware before the "real"
 * processing occurs.
 * 
 * ```ts
 * import { responseTimeHeader } from "https://deno.land/x/oak-middleware/mod.ts";
 * import { Application } from "https://deno.land/x/oak/mod.ts"
 * 
 * const app = new App();
 * app.use(responseTimeHeader);
 * 
 * // other middleware
 * 
 * await app.listen(":80");
 * ```
 */
export const responseTimeHeader: Middleware = async function (ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};
