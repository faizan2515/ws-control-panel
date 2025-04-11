export interface PayloadItem {
  id: string;
  payload: string;
  editing: boolean;
}

export interface Logs {
  type: "sent" | "received" | "generic";
  message: string;
}

export type WsStatuses = "success" | "warning" | "destructive";
