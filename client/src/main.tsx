import { createRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";
import "./embedded-fonts.css";

// Add font loading check
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    console.log('All fonts loaded');
    // Force repaint
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  });
});

createRoot(document.getElementById("root")!).render(<App />);
