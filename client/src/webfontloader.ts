// Web Font Loader approach
export function loadWebFonts() {
  const script = document.createElement('script');
  script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  script.onload = () => {
    // @ts-ignore
    if (window.WebFont) {
      // @ts-ignore
      window.WebFont.load({
        google: {
          families: ['Inter:300,400,500,600,700,800,900', 'Poppins:300,400,500,600,700,800,900']
        },
        active: () => {
          console.log('Web fonts loaded successfully');
          // Force repaint
          document.body.style.display = 'none';
          document.body.offsetHeight; // Trigger reflow
          document.body.style.display = '';
        },
        inactive: () => {
          console.log('Web fonts failed to load');
        }
      });
    }
  };
  document.head.appendChild(script);
}