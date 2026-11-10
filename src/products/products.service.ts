import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class ProductService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM products',
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM products WHERE id = ?',
      [id],
    );

    if (!rows[0]) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return rows[0];
  }

  async createProduct(name: string, price: number, description?: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description || null],
    );
    return { id: result.insertId, name, price, description };
  }

  async updateProduct(id: number, partial: { name?: string; price?: number; description?: string }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.name) {
      fields.push('name = ?');
      values.push(partial.name);
    }

    if (partial.price !== undefined) {
      fields.push('price = ?');
      values.push(partial.price);
    }

    if (partial.description) {
      fields.push('description = ?');
      values.push(partial.description);
    }

    if (fields.length === 0) return await this.findById(id);
    values.push(id);

    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async deleteProduct(id: number) {
    const [res] = await this.pool().execute<OkPacket>(
      'DELETE FROM products WHERE id = ?',
      [id],
    );
    return res.affectedRows > 0;
  }
}