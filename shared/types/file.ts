export interface FileSystem {
  id: string;
  name: string;
  path: string;
  type: "file | directory";
  extension?: string;
  children?: FileSystem[];
  isDirectory(): boolean;
}

export interface MarkdownFile {
  id: string;
  name: string;
  path: string;
  content: string;
  lastModified: number;
  wordCount: number;
  frontmatter: Record<string, unknown>;
}

export interface FileOperations {
  createFile: (path: string, content?: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  renameFile: (oldPath: string, newPath: string) => Promise<void>;
  moveFile: (sourcePath: string, targetPath: string) => Promise<void>;
}
