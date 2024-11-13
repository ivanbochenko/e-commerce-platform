import { SQLiteError } from 'bun:sqlite';
import { db } from '../db';

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  created: Date,
}

export class User {
  static getAll() {
    const query = db.query<User, null>('SELECT * FROM user')
    try {
      return query.all(null);
    } catch (error) {
      console.log((error as SQLiteError).message);
      return []
    }
  }

  static getById(userId: string) {
    const query = db.query<User, string>('SELECT * FROM user WHERE id = ?')
    try {
      return query.get(userId)
    } catch (error) {
      console.log((error as SQLiteError).message)
    }
  }

  static getByEmail(email: string) {
    const query = db.query<User, string>('SELECT * FROM user WHERE email = ?')
    try {
      return query.get(email)
    } catch (error) {
      console.log((error as SQLiteError).message)
    }
  }

  static deleteById(userId: string) {
    const query = db.query<User, string>('DELETE FROM user WHERE id = ? RETURNING *')
    try {
      return query.get(userId)
    } catch (error) {
      console.log((error as SQLiteError).message)
    }
  }

  static create(data: Omit<User, 'id' | 'created'>) {
    const query = db.query<User, Record<string, string>>(`INSERT INTO user
      (id, name, email, password)
      VALUES ($id, $name, $email, $password)
      RETURNING *`
    )
    try {
      return query.get({...data, id: crypto.randomUUID()})
    } catch (error) {
      console.log((error as SQLiteError).message)
    }
  }

  static updateByEmail({email, password}: {email: string, password: string}) {
    const query = db.query<User, Record<string, string>>(`UPDATE user 
      SET password = $password
      WHERE email = $email
      RETURNING *`
    )
    try {
      return query.get({email, password})
    } catch (error) {
      console.log((error as SQLiteError).message)
    }
  }
}
