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
    return db.query<User, null>('SELECT * FROM user ORDER BY id ASC').all(null);
  }

  static getById(userId: string) {
    const result = db.query<User, string>('SELECT * FROM user WHERE id = ?').get(userId)
    return result
  }

  static getByEmail(email: string) {
    const result = db.query<User, string>('SELECT * FROM user WHERE email = ?').get(email);
    return result
  }

  static deleteById(userId: string) {
    const result = db.query<User, string>('DELETE FROM user WHERE id = ? RETURNING *').get(userId);
    return result
  }

  static create(data: Omit<User, 'id' | 'created'>) {
    const result = db.query<User, Record<string, string>>(`INSERT INTO user
      (id, name, email, password)
      VALUES ($id, $name, $email, $password)
      RETURNING *`
    ).get({...data, id: crypto.randomUUID()})

    return result;
  }

  static updateByEmail({email, password}: {email: string, password: string}) {
    const result = db.query<User, Record<string, string>>(`UPDATE user 
      SET password = $password
      WHERE email = $email
      RETURNING *`
    ).get({email, password})

    return result;
  }
}
