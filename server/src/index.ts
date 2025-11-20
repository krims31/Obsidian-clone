import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.get("/api/files", (req, res) => {
  res.json({ message: "Files API is working!" });
});

app.post("/api/files/save", (req, res) => {
  try {
    const { filePath, content } = req.body;

    if (!filePath || content === undefined) {
      return res.status(400).json({
        success: false,
        error: "filePath and content are required",
      });
    }

    console.log(`Saving to ${filePath}:`, content.substring(0, 50) + "...");

    res.json({
      success: true,
      message: "File saved successfully",
      path: filePath,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.get("/api/files/read", async (req, res) => {
  try {
    const { filePath } = req.query;

    if (!filePath) {
      return res.status(400).json({
        success: false,
        error: "filePath is required",
      });
    }

    res.json({
      success: true,
      content: "# Sample Markdown Content\n\nThis is a sample file.",
      path: filePath,
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.use((error: any, req: any, res: any, next: any) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
