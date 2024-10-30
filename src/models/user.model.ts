import { db } from '../db';

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  created?: Date,
}

export class User {
  static getAll(): User[] {
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

  static create(data: Omit<User, 'id'>): User | null | never {
    const createObj = {
      $id: crypto.randomUUID(),
      $name: data.name,
      $email: data.email,
      $password: data.password,
    };

    const result = db.query<User, Record<string, string>>(`INSERT INTO user
      (id, name, email, password)
      VALUES ($id, $name, $email, $password)
      RETURNING *`
    ).get(createObj)

    return result;
  }

  static updateById(data: User) {
    const user = this.getById(data.id);
    if (!user) {
      return null
    }
    const updateObj = {
      $name: data.name ?? user.name,
      $password: data.password ?? user.password,
      $email: data.email ?? user.email,
      $id: user.id,
    };

    const result = db.query<User, Record<string, string>>(`UPDATE user 
      SET name = $name, password = $password, email = $email
      WHERE id = $id
      RETURNING *`
    ).get(updateObj);

    return result
  }

  static updateByEmail(data: Omit<User, 'id' | 'name'>): User | null | never {
    const user = this.getByEmail(data.email);
    if (!user) {
      return null
    }
    const updateObj = {
      $name: user.name,
      $password: data.password ?? user.password,
      $email: user.email
    };

    const result = db.query<User, Record<string, string>>(`UPDATE user 
      SET name = $name, password = $password
      WHERE email = $email
      RETURNING *`
    ).get(updateObj)

    return result;
  }
}
