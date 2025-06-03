use std::path::Path;

mod storage;
use storage::file_manager::{walk_tree, FileItem, get_current_exe_dir};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_file_tree,
            get_current_exe_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_file_tree(path: String) -> Option<FileItem> {
    let path = Path::new(&path);
    return walk_tree(path);
}
