export interface ChatMessage {
  id: number;
  username: string;
  text: string;
  is_from_admin: boolean;
  created_at: string;
}