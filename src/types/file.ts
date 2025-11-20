import { FileSystemItem } from "./index";

export interface File extends FileSystemItem {
  success: boolean;
  error?: string;
  file?: FileSystemItem;
}

export interface FileSearchResult {
  file: FileSystemItem;
  matches: SearchMatch[];
}

export interface SearchMatch {
  line: number;
  column: number;
  preview: string;
}
