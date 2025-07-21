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
        width: 80px;
        height: 80px;
        border: none;
        cursor: pointer;
        box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
        position: relative;
      ">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span style="
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background-color: #25D366;
          border-radius: 50%;
          border: 3px solid white;
          animation: pulse 2s infinite;
        "></span>
      </button>
      
      <div id="whatsapp-widget-popup" style="
        position: absolute;
        bottom: 100px;
        right: 0;
        width: 384px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.2);
        display: none;
        overflow: hidden;
        animation: fadeIn 0.3s ease;
      ">
        <div style="
          background: linear-gradient(to right, #25D366, #22c55e);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span style="font-weight: 700; font-size: 18px;">WhatsApp</span>
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
        
        <div style="padding: 24px;">
          <p id="whatsapp-widget-message" style="
            color: #374151;
            margin-bottom: 24px;
            line-height: 1.6;
            font-size: 16px;
          ">Merhaba! Size nasıl yardımcı olabiliriz?</p>
          
          <button id="whatsapp-widget-chat" style="
            width: 100%;
            background-color: #25D366;
            color: white;
            border: none;
            padding: 16px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
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
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
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
    this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
  });
  
  chatBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#25D366';
    this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
  });
})();