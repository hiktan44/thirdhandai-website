import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./fonts.css";
import { loadFonts } from "./loadFonts";

// Load fonts dynamically
loadFonts();

createRoot(document.getElementById("root")!).render(<App />);
