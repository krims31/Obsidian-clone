const fs = require("fs");
const { transformSync } = require("esbuild");

// Читаем React компоненты
const appCode = fs.readFileSync("src/App.tsx", "utf8");
const sidebarCode = fs.readFileSync(
  "src/components/layout/Sidebar.tsx",
  "utf8",
);

// Собираем всё в один bundle
const fullCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

${sidebarCode}

${appCode}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
`;

// Транспилируем TypeScript в JavaScript
const result = transformSync(fullCode, {
  loader: "tsx",
  jsx: "automatic",
  format: "esm",
});

fs.writeFileSync("dist/react-bundle.js", result.code);
console.log("✅ React bundle created!");
