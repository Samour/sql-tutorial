import * as mysql from 'mysql';
import { loadConfig } from './config';

export type DbValue = string | number | Date;

class Database {

  private connection?: mysql.Connection;

  async getDb(): Promise<mysql.Connection> {
    if (!this.connection) {
      const config = await loadConfig();
      this.connection = mysql.createConnection(config.database);
    }

    return this.connection;
  }

  async executeQuery<T>(qs: string, values?: DbValue[]): Promise<T[]> {
    const db = await this.getDb();
    return new Promise((res, err) => {
      db.query(qs, values, (error, results) => {
        if (error) {
          err(error);
        } else {
          res(results);
        }
      })
    })
  }

  escape(value: string): string {
    return mysql.escape(value);
  }
}

export default new Database();
