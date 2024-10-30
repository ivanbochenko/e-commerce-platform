import { db } from '../db';

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
  static getAllByItemId(id: string) {
    const res = db.query<Like, string>('SELECT * FROM Like WHERE item_id = ?').all(id);
    return res
  }
  static getAllByUserId(id: string) {
    const res = db.query<Like, string>('SELECT * FROM Like WHERE user_id = ?').all(id)
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