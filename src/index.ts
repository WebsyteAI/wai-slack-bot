import { Hono } from "hono";
import { handleSlackEvent } from "./presentation/slack";

export type Env = {
  SLACK_BOT_TOKEN: string;
  AI_MODEL: any; // e.g., from env.AI or a model instance
};

const app = new Hono<Env>();

// Slack event endpoint
app.post("/slack/events", async (c) => {
  return await handleSlackEvent(c.req.raw, c.env);
});

export default app;
