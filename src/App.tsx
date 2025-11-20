import "./index.css";
import styled from "styled-components";
import { FileTree } from "./components/FileTree";
import { EditorPane } from "./components/EditorPane";
import { useFileStore } from "./stores/fileStore";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow: auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const { files } = useFileStore();
  return (
    <>
      <AppContainer>
        <Sidebar>
          <h2 style={{ padding: "16px", margin: "0px" }}>File Explorer</h2>
          <FileTree files={files} />
        </Sidebar>
        <MainContent>
          <EditorPane />
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
