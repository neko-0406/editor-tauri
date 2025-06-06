import { path } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

import { defaultSetting, SettingType } from "../components/setting/SettingProvider";

class AppConfigDB {
  private dataBasePath: string | null = null;
  private dataBase: Database | null = null;

  // コンストラクタ
  constructor() {
    // 即時実行関数で初期化
    (async () => {
      const exefileDir = await this.getExeFileDir();
      this.dataBasePath = await path.join(exefileDir, "setting.db");
      this.dataBase = await Database.load("sqlite:" + this.dataBasePath);
    })();

    this.createSettingTable();
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

    if (this.dataBase) {
      await this.dataBase.execute(createQuery);
    } else {
      console.log("database is not fined...");
      return;
    }

    const insertQuery = "insert into setting (key, value, type) values ($1, $2, $3)";

    if (this.dataBase) {
      for (const [key, value] of Object.entries(defaultSetting)) {
        await this.dataBase.execute(insertQuery, [key, value, "string"])
      }
    }
  }
}
