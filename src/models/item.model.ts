import { SQLiteError } from 'bun:sqlite';
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
    const query = db.query<Item, null>('SELECT * FROM item ORDER BY stars DESC')
    try {
      return query.all(null)
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static getById(id: string) {
    const query = db.query<Item, string>('SELECT * FROM item WHERE id = ?')
    try {
      return query.get(id)
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
  static getAllByUserId(id: string) {
    const query = db.query<Item, string>('SELECT * FROM item WHERE user_id = ?')
    try {
      return query.all(id)
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }
  static search(input: string) {
    const query = db.query<Item, null>(
      `SELECT * FROM item WHERE name LIKE '%${input}%' OR description LIKE '%${input}%'`
    )
    try {
      return query.all(null)
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }

  static create(data: Omit<Item, 'id'>) {
    const query = db.query<Item, Record<string, string | number>>(`
      INSERT INTO user
      (id, name, email, password)
      VALUES ($id, $name, $email, $password)
      RETURNING *`
    )

    try {
      return query.get({...data, id: crypto.randomUUID()})
    } catch (error) {
      console.log((error as SQLiteError).message);
    }
  }
}