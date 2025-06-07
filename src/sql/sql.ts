import { path } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

import { defaultSetting, SettingType } from "../components/setting/SettingProvider";

class AppConfigSql {
  private dataBasePath: string | null = null;
  private dataBase: Database | null = null;

  static readonly settingDBName: string = "setting.db";

  // コンストラクタ
  constructor() {
    this.init();
  }

  // インスタンス初期化関数
  private async init(): Promise<void> {
    const exefileDir = await this.getExeFileDir();
    this.dataBasePath = await path.join(exefileDir, AppConfigSql.settingDBName);
    this.dataBase = await Database.load("sqlite:" + this.dataBasePath);
    await this.createSettingTable();
  }

  // 実行ファイルのあるdir取得
  private async getExeFileDir(): Promise<string> {
    return await invoke("get_current_exe_dir");
  }

  // テーブルの定義と初期化
  private async createSettingTable() {
    const createQuery = `
      create table if not exists setting (
        key text primary key,
        value text,
        type text
      )
    `;

    // databaseがnull or undefinedじゃないとき
    if (this.dataBase) {
      await this.dataBase.execute(createQuery);
    } else {
      console.log("database is not fined...");
      return;
    }

    // テーブルの行数を取得
    const tableRow = await this.getSettingTableRow();
    // テーブルの行数が0ならデフォルト設定をinsert
    console.log("table row:", tableRow);
    if (tableRow === 0) {
      // const insertQuery = "insert into setting (key, value, type) values ($1, $2, $3)";
      const insertQuery = `insert into ${AppConfigSql.settingDBName} (key, value, type) values ($1, $2, $3)`;
      for (const [key, value] of Object.entries(defaultSetting)) {
        await this.dataBase.execute(insertQuery, [key, value, "string"]);
      }
    }
  }

  // setting tableの行数を取得
  // return [{count: x}]
  async getSettingTableRow(): Promise<number> {
    if (this.dataBase) {
      const result = await this.dataBase.select<{ count: number }[]>(
        `select count(*) as count from ${AppConfigSql.settingDBName}`,
      );
      return result[0].count;
    } else {
      console.log("database is not fined..");
    }
    return 0;
  }

  // 全てのkey, valueを取得
  async getAllSettings(): Promise<void> {
    const result = await this.dataBase?.select(`select * from ${AppConfigSql.settingDBName}`);
    console.log(result);
  }
}

// グローバルに公開
// import { appSql } from ...sql.ts
const appSql = new AppConfigSql();
export { appSql };
