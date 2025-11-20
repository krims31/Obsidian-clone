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
