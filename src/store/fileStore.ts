import { create } from "zustand";
import { FileSystemItem, MarkdownFile } from "../types";

interface FileStore {
  // Состояние
  files: FileSystemItem[];
  currentFile: MarkdownFile | null;
  recentFiles: MarkdownFile[];
  isLoading: boolean;

  // Действия
  setFiles: (files: FileSystemItem[]) => void;
  setCurrentFile: (file: MarkdownFile | null) => void;
  addRecentFile: (file: MarkdownFile) => void;
  refreshFileTree: () => Promise<void>;
  createFile: (path: string, content?: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
}

export const useFileStore = create<FileStore>((set: any, get: any) => ({
  files: [],
  currentFile: null,
  recentFiles: [],
  isLoading: false,

  setFiles: (files: any) => set({ files }),
  setCurrentFile: (file: any) => set({ currentFile: file }),

  addRecentFile: (file: any) =>
    set((state: any) => ({
      recentFiles: [
        file,
        ...state.recentFiles.filter((f: any) => f.id !== file.id),
      ].slice(0, 10),
    })),

  refreshFileTree: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://localhost:3000/api/files");

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const files = await response.json();
      set({ files, isLoading: false });
    } catch (err) {
      console.log("Error refreshing file tree: ", err);
      set({ isLoading: false });
    }
  },

  createFile: async (path: string, content: string = "") => {
    try {
      const response = await fetch(`http://localhost:3000/${path}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create file");
      }

      const { refreshFileTree } = get();
      await refreshFileTree();
    } catch (err) {
      console.log("Error creating file: ", err);
      throw err;
    }
  },

  deleteFile: async (path: string) => {
    if (!path) return;
    try {
      const response = await fetch(`http://localhost:3001/api/files`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      const { currentFile, setCurrentFile, refreshFileTree } = get();

      if (currentFile?.path === path) {
        setCurrentFile(null);
      }

      await refreshFileTree();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },
}));
