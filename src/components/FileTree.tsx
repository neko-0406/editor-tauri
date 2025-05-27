import { useCallback, useState } from "react";

import { FaRegFile, FaRegFolder, FaRegFolderOpen } from "react-icons/fa6";

export interface FileObject {
  name: string;
  is_dir: boolean;
  path: string;
  branch?: FileObject[];
}

type TreeItemProps = {
  fileItem: FileObject;
  level: number;
};

function FileItem({ fileItem }: TreeItemProps) {
  return (
    <li className="mt-1 mb-1">
      <div className="flex items-center">
        <FaRegFile />
        <button>{fileItem.name}</button>
      </div>
    </li>
  );
}

function FolderItem({ fileItem, level }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpen((pre) => !pre);
  }, []);

  return (
    <li className="mt-1 mb-1">
      <div>
        <div className="flex items-center">
          {isOpen ? <FaRegFolderOpen /> : <FaRegFolder />}
          <button onClick={handleClick} className="ml-1">
            {fileItem.name}
          </button>
        </div>
        <ul className="ml-2 pl-3 border-l ">
          {isOpen &&
            [...(fileItem.branch || [])].sort((a, b) => {
              if (a.is_dir && !b.is_dir) {
                return -1;
              }
              if (!a.is_dir && b.is_dir) {
                return 1;
              }
              return 0
            })
            .map((item) =>
              item.is_dir ? (
                <FolderItem fileItem={item} level={level + 1} key={item.path} />
              ) : (
                <FileItem fileItem={item} level={level + 1} key={item.path} />
              ),
            )}
        </ul>
      </div>
    </li>
  );
}

type TreeProps = {
  fileObject: FileObject;
};

function Tree({ fileObject }: TreeProps) {
  return (
    <ul className="px-5">
      {fileObject.is_dir ? (
        <FolderItem fileItem={fileObject} level={0} />
      ) : (
        <FileItem fileItem={fileObject} level={0} />
      )}
    </ul>
  );
}

export default Tree;