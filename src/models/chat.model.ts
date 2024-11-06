import { db } from '../db';

export interface Chat {
  id: string,
  user_id: string,
  seller_id: string
}

export class Chat {
  static create(data: Omit<Chat, 'id'>) {
    const result = db.query<Chat, Record<string, string>>(`
      INSERT INTO chat
      (id, user_id, seller_id)
      VALUES ($id, $user_id, $seller_id)
      RETURNING *;
    `).get({...data, id: crypto.randomUUID()})

    return result
  }
  static getByUserIds(data: Omit<Chat, 'id'>) {
    const res = db.query<Chat, Record<string, string>>(`
      SELECT *
      FROM chat
      WHERE user_id = $user_id AND seller_id = $seller_id 
    `).get(data)
    return res
  }
  static getAllByUserId(id: string) {
    const res = db.query<{id: string, name: string}, string>(`
      SELECT chat.id AS id, user.name AS name
      FROM chat
      JOIN user ON chat.seller_id = user.id
      WHERE chat.user_id = ?
    `).all(id)
    return res
  }
  static getAllBySellerId(id: string) {
    const res = db.query<{id: string, name: string}, string>(`
      SELECT chat.id AS id, user.name AS name
      FROM chat
      JOIN user ON chat.user_id = user.id
      WHERE chat.seller_id = ?
    `).all(id)
    return res
  }
  
}