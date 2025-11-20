// Базовые типы для файловой системы
export interface FileSystemItem {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  extension?: string;
  children?: FileSystemItem[];
  isExpanded?: boolean;
  parentId?: string | null;
}

export interface MarkdownFile {
  id: string;
  path: string;
  name: string;
  content: string;
  lastModified: number;
  wordCount: number;
  size?: number;
  frontmatter?: Record<string, any>;
  tags?: string[];
}

// Типы для редактора
export interface EditorState {
  currentFile: MarkdownFile | null;
  content: string;
  isDirty: boolean;
  viewMode: "edit" | "preview" | "split";
  wordCount: number;
  cursorPosition: CursorPosition;
}

export interface CursorPosition {
  line: number;
  column: number;
}

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
}

// Типы для API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreateFileRequest {
  path: string;
  content?: string;
  type?: "file" | "directory";
}

export interface DeleteFileRequest {
  path: string;
}

// Типы для приложения
export interface AppSettings {
  theme: "light" | "dark" | "auto";
  language: string;
  defaultFileExtension: string;
  autoSave: boolean;
  spellCheck: boolean;
}

// Re-export всех типов
export * from "./file";
export * from "./editor";
export * from "./app";
