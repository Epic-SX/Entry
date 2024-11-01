import * as mysql from 'mysql2/promise';
class DB {
  constructor() {
    /**
     * @type {import('mysql2/promise').Connection}
     */
    this.connection = null;
  }

  /**
   * @returns {Promise<import('mysql2/promise').Connection>}
   */
  async getConnection() {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      });
    }
    try {
      // Test the connection
      await this.connection.query('SELECT 1');
    } catch (error) {
      console.log('Connection failed, recreating connection');
      await this.close();
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      });
    }
    return this.connection;
  }

  async close() {
    if (this.connection) {
      await this.connection.end().catch(console.error);
      this.connection = null;
    }
  }
}

const db = new DB();
export default db;
