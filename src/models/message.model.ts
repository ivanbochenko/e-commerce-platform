import { db } from '../db';

export interface Message {
  id: string,
  user_id: string,
  item_id: string
}

export class Message {
  static inboxCountByUserId(id: string) {
    const res = db.query<{value: number}, string>('SELECT COUNT(*) as value FROM read WHERE user_id = ? AND value = 0').get(id)
    return res?.value ?? 0
  }
}