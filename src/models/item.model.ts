import { db } from '../db';

export interface Item {
  id: string,
  user_id: string,
  name: string,
  price: number,
  image?: string,
  description?: string,
  stars?: number,
}

export class Item {
  
}