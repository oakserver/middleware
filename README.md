# oak middleware

[![ci](https://github.com/oakserver/middleware/workflows/ci/badge.svg)](https://github.com/oakserver/middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/oak_middleware/mod.ts)

A collection of middleware for the
[oak framework](https://oakserver.github.io/oak/).

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
