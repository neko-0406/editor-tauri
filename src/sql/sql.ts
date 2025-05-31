import Database from "@tauri-apps/plugin-sql";

import { SettingType } from "../components/setting/SettingProvider";

const db = await Database.load("sqlite:setting.db");

export async function createSettingTable() {
  try {
    const CREATE_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS setting (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting TEXT NOT NULL
      )
    `;
    await db.execute(CREATE_TABLE_QUERY);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function executeSettingQuery(params: SettingType[] = []) {
  try {
    const SETTING_QUERY = "INSERT into setting (setting) VALUES ($1)";
    const result = await db.execute(SETTING_QUERY, params);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
