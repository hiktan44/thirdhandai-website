(function() {
  // Widget Configuration
  const API_URL = window.location.origin;
  
  // Create Widget HTML
  const widgetHTML = `
    <div id="whatsapp-widget-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999;">
      <button id="whatsapp-widget-button" style="
        background-color: #25D366;
        color: white;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      ">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
        </svg>
      </button>
      
      <div id="whatsapp-widget-popup" style="
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 320px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        display: none;
        overflow: hidden;
      ">
        <div style="
          background-color: #25D366;
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
            </svg>
            <span style="font-weight: 600;">WhatsApp</span>
          </div>
          <button id="whatsapp-widget-close" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div style="padding: 16px;">
          <p id="whatsapp-widget-message" style="
            color: #374151;
            margin-bottom: 16px;
            line-height: 1.5;
          ">Merhaba! Size nasıl yardımcı olabiliriz?</p>
          
          <button id="whatsapp-widget-chat" style="
            width: 100%;
            background-color: #25D366;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            font-size: 16px;
            transition: background-color 0.3s ease;
          ">
            WhatsApp'ta Sohbet Et
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Inject Widget HTML
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container.firstElementChild);
  
  // Get Elements
  const button = document.getElementById('whatsapp-widget-button');
  const popup = document.getElementById('whatsapp-widget-popup');
  const closeBtn = document.getElementById('whatsapp-widget-close');
  const chatBtn = document.getElementById('whatsapp-widget-chat');
  const messageEl = document.getElementById('whatsapp-widget-message');
  
  // Widget State
  let isOpen = false;
  let settings = null;
  
  // Detect Language
  const userLang = navigator.language || navigator.userLanguage;
  const isEnglish = userLang.toLowerCase().startsWith('en');
  
  // Fetch WhatsApp Settings
  async function fetchSettings() {
    try {
      const response = await fetch(API_URL + '/api/whatsapp-settings');
      if (response.ok) {
        settings = await response.json();
        if (settings && settings.enabled) {
          updateWidget();
        } else {
          // Hide widget if not enabled
          document.getElementById('whatsapp-widget-container').style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp settings:', error);
    }
  }
  
  // Update Widget Content
  function updateWidget() {
    if (settings && settings.welcomeMessage) {
      messageEl.textContent = settings.welcomeMessage;
    } else {
      messageEl.textContent = isEnglish ? 'Hello! How can we help you?' : 'Merhaba! Size nasıl yardımcı olabiliriz?';
    }
    
    chatBtn.textContent = isEnglish ? 'Chat on WhatsApp' : 'WhatsApp\'ta Sohbet Et';
  }
  
  // Toggle Popup
  function togglePopup() {
    isOpen = !isOpen;
    popup.style.display = isOpen ? 'block' : 'none';
    button.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
  }
  
  // Open WhatsApp
  function openWhatsApp() {
    if (!settings || !settings.phoneNumber) return;
    
    const message = encodeURIComponent(settings.welcomeMessage || 
      (isEnglish ? 'Hello, can you help me?' : 'Merhaba, yardımcı olabilir misiniz?'));
    const phoneNumber = settings.phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
  
  // Event Listeners
  button.addEventListener('click', togglePopup);
  closeBtn.addEventListener('click', togglePopup);
  chatBtn.addEventListener('click', openWhatsApp);
  
  // Click outside to close
  document.addEventListener('click', function(event) {
    const widget = document.getElementById('whatsapp-widget-container');
    if (!widget.contains(event.target) && isOpen) {
      togglePopup();
    }
  });
  
  // Initialize
  fetchSettings();
  
  // Add Hover Effects
  button.addEventListener('mouseenter', function() {
    if (!isOpen) {
      this.style.transform = 'scale(1.1)';
    }
  });
  
  button.addEventListener('mouseleave', function() {
    if (!isOpen) {
      this.style.transform = 'scale(1)';
    }
  });
  
  chatBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#22c55e';
  });
  
  chatBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#25D366';
  });
})();