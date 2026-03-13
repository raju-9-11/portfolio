// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBZW-V3-51jsaqgb3_n_ajOi2DyXtPFpY",
  authDomain: "iamnyx.firebaseapp.com",
  projectId: "nyx-port",
  storageBucket: "nyx-port.firebasestorage.app",
  messagingSenderId: "395259503882",
  appId: "1:395259503882:web:da7da68c550e3f854e86f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Firebase Analytics failed to initialize (likely blocked by extension):", e);
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

export default app;
