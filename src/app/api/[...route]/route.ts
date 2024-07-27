import { D1Database } from "@cloudflare/workers-types";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/query/customers", async (c) => {
  let { results } = await process.env.DB.prepare(
    "SELECT * FROM customers"
  ).all();
  return c.json(results);
});

export const GET = handle(app);
