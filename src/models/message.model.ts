import { db } from '../db';

export interface Message {
  id: string,
  time: Date,
  text: string,
  read: number,
  user_id: string,
  chat_id: string,
  name?: string
}

export class Message {
  static getAllByChatId(id: string) {
    const res = db.query<Message, string>(`
      SELECT user.name AS name, message.*
      FROM message
      JOIN user ON message.user_id = user.id
      WHERE message.chat_id = ?
      ORDER BY message.time DESC
    `).all(id)
    return res
  }
  static create(data: {
    text: string,
    user_id: string,
    chat_id: string
  }) {
    const res = db.query<Message, Record<string, string>>(`
      INSERT INTO message
      (id, text, chat_id, user_id)
      VALUES ($id, $text, $chat_id, $user_id)
      RETURNING *
    `).get({...data, id: crypto.randomUUID()})
    return res
  }

  static readMessages(data: {chat_id: string, user_id: string}) {
    const res = db.query<Message, Record<string, string>>(`
      UPDATE message
      SET read = 1
      WHERE chat_id = $chat_id AND user_id != $user_id
    `).get(data)
    return res
  }
  
  static inboxCount(id: string) {
    const res = db.query<{value: number}, string>(`
      SELECT COUNT(*) as value
      FROM message
      JOIN chat ON message.chat_id = chat.id
      WHERE (chat.user_id = ? OR chat.seller_id = ?)
      AND message.read = 0 AND message.user_id != ?
    `).get(id)
    return res?.value ?? 0
  }
}