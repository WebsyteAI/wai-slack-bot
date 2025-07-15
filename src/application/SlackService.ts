// Application service for Slack API interaction

export class SlackService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async postMessage(channel: string, text: string) {
    const resp = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({ channel, text }),
    });
    return resp.json();
  }
}
