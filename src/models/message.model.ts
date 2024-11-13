import { SQLiteError } from 'bun:sqlite';
import { db } from '../db';

export interface Message {
  id: string,
  time: string,
  text: string,
  read: number,
  user_id: string,
  chat_id: string,
  name?: string
}

export class Message {
  static getAllByChatId(id: string) {
    const query = db.query<Message, string>(`
      SELECT user.name AS name, message.*
      FROM message
      JOIN user ON message.user_id = user.id
      WHERE message.chat_id = ?
      ORDER BY message.time DESC
    `)
    try {
      return query.all(id);
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static create(data: {
    text: string,
    user_id: string,
    chat_id: string
  }) {
    const query = db.query<Message, Record<string, string>>(`
      INSERT INTO message
      (id, text, chat_id, user_id)
      VALUES ($id, $text, $chat_id, $user_id)
      RETURNING *
    `)
    try {
      return query.get({...data, id: crypto.randomUUID()})
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }

  static readMessages(data: {chat_id: string, user_id: string}) {
    const query = db.query<Message, Record<string, string>>(`
      UPDATE message
      SET read = 1
      WHERE chat_id = $chat_id AND user_id != $user_id
    `)
    try {
      return query.all(data);
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  
  static inboxCount(id: string) {
    const query = db.query<{value: number}, {id: string}>(`
      SELECT COUNT(*) as value
      FROM message
      JOIN chat ON message.chat_id = chat.id
      WHERE (chat.user_id = $id OR chat.seller_id = $id)
      AND message.read = 0 AND message.user_id != $id
    `)
    try {
      return query.get({id})?.value ?? 0
    } catch (error) {
      console.log((error as SQLiteError).message);
      return 0
    }
  }
}