import React from "react";
import styled from "styled-components";
import { FileSystemItem } from "../types";
import { useFileStore } from "../../store/fileStore";

const TreeContainer = styled.div`
  padding: 8px 0;
`;

const TreeNode = styled.div<{ level: number }>`
  padding-left: ${(props: any) => props.level * 16}px;
  padding-right: 8px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NodeContent = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ExpandIcon = styled.div`
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  border-radius: 50%;
  background-color: #ccc;
`;

const FileIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  color: #6c757d;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #333;
`;

interface FileTreeProps {
  files?: FileSystemItem[];
}

export const FileTree: React.FC<FileTreeProps> = ({ files }) => {
  const [setCurrentFile, refreshFileTree] = useFileStore();

  const fileList = files || useFileStore((state) => state.files);

  const renderTreeNode = (node: FileSystemItem, level: number = 0) => {
    const isDirectory = node.type === "directory";

    return (
      <div key={node.id}>
        <TreeNode
          level={level}
          onClick={() => !isDirectory && setCurrentFile(node as any)}
        >
          <NodeContent>
            <ExpandIcon>
              {isDirectory &&
                (node.children && node.children.length > 0 ? "📁" : "📂")}
            </ExpandIcon>
            <FileIcon>{!isDirectory && "📄"}</FileIcon>
            <FileName>{node.name}</FileName>
          </NodeContent>
        </TreeNode>
        {isDirectory &&
          node.isExpanded &&
          node.children?.map((child: any) => renderTreeNode(child, level + 1))}
      </div>
    );
  };

  if (!fileList || fileList.length === 0) {
    return (
      <TreeContainer>
        <div style={{ padding: "16px", textAlign: "center", color: "#6c757d" }}>
          No files found
        </div>
        <button
          onClick={refreshFileTree}
          style={{
            margin: "8px 16px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </TreeContainer>
    );
  }

  return (
    <TreeContainer>
      {fileList.map((file) => renderTreeNode(file))}
    </TreeContainer>
  );
};
