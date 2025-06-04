use std::{ env::current_dir, path::Path};

use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct FileItem {
    pub name: String,
    pub is_dir: bool,
    pub path: String,
    pub branch: Option<Vec<Self>>
}

impl FileItem {
    pub fn new(path: &Path) -> Self {
        let file_name = FileItem::get_file_name(path);
        let file_abs_path = FileItem::get_file_path(path);
        let branch = None;
        return Self {
            name: file_name,
            is_dir: path.is_dir(),
            path: file_abs_path,
            branch
        };
    }

    fn get_file_name(path: &Path) -> String {
        let file_name = path.file_name()
            .unwrap()
            .to_string_lossy()
            .to_string();

        return file_name;
    }

    fn get_file_path(path: &Path) -> String {
        let file_path = path.canonicalize().ok();

        match file_path {
            Some(abs_path) => {
                let mut path_str = abs_path.to_string_lossy().to_string();
                if path_str.starts_with(r"\\?\") {
                    path_str = path_str.trim_start_matches(r"\\?\").to_string();
                }
                return path_str;
            },
            None => return String::from("")
        }
    }
}

pub fn walk_tree(root_path: &Path) -> Option<FileItem> {
    if !root_path.exists() { return None }; // 指定されたpathが無い場合はNoneを返す
    let mut item = FileItem::new(root_path);

    if item.is_dir {
        let mut branch = Vec::new();
        if let Ok(entries) = root_path.read_dir() {
            for entry in entries.flatten() {
                if let Some(child) = walk_tree(&entry.path()) {
                    branch.push(child);
                }
            }
        }
        item.branch = Some(branch);
    }

    Some(item)
}

#[tauri::command]
pub fn get_current_exe_dir() -> Option<String> {
    let dir_path = current_dir();
    match dir_path {
        Ok(dir) => {
            let dir_path = dir.to_string_lossy().to_string();
            return Some(dir_path);
        }
        Err(error) => {
            print!("{}", error);
            return None;
        }
    }
}