import React from "react";
import styled from "styled-components";
import { ObsidianSidebar } from "./components/layout/Sidebar";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #1e1e1e;
`;

const MainContent = styled.div`
  flex: 1;
  background: #1e1e1e;
  padding: 20px;
  color: #dcdcdc;
`;

function App() {
  return (
    <AppContainer>
      <ObsidianSidebar />
      <MainContent>
        <h1>Welcome to Obsidian Clone</h1>
        <p>Your sidebar is working! 🚀</p>
        <textarea
          style={{
            width: "100%",
            height: "200px",
            background: "#2d2d2d",
            border: "1px solid #404040",
            color: "#dcdcdc",
            padding: "12px",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
          placeholder="Start writing your markdown..."
        />
      </MainContent>
    </AppContainer>
  );
}

export default App;
