import type { Middleware, Context } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { WebSocket, acceptable } from 'https://deno.land/std@0.76.0/ws/mod.ts'
export type WebSocketHandler = (socket: WebSocket, url: URL, headers: Headers) => Promise<void>;

export function WebSocketMiddleware(handler: WebSocketHandler){
    return async function real_middleware(ctx: Context, next: () => Promise<void>) {
            if(acceptable(ctx.request)) {
            let ws = await ctx.upgrade();
            await handler(ws, ctx.request.url, ctx.request.headers);
        } else {
            return await next();
        }
    };
}