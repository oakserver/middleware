import type { Middleware, Context } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { WebSocket, acceptable } from 'https://deno.land/std@0.76.0/ws/mod.ts'
export type handler = (socket: WebSocket, url: URL, headers: Headers) => Promise<void>;
export class WebSocketMiddleware {
    public handler: handler;

    constructor(handler: handler) {
        this.handler = handler;
    }

    private async real_middleware(ctx: Context, next: () => Promise<void>) {
        if (acceptable(ctx.request)) {
            let ws = await ctx.upgrade();
            await this.handler(ws, ctx.request.url, ctx.request.headers);
        } else {
            return await next();
        }
    }

    public middleware(): Middleware {
        return async (ctx, next) => { await this.real_middleware(ctx, next) };
    }
}