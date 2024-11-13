import { db } from '../db';
import { SQLiteError } from "bun:sqlite";

export interface Chat {
  id: string,
  user_id: string,
  seller_id: string
}

export class Chat {
  static create(data: Omit<Chat, 'id'>) {
    const query = db.query<Chat, Record<string, string>>(`
      INSERT INTO chat
      (id, user_id, seller_id)
      VALUES ($id, $user_id, $seller_id)
      RETURNING *;
    `)
    try {
      return query.get({...data, id: crypto.randomUUID()})
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
  static getByUserIds(data: Omit<Chat, 'id'>) {
    const query = db.query<Chat, Record<string, string>>(`
      SELECT *
      FROM chat
      WHERE user_id = $user_id AND seller_id = $seller_id 
    `)
    try {
      return query.get(data)
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
  static getAllByUserId(id: string) {
    const query = db.query<{id: string, name: string}, string>(`
      SELECT chat.id AS id, user.name AS name
      FROM chat
      JOIN user ON chat.seller_id = user.id
      WHERE chat.user_id = ?
    `)
    try {
      return query.all(id)
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static getAllBySellerId(id: string) {
    const query = db.query<{id: string, name: string}, string>(`
      SELECT chat.id AS id, user.name AS name
      FROM chat
      JOIN user ON chat.user_id = user.id
      WHERE chat.seller_id = ?
    `)
    try {
      return query.all(id)
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  
}