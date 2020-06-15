# oak middleware

[![ci](https://github.com/oakserver/middleware/workflows/ci/badge.svg)](https://github.com/oakserver/middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/oak_middleware/mod.ts)

A collection of middleware for the
[oak framework](https://oakserver.github.io/oak/).

## Usage

Each middleware has its own module, as well as all the middleware being
via the root `mod.ts`. If you just want everything, you can simply import
the `mod.ts`, for example:

```ts
import * as oakMiddleware from "https://deno.land/x/oak_middleware/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(oakMiddleware.responseTimeHeader);
```

Also consider using a tagged version of the middleware so that changes to the
main branch won't provide unexpected results in your code. For example, to use
version `v0.1.0` you would do the following:

```ts
import * as oakMiddleware from "https://deno.land/x/oak_middleware@v0.1.0/mod.ts";
```

If you just want specific middleware, you can just import it from its module:

```ts
import { responseTimeHeader } from "https://deno.land/x/oak_middleware/observability/response_time_header.ts";
```

If you want to manage all your external dependencies in one place, just follow
the convention of `deps.ts` and re-export what you want:

```ts
export { responseTimeHeader } from "https://deno.land/x/oak_middleware@v0.1.0/observability/response_time_header.ts";
export { Application } from "https://deno.land/x/oak@4.0.0/mod.ts";
```

And then in your other modules, just import from `deps.ts`:

```ts
import { Application, responseTimeHeader } from "./deps.ts";

const app = new Application();
app.use(responseTimeHeader);
// ...
await app.listen({ port: 80 });
```

## Middleware

This section contains middleware that is intended to be used with the `.use()`
method on the application.

### Observability

This is middleware that is used for instrumentation and observability of a
server created with oak.

#### responseTimeHeader

A middleware that will set the response time for other middleware in
milliseconds as `X-Response-Time` which can be used for diagnostics and other
instrumentation of an application. Utilise the middleware before the "real"
processing occurs.

```ts
import { responseTimeHeader } from "https://deno.land/x/oak-middleware/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new App();
app.use(responseTimeHeader);

// other middleware

await app.listen(":80");
```

## Router Middleware

This section contains middleware designed to work with the oak `Router`.

---

Copyright 2020 the oak authors. All rights reserved.
