import { db } from '../db';
import { Item } from './item.model';

export interface Like {
  id: string,
  user_id: string,
  item_id: string
}

export class Like {
  static getById(id: string) {
    const res = db.query<Like, string>('SELECT * FROM Like WHERE id = ?').get(id)
    return res
  }
  static getByUserIdAndItemId(data: Omit<Like, 'id'>) {
    const res = db.query<Like, Record<string, string>>('SELECT * FROM Like WHERE user_id = $user_id AND item_id = $item_id').get(data)
    return res
  }
  static getAllUsersByItemId(id: string) {
    const res = db.query<Like, string>(`
      SELECT * FROM Like
      INNER JOIN user ON like.user_id = user.id
      WHERE like.item_id = ?
    `).all(id);
    return res
  }
  static getAllItemsByUserId(id: string) {
    const res = db.query<Item, string>(`
      SELECT * FROM Like
      INNER JOIN item ON like.item_id = item.id
      WHERE like.user_id = ?
    `).all(id)
    return res
  }
  static create(data: Omit<Like, 'id'>) {
    const result = db.query<Like, Record<string, string>>(`
      INSERT INTO like
      (id, user_id, item_id)
      VALUES ($id, $user_id, $item_id)
      RETURNING *`
    ).get({...data, id: crypto.randomUUID()})

    return result;
  }
  static deleteById(id: string) {
    const res = db.query<Like, string>('DELETE FROM like WHERE id = ? RETURNING *').get(id)
    return res
  }
}