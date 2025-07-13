import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./simple-fonts.css";
import { loadWebFonts } from "./webfontloader";

// Load fonts dynamically
loadWebFonts();

createRoot(document.getElementById("root")!).render(<App />);
