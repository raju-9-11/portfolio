// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzljm2NFMmfHKUfSVK8u_PwSvvUSPkzAE",
  authDomain: "portfolio-pac.firebaseapp.com",
  projectId: "portfolio-pac",
  storageBucket: "portfolio-pac.firebasestorage.app",
  messagingSenderId: "222630410662",
  appId: "1:222630410662:web:ef8d048d7befd5c1ed7767"
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
