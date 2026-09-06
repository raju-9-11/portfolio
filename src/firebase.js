// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBZW-V3-51jsaqgb3_n_ajOi2DyXtPFpY",
  authDomain: "iamnyx.firebaseapp.com",
  projectId: "nyx-port",
  storageBucket: "nyx-port.firebasestorage.app",
  messagingSenderId: "395259503882",
  appId: "1:395259503882:web:da7da68c550e3f854e86f3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
// Only attempt to initialize analytics if a valid measurement ID is configured
if (firebaseConfig.measurementId) {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn("Firebase Analytics failed to initialize:", e);
      }
    }
  }).catch(() => {});
}

export const logSystemLogin = () => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Simple device detection
  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  if (/Mobi|Android/i.test(ua)) {
    deviceType = 'Mobile';
  } else if (/Tablet|iPad/i.test(ua)) {
    deviceType = 'Tablet';
  }

  if (!isLocalhost) {
    if (analytics) {
      try {
        logEvent(analytics, 'login', {
          device_type: deviceType
        });
      } catch (e) {
        console.warn("Firebase Analytics logging blocked:", e);
      }
    }
  } else {
    console.log(`[Analytics] Localhost detected. Event 'login' suppressed. Device: ${deviceType}`);
  }
};

/**
 * Log agent chat interactions to Firebase Analytics (free Google Analytics 4 events).
 * @param {string} eventName - e.g. 'rook_chat_open', 'rook_message_sent', 'rook_contact_dispatched'
 * @param {Object} params - custom parameters (strings/numbers)
 */
export const logAgentInteraction = (eventName, params = {}) => {
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost) {
    console.log(`[Analytics:Rook] '${eventName}'`, params);
  }

  if (analytics) {
    try {
      logEvent(analytics, eventName, {
        ...params,
        environment: isLocalhost ? 'development' : 'production',
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.warn(`[Firebase Analytics] Failed to log '${eventName}':`, e);
    }
  }
};

export default app;
