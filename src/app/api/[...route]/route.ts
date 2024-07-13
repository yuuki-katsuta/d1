import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const route = app.get("/hello", async (c) => {
  return c.json({ name: "John Doe" });
});

export const GET = handle(app);
export type AppType = typeof route;
