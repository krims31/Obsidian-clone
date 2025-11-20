// Простой React компонент без сборки
const { useState, useEffect } = React;

function FileTree({ files, onSelectFile }) {
  if (!files || files.length === 0) {
    return (
      <div style={{ padding: "16px", color: "#6c757d", textAlign: "center" }}>
        No files found
      </div>
    );
  }

  return (
    <div>
      {files.map((file) => (
        <div
          key={file.path}
          className="file-item"
          onClick={() => onSelectFile(file)}
        >
          <span>{file.isDirectory ? "📁" : "📄"}</span>
          {file.name}
        </div>
      ))}
    </div>
  );
}

function Editor({ content, onContentChange }) {
  return (
    <textarea
      className="text-editor"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      placeholder="Start writing your markdown..."
    />
  );
}

function App() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [content, setContent] = useState("");
  const [currentDir, setCurrentDir] = useState("");

  // Загрузка файлов при старте
  useEffect(() => {
    loadHomeDirectory();
  }, []);

  const loadHomeDirectory = async () => {
    try {
      const homeDir = await window.electronAPI.readDirectory(
        require("os").homedir(),
      );
      if (homeDir.success) {
        setFiles(homeDir.items);
        setCurrentDir(require("os").homedir());
      }
    } catch (error) {
      console.error("Failed to load directory:", error);
    }
  };

  const handleSelectFile = async (file) => {
    if (file.isDirectory) {
      // Загружаем содержимое директории
      const result = await window.electronAPI.readDirectory(file.path);
      if (result.success) {
        setFiles(result.items);
        setCurrentDir(file.path);
      }
    } else if (file.isFile && file.name.endsWith(".md")) {
      // Загружаем содержимое файла
      setCurrentFile(file);
      const result = await window.electronAPI.readFile(file.path);
      if (result.success) {
        setContent(result.content);
      }
    }
  };

  const handleSave = async () => {
    if (currentFile) {
      await window.electronAPI.writeFile(currentFile.path, content);
      alert("File saved!");
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Files</h3>
          <small>{currentDir}</small>
        </div>
        <div className="sidebar-content">
          <FileTree files={files} onSelectFile={handleSelectFile} />
        </div>
      </div>

      <div className="main-content">
        <div className="editor-toolbar">
          <button className="btn" onClick={loadHomeDirectory}>
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!currentFile}
          >
            Save
          </button>
          <span style={{ marginLeft: "auto", color: "#6c757d" }}>
            {currentFile ? currentFile.name : "No file selected"}
          </span>
        </div>

        <div className="editor-container">
          {currentFile ? (
            <Editor content={content} onContentChange={setContent} />
          ) : (
            <div className="empty-state">
              <div>
                <h2>Select a file to edit</h2>
                <p>Choose a .md file from the sidebar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Рендерим приложение
ReactDOM.render(React.createElement(App), document.getElementById("root"));
