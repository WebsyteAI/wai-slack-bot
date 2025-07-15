// Domain model for Slack events

export interface SlackEvent {
  type: string;
  event?: {
    type: string;
    user?: string;
    text?: string;
    channel?: string;
    ts?: string;
    [key: string]: any;
  };
  challenge?: string;
  token?: string;
  team_id?: string;
  api_app_id?: string;
  event_id?: string;
  event_time?: number;
  authed_users?: string[];
  [key: string]: any;
}
