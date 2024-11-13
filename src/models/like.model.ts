import { SQLiteError } from 'bun:sqlite';
import { db } from '../db';
import { Item } from './item.model';

export interface Like {
  id: string,
  user_id: string,
  item_id: string
}

export class Like {
  static getById(id: string) {
    const query = db.query<Like, string>('SELECT * FROM Like WHERE id = ?')
    try {
      return query.get(id)
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
  static getByUserIdAndItemId(data: Omit<Like, 'id'>) {
    const query = db.query<Like, Record<string, string>>('SELECT * FROM Like WHERE user_id = $user_id AND item_id = $item_id')
    try {
      return query.get(data)
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
  static getAllUsersByItemId(id: string) {
    const query = db.query<Like, string>(`
      SELECT * FROM Like
      INNER JOIN user ON like.user_id = user.id
      WHERE like.item_id = ?
    `)
    try {
      return query.all(id);
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static getAllItemsByUserId(id: string) {
    const query = db.query<Item, string>(`
      SELECT * FROM Like
      INNER JOIN item ON like.item_id = item.id
      WHERE like.user_id = ?
    `)
    try {
      return query.all(id);
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static create(data: Omit<Like, 'id'>) {
    const query = db.query<Like, Record<string, string>>(`
      INSERT INTO like
      (id, user_id, item_id)
      VALUES ($id, $user_id, $item_id)
      RETURNING *`
    )

    try {
      return query.get({...data, id: crypto.randomUUID()})
    } catch (error) {
      console.log((error as SQLiteError).message);
    };
  }
  static deleteById(id: string) {
    const query = db.query<Like, string>('DELETE FROM like WHERE id = ? RETURNING *')
    try {
      return query.get(id);
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
}