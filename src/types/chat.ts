export interface ChatMessage {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_email?: string;
  image_url?: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'group' | 'private';
  created_at: string;
}
