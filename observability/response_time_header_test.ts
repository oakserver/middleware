// Copyright 2020 the oak authors. All rights reserved. MIT license.

import { Context } from "../deps.ts";
import { test } from "../test_deps.ts";
import { responseTimeHeader } from "./response_time_header.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.51.0/testing/asserts.ts";

test({
  name: "responseTimeHeader",
  async fn() {
    const mockContext = {
      response: {
        headers: new Headers(),
      },
    } as Context;
    const mockNext = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 50);
      });
    };
    await responseTimeHeader(mockContext, mockNext);
    assertEquals(mockContext.response.headers.has("x-response-time"), true);
    const value = parseInt(
      mockContext.response.headers.get("x-response-time")!,
      10,
    );
    assert(value >= 50);
  },
});
