import { SlackEvent } from "../domain/SlackEventModel";
import { SlackService } from "../application/SlackService";

// Helper to verify Slack signature (optional, for production)
// For now, we skip signature verification for simplicity

export async function handleSlackEvent(req: Request, env: any): Promise<Response> {
  const body = await req.text();
  let event: SlackEvent;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Slack URL verification challenge
  if (event.type === "url_verification" && event.challenge) {
    return new Response(event.challenge, { status: 200 });
  }

  // Only handle message events (ignore bot messages)
  if (event.event && event.event.type === "message" && !event.event.bot_id) {
    const slack = new SlackService(env.SLACK_BOT_TOKEN);
    // For testing, just reply with a static message
    const testReply = "Hello from your Cloudflare Worker Slack bot!";
    await slack.postMessage(event.event.channel!, testReply);
  }

  return new Response("ok", { status: 200 });
}
