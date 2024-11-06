import { db } from '../db';

export interface Item {
  id: string,
  name: string,
  price: number,
  image: string,
  user_id: string,
  stars?: number,
  description?: string,
}

export class Item {
  static getAll() {
    const res = db.query<Item, null>('SELECT * FROM item ORDER BY stars DESC').all(null);
    return res
  }
  static getById(id: string) {
    const res = db.query<Item, string>('SELECT * FROM item WHERE id = ?').get(id)
    return res
  }
  static getAllByUserId(id: string) {
    const res = db.query<Item, string>('SELECT * FROM item WHERE user_id = ?').all(id)
    return res
  }
  static search(input: string) {
    const res = db.query<Item, null>(
      `SELECT * FROM item WHERE name LIKE '%${input}%' OR description LIKE '%${input}%'`
    ).all(null)
    return res
  }

  static create(data: Omit<Item, 'id'>) {
    const result = db.query<Item, Record<string, string | number>>(`
      INSERT INTO user
      (id, name, email, password)
      VALUES ($id, $name, $email, $password)
      RETURNING *`
    ).get({...data, id: crypto.randomUUID()})

    return result;
  }
}