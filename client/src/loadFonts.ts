export function loadFonts() {
  // Create link elements for Google Fonts
  const interLink = document.createElement('link');
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
  interLink.rel = 'stylesheet';
  
  const poppinsLink = document.createElement('link');
  poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
  poppinsLink.rel = 'stylesheet';
  
  // Append to head
  document.head.appendChild(interLink);
  document.head.appendChild(poppinsLink);
  
  // Apply fonts after loading
  interLink.onload = () => {
    console.log('Inter font loaded');
    applyFonts();
  };
  
  poppinsLink.onload = () => {
    console.log('Poppins font loaded');
    applyFonts();
  };
}

function applyFonts() {
  // Create a style element to force font application
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    }
    
    .font-poppins {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    }
    
    .font-inter {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
    }
  `;
  
  document.head.appendChild(styleEl);
}