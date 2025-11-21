import React from "react";
import styled from "styled-components";
import { FileTree } from "./components/file-explorer/FileTree";
import { EditorPane } from "./components/editor/EditorPane";
import { useFileStore } from "./store/fileStore";

// 🔧 Убрали StyledComponent типы - они не нужны
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  background: white;
`;

function App() {
  const { files } = useFileStore();

  return (
    <AppContainer>
      <Sidebar>
        <h2 style={{ padding: "16px", margin: "0px" }}>File Explorer</h2>
        <FileTree files={files} />
      </Sidebar>
      <MainContent>
        <EditorPane />
      </MainContent>
    </AppContainer>
  );
}

export default App;
