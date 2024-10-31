import { db } from '../db';

export interface Message {
  id: string,
  user_id: string,
  item_id: string
}
export interface Read {
  id: string,
  user_id: string,
  message_id: string,
  value: boolean
}

export class Message {
  static createRead(input: {message_id: string, user_id: string}) {
    const res = db.query<Read, Record<string, string>>(`
      INSERT INTO read
      (id, user_id, message_id)
      VALUES ($id, $user_id, $message_id)
      RETURNING *
    `).get({...input, id: crypto.randomUUID()})
    return res
  }
  static inboxCountByUserId(id: string) {
    const res = db.query<{value: number}, string>('SELECT COUNT(*) as value FROM read WHERE user_id = ? AND value = 0').get(id)
    return res?.value ?? 0
  }
}