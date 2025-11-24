import Database from "better-sqlite3"
import { databaseConfig } from "../config/database.config"

const db = new Database(databaseConfig.filename)

export const initializeDatabase = (): void => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      is_done BOOLEAN NOT NULL DEFAULT 0,
      created_date TEXT NOT NULL,
      updated_time TEXT NOT NULL
    )
  `)
}

export default db
